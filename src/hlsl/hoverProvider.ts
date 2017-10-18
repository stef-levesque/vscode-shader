'use strict';

import { TextDocumentContentProvider, HoverProvider, Hover, SymbolInformation, SymbolKind, MarkdownString, MarkedString, TextDocument, CancellationToken, Range, Position, Uri, ViewColumn, Disposable, commands, workspace } from 'vscode';
import hlslGlobals = require('./hlslGlobals');
import * as https from 'https';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const linktext: string = "[HLSL documentation][1]\n\n[1]: ";

export function textToMarkedString(text: string): MarkedString {
	return text.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&'); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
}

export default class HLSLHoverProvider implements HoverProvider {

    private _subscriptions: Disposable[] = [];

    private getSymbols(document: TextDocument): Thenable<SymbolInformation[]> {
        return commands.executeCommand<SymbolInformation[]>('vscode.executeDocumentSymbolProvider', document.uri);
    }



    constructor() {
        this._subscriptions.push( commands.registerCommand('shader.openLink', (link: Uri | string) => {
            let hlsldoclink =  Uri.parse(link.toString()).with({scheme: 'hlsldoc'}); 
            commands.executeCommand('vscode.previewHtml', hlsldoclink, ViewColumn.Two, "HLSL Documentation");
        }));

        this._subscriptions.push( workspace.registerTextDocumentContentProvider('hlsldoc', new HLSLDocumentationTextDocumentProvider() ) );
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

                if (entry.link && entry.link != '') {
                    let link = new MarkdownString(linktext);
                    //link.appendText(entry.link);
                    link.appendText(encodeURI('command:shader.openLink?' + JSON.stringify([entry.link])))
                    link.isTrusted = true;
                    contents.push(link);
                }
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

            if (entry.link && entry.link != '') {
                let link = new MarkdownString(linktext);
                //link.appendText(entry.link);
                link.appendText(encodeURI('command:shader.openLink?' + JSON.stringify([entry.link])))
                link.isTrusted = true;
                contents.push(link);
            }
            return new Hover(contents, wordRange);
        }

        entry = hlslGlobals.datatypes[name];
        if (entry && entry.description) {
            let signature = '(*datatype*) ';
            signature += '**' + name + '**';
            let contents: MarkedString[] = [];
            contents.push(new MarkdownString(signature));
            contents.push(textToMarkedString(entry.description));

            if (entry.link && entry.link != '') {
                let link = new MarkdownString(linktext);
                //link.appendText(entry.link);
                link.appendText(encodeURI('command:shader.openLink?' + JSON.stringify([entry.link])))
                link.isTrusted = true;
                contents.push(link);
            }
            return new Hover(contents, wordRange);
        }

        entry = hlslGlobals.semantics[name.toUpperCase()];
        if (entry && entry.description) {
            let signature = '(*semantic*) ';
            signature += '**' + name + '**';
            let contents: MarkedString[] = [];
            contents.push(new MarkdownString(signature));
            contents.push(textToMarkedString(entry.description));

            if (entry.link && entry.link != '') {
                let link = new MarkdownString(linktext);
                //link.appendText(entry.link);
                link.appendText(encodeURI('command:shader.openLink?' + JSON.stringify([entry.link])))
                link.isTrusted = true;
                contents.push(link);
            }
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

            if (entry.link && entry.link != '') {
                let link = new MarkdownString(linktext);
                //link.appendText(entry.link);
                link.appendText(encodeURI('command:shader.openLink?' + JSON.stringify([entry.link])))
                link.isTrusted = true;
                contents.push(link);
            }
            return new Hover(contents, wordRange);
        }

        entry = hlslGlobals.keywords[name];
        if (entry) {
            let signature = '(*keyword*) ';
            signature += '**' + name + '**';
            let contents: MarkedString[] = [];
            contents.push(new MarkdownString(signature));
            contents.push(textToMarkedString(entry.description));

            if (entry.link && entry.link != '') {
                let link = new MarkdownString(linktext);
                //link.appendText(entry.link);
                link.appendText(encodeURI('command:shader.openLink?' + JSON.stringify([entry.link])))
                link.isTrusted = true;
                contents.push(link);
            }
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

    public provideTextDocumentContent(uri): Promise<string> {
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
                let topic = '';
                response.on('data', (data) => { topic += data.toString(); });
                response.on('end', () => { 
                    const dom = new JSDOM(topic);
                    let node = dom.window.document.querySelector('.topic');
                    topic = node.outerHTML;

                    resolve(`
                    <!DOCTYPE html>
                    <html>
                    
                    <head>
                        <STYLE type="text/css">
                            body {
                                padding: 10px 20px;
                                line-height: 22px
                            }
                    
                            img {
                                max-width: 100%;
                                max-height: 100%
                            }
                    
                            a {
                                text-decoration: none
                            }
                    
                            a:focus,
                            input:focus,
                            select:focus,
                            textarea:focus {
                                outline: 1px solid -webkit-focus-ring-color;
                                outline-offset: -1px
                            }
                    
                            hr {
                                border: 0;
                                height: 2px;
                                border-bottom: 2px solid
                            }
                    
                            h1 {
                                padding-bottom: .3em;
                                line-height: 1.2;
                                border-bottom-width: 1px;
                                border-bottom-style: solid
                            }
                    
                            h1,
                            h2,
                            h3 {
                                font-weight: 400
                            }
                    
                            a:hover {
                                text-decoration: underline
                            }
                    
                            table {
                                border-collapse: collapse
                            }
                    
                            table > thead > tr > th {
                                text-align: left
                            }
                    
                            table > thead > tr > th,
                            table > thead > tr > td,
                            table > tbody > tr > th,
                            table > tbody > tr > td {
                                padding: 5px 10px
                            }
                    
                            blockquote {
                                margin: 0 7px 0 5px;
                                padding: 0 16px 0 10px;
                                border-left: 5px solid
                            }
                    
                            code {
                                font-family: Menlo, Monaco, Consolas, "Droid Sans Mono", "Courier New", monospace, "Droid Sans Fallback";
                                font-size: 14px;
                                line-height: 19px
                            }
                    
                            .mac code {
                                font-size: 12px;
                                line-height: 18px
                            }
                    
                            code > div {
                                padding: 16px;
                                border-radius: 3px;
                                overflow: auto
                            }
                    
                            .monaco-tokenized-source {
                                white-space: pre
                            }
                    
                            /** Theming */
                    
                            .vscode-light {
                                color: #1e1e1e
                            }
                    
                            .vscode-dark {
                                color: #ddd
                            }
                    
                            .vscode-high-contrast {
                                color: #fff
                            }
                    
                            .vscode-light code {
                                color: #a31515
                            }
                    
                            .vscode-dark code {
                                color: #d7ba7d
                            }
                    
                            .vscode-light code > div {
                                background-color: rgba(220, 220, 220, .4)
                            }
                    
                            .vscode-dark code > div {
                                background-color: rgba(10, 10, 10, .4)
                            }
                    
                            .vscode-high-contrast code > div {
                                background-color: #000
                            }
                    
                            .vscode-high-contrast h1 {
                                border-color: #000
                            }
                    
                            .vscode-light table > thead > tr > th {
                                border-color: rgba(0, 0, 0, .69)
                            }
                    
                            .vscode-dark table > thead > tr > th {
                                border-color: rgba(255, 255, 255, .69)
                            }
                    
                            .vscode-light h1,
                            .vscode-light hr,
                            .vscode-light table > tbody > tr + tr > td {
                                border-color: rgba(0, 0, 0, .18)
                            }
                    
                            .vscode-dark h1,
                            .vscode-dark hr,
                            .vscode-dark table > tbody > tr + tr > td {
                                border-color: rgba(255, 255, 255, 0.18)
                            }
                    
                            .vscode-light blockquote,
                            .vscode-dark blockquote {
                                background: rgba(127, 127, 127, .1);
                                border-color: rgba(0, 122, 204, .5)
                            }
                    
                            .vscode-high-contrast blockquote {
                                background: transparent;
                                border-color: #fff
                            }
                    
                            .main-content {
                                width: 65%;
                                vertical-align: top
                            }
                    
                            .sidebar {
                                vertical-align: top
                            }
                    
                            .footer {
                                padding: 25px;
                                text-align: center
                            }
                    
                            .vscode-light table > tbody > tr > td.sidebar {
                                background-color: rgba(0, 0, 0, 0.1);
                                border-radius: 10px
                            }
                    
                            .vscode-dark table > tbody > tr > td.sidebar {
                                background-color: rgba(255, 255, 255, 0.1);
                                border-radius: 10px
                            }
                    
                            .vscode-light a {
                                color: #4080D0
                            }
                    
                            .vscode-dark a {
                                color: #a2c1e8
                            }

                            .vscode-high-contrast .codeSnippetContainerCode div {
                                color: black !important
                            }

                            .vscode-light .codeSnippetContainerCode div {
                                color: black !important
                            }

                            .vscode-dark .codeSnippetContainerCode div {
                                color: white !important
                            }
                        </STYLE>
                    </head>
                    <body>
                    ${topic}
                    </body>
                    </html>
                    `);
                });
                response.on('error', (error) => { console.log(error); });
            });
            request.on('error', (error) => { console.log(error) });
            request.end();
        });
    }
}