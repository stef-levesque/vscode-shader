'use strict';

import { Hover, SymbolKind, MarkdownString, MarkedString, TextDocument, CancellationToken, Range, Position, workspace, Uri } from 'vscode';
import { linkToMarkdownString, textToMarkedString } from '../markdown';
import * as glslReference from '../generated/glsl-reference.json';
import { ShaderHoverProvider } from '../hlsl/ShaderHoverProvider';
import { JSDOM } from 'jsdom';
import { replaceLinks } from '../getWebviewContent';

const prepareHtmlForTemplate = (uri: Uri, html: string): string => {
    // because https://github.com/KhronosGroup/OpenGL-Refpages/issues/52
    const fixedHtml = html.replace('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML"/>','');
    const dom = new JSDOM(fixedHtml);
    let node = dom.window.document.querySelector('.refentry');
    if (node) {
        replaceLinks(node, dom, uri);
        return node.outerHTML;

    } else {
        let link = uri.with({ scheme: 'https' }).toString();
        return `<a href="${link}">No topic found, click to follow link</a>`;
    }
}

const scripts = `<script type="text/x-mathjax-config">
MathJax.Hub.Config({
    MathML: {
        extensions: ["content-mathml.js"]
    },
    tex2jax: {
        inlineMath: [['$','$'], ['\\(','\\)']]
    }
});
</script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
`

export default class GLSLHoverProvider extends ShaderHoverProvider {
    constructor() {
        super('glsl', prepareHtmlForTemplate, scripts);
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
            // TODO: preprocessors
        }

        var entry = glslReference.functions[name]
        if (entry && entry.description) {
            const signature = `(*function*) **${name}**(${entry.parameters.map(p => p.label).join(',')})`;
            let contents: MarkedString[] = [];
            contents.push(new MarkdownString(signature));
            contents.push(textToMarkedString(entry.description));
            contents.push(linkToMarkdownString(entry.link, this.openLinkCommand, this.language));
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
                    contents.push( {language: 'glsl', value: document.getText(s.location.range)} );
                }
                
                return new Hover(contents, wordRange);
            }
        }
    } 
}


