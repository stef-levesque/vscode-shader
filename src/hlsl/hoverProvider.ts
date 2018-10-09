'use strict';

import { TextDocumentContentProvider, Event, EventEmitter, HoverProvider, Hover, SymbolInformation, SymbolKind, MarkdownString, MarkedString, TextDocument, CancellationToken, Range, Position, Uri, ViewColumn, Disposable, commands, window, workspace } from 'vscode';
import { HTML_TEMPLATE } from './html';
import hlslGlobals = require('./hlslGlobals');
import { https } from 'follow-redirects';
import { JSDOM } from 'jsdom';

export var hlsldocUri: Uri = Uri.parse('hlsldoc://default');

export function textToMarkedString(text: string): MarkedString {
	return text.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&'); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
}

export function linkToMarkdownString(linkUrl: string): MarkdownString {
    if (linkUrl === undefined || linkUrl === '') {
        return;
    }

    let link = new MarkdownString('[HLSL documentation][1]\n\n[1]: ');
    let openDocOnSide = workspace.getConfiguration('hlsl').get<boolean>('openDocOnSide', false);
    if (openDocOnSide) {
        link.appendText(encodeURI( 'command:shader.openLink?' + JSON.stringify([linkUrl, true])));
    } else {
        link.appendText(linkUrl);
    }
    link.isTrusted = true;
    return link;
}

export default class HLSLHoverProvider implements HoverProvider {

    private _subscriptions: Disposable[] = [];
    private _hlslDocProvider: HLSLDocumentationTextDocumentProvider = null;

    private getSymbols(document: TextDocument): Thenable<SymbolInformation[]> {
        return commands.executeCommand<SymbolInformation[]>('vscode.executeDocumentSymbolProvider', document.uri);
    }

    constructor() {
        this._hlslDocProvider = new HLSLDocumentationTextDocumentProvider();
        this._subscriptions.push( workspace.registerTextDocumentContentProvider('hlsldoc', this._hlslDocProvider ) );
        this._subscriptions.push( commands.registerCommand('shader.openLink', (link: string, newWindow: boolean) => {
            commands.executeCommand('vscode.previewHtml', hlsldocUri, newWindow ? ViewColumn.Two : ViewColumn.Active, "HLSL Documentation").then(() => {
                commands.executeCommand('_workbench.htmlPreview.postMessage',
                Uri.parse('hlsldoc://default'),
                {
                    line: 0
                });
            });
            this._hlslDocProvider.goto(Uri.parse(link));
        }));

    }

    dispose() {
        this._subscriptions.forEach(s => {s.dispose()});
    }


    public async provideHover(document: TextDocument, position: Position, token: CancellationToken): Promise<Hover> {
        
        let enable = workspace.getConfiguration('hlsl').get<boolean>('suggest.basic', true);
        if (!enable) {
            return null;
        }

        let wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return null;
        }

        let name = document.getText(wordRange);
        let backchar = '';
        if(wordRange.start.character > 0) {
            let backidx = wordRange.start.translate({characterDelta: -1});
            backchar = backidx.character < 0 ? '' : document.getText(new Range(backidx, wordRange.start));
        }

        if (backchar === '#') {
            const key = name.substr(1);
            var entry = hlslGlobals.preprocessors[name.toUpperCase()];
            if (entry && entry.description) {
                let signature = '(*preprocessor*) ';
                signature += '**#' + name + '**';
                let contents: MarkedString[] = [];
                contents.push(new MarkdownString(signature));
                contents.push(textToMarkedString(entry.description));
                contents.push(linkToMarkdownString(entry.link));
                return new Hover(contents, wordRange);
            }
        }

        var entry = hlslGlobals.intrinsicfunctions[name]
        if (entry && entry.description) {
            let signature = '(*function*) ';
            signature += '**' + name + '**';
            signature += '(';
            if (entry.parameters && entry.parameters.length != 0) {
                let params = '';
                entry.parameters.forEach(p => params += p.label + ',');
                signature += params.slice(0, -1);
            }
            signature += ')';
            let contents: MarkedString[] = [];
            contents.push(new MarkdownString(signature));
            contents.push(textToMarkedString(entry.description));
            contents.push(linkToMarkdownString(entry.link));
            return new Hover(contents, wordRange);
        }

        entry = hlslGlobals.datatypes[name];
        if (entry && entry.description) {
            let signature = '(*datatype*) ';
            signature += '**' + name + '**';
            let contents: MarkedString[] = [];
            contents.push(new MarkdownString(signature));
            contents.push(textToMarkedString(entry.description));
            contents.push(linkToMarkdownString(entry.link));
            return new Hover(contents, wordRange);
        }

        entry = hlslGlobals.semantics[name.toUpperCase()];
        if (entry && entry.description) {
            let signature = '(*semantic*) ';
            signature += '**' + name + '**';
            let contents: MarkedString[] = [];
            contents.push(new MarkdownString(signature));
            contents.push(textToMarkedString(entry.description));
            contents.push(linkToMarkdownString(entry.link));
            return new Hover(contents, wordRange);
        }

        let key = name.replace(/\d+$/, '') //strip tailing number
        entry = hlslGlobals.semanticsNum[key.toUpperCase()];
        if (entry && entry.description) {
            let signature = '(*semantic*) ';
            signature += '**' + name + '**';
            let contents: MarkedString[] = [];
            contents.push(new MarkdownString(signature));
            contents.push(textToMarkedString(entry.description));
            contents.push(linkToMarkdownString(entry.link));
            return new Hover(contents, wordRange);
        }

        entry = hlslGlobals.keywords[name];
        if (entry) {
            let signature = '(*keyword*) ';
            signature += '**' + name + '**';
            let contents: MarkedString[] = [];
            contents.push(new MarkdownString(signature));
            contents.push(textToMarkedString(entry.description));
            contents.push(linkToMarkdownString(entry.link));
            return new Hover(contents, wordRange);
        }

        let symbols = await this.getSymbols(document);

        for (let s of symbols) {
            if (s.name === name) {
                let contents: MarkedString[] = [];
                let signature = '(*' + SymbolKind[s.kind].toLowerCase() + '*) ';
                signature += s.containerName ? s.containerName + '.' : '';
                signature += '**' + name + '**';

                contents.push(new MarkdownString(signature));

                if (s.location.uri.toString() === document.uri.toString()) {
                    //contents = [];
                    contents.push( {language: 'hlsl', value: document.getText(s.location.range)} );
                }
                
                return new Hover(contents, wordRange);
            }
        }
    } 
}

class HLSLDocumentationTextDocumentProvider implements TextDocumentContentProvider {
    
    private _uri = null;
    public goto(uri: Uri) {
        this._uri = uri;
        this._onDidChange.fire(hlsldocUri);
    }
    
    private _onDidChange = new EventEmitter<Uri>();
    get onDidChange(): Event<Uri> {
		return this._onDidChange.event;
	}

    public provideTextDocumentContent(uri): Promise<string> {
        uri = this._uri;
        return new Promise<string>((resolve, reject) => { 
            let request = https.request({
                host: uri.authority,
                path: uri.path,
                rejectUnauthorized: workspace.getConfiguration().get("http.proxyStrictSSL", true)
            }, (response) => {
                if (response.statusCode == 301 || response.statusCode == 302)
                    return resolve(response.headers.location);
                if (response.statusCode != 200)
                    return resolve(response.statusCode.toString());
                let html = '';
                response.on('data', (data) => { html += data.toString(); });
                response.on('end', () => { 
                    const dom = new JSDOM(html);
                    let topic = '';
                    let node = dom.window.document.querySelector('.content');
                    if (node) {
                        let num = node.getElementsByTagName('a').length;
                        for (let i=0; i<num; ++i) {
                            if (node.getElementsByTagName('a')[i].href.startsWith('http')) {
                                node.getElementsByTagName('a')[i].href = encodeURI( 'command:shader.openLink?' + JSON.stringify([node.getElementsByTagName('a')[i].href, false]));
                            }
                        }
                        topic = node.outerHTML;
                        
                    } else {
                        let link = uri.with({scheme: 'https'}).toString();
                        topic = `<a href="${link}">No topic found, click to follow link</a>`;
                    }
                    resolve(HTML_TEMPLATE.replace('{0}', topic));
                });
                response.on('error', (error) => { console.log(error); });
            });
            request.on('error', (error) => { console.log(error) });
            request.end();
        });
    }
}