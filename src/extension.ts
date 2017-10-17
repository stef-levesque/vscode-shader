'use strict'

import * as vscode from 'vscode';

import HLSLHoverProvider from './hlsl/hoverProvider';
import HLSLCompletionItemProvider from './hlsl/completionProvider';
import HLSLSignatureHelpProvider from './hlsl/signatureProvider';
import HLSLSymbolProvider from './hlsl/symbolProvider';
import HLSLDefinitionProvider from './hlsl/definitionProvider';

import * as fs from 'fs';
import * as tmp from 'tmp';

class HLSLFormatingProvider implements vscode.DocumentFormattingEditProvider, vscode.DocumentRangeFormattingEditProvider {

    public async provideDocumentFormattingEdits(document: vscode.TextDocument, options: vscode.FormattingOptions, token: vscode.CancellationToken): Promise<vscode.TextEdit[]> {
        var tmpFile = tmp.fileSync({prefix: 'hlsl-', postfix: '.cpp'});
        fs.writeFileSync(tmpFile.name, document.getText());
        return vscode.commands.executeCommand<vscode.TextEdit[]>('vscode.executeFormatDocumentProvider', vscode.Uri.file(tmpFile), options);
    }

    public async provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions, token: vscode.CancellationToken): Promise<vscode.TextEdit[]> {

        var tmpFile = tmp.fileSync({prefix: 'hlsl-', postfix: '.cpp'});
        fs.writeFileSync(tmpFile.name, document.getText());

        let doc = await vscode.workspace.openTextDocument(tmpFile.name);
        return vscode.commands.executeCommand<vscode.TextEdit[]>('vscode.executeFormatRangeProvider', doc.uri, range, options);
    }

}

export async function activate(context: vscode.ExtensionContext) {

    console.log('vscode-shader extension started');

    // add providers
    context.subscriptions.push(vscode.languages.registerHoverProvider('hlsl', new HLSLHoverProvider()));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('hlsl', new HLSLCompletionItemProvider(), '.'));
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider('hlsl', new HLSLSignatureHelpProvider(), '(', ','));
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider('hlsl', new HLSLSymbolProvider()));

    let definitionProvider = new HLSLDefinitionProvider();
    context.subscriptions.push(vscode.languages.registerDefinitionProvider('hlsl', definitionProvider));
    context.subscriptions.push(vscode.languages.registerImplementationProvider('hlsl', definitionProvider));
    context.subscriptions.push(vscode.languages.registerTypeDefinitionProvider('hlsl', definitionProvider));

    if (vscode.extensions.getExtension('ms-vscode.cpptools') !== undefined) {
        let formatingProvider = new HLSLFormatingProvider();
        context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('hlsl', formatingProvider));
        context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider('hlsl', formatingProvider));
    }

}