'use strict'

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as Path from 'path';
import * as tmp from 'tmp';

import { setRgPath } from './common'

import HLSLHoverProvider from './hlsl/hoverProvider';
import HLSLCompletionItemProvider from './hlsl/completionProvider';
import HLSLSignatureHelpProvider from './hlsl/signatureProvider';
import HLSLSymbolProvider from './hlsl/symbolProvider';
import HLSLDefinitionProvider from './hlsl/definitionProvider';
import HLSLReferenceProvider from './hlsl/referenceProvider';

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

    if (process.mainModule.hasOwnProperty('paths')) {
        for (let path of process.mainModule['paths']) {
            let testPath = Path.join(path, 'vscode-ripgrep', 'bin', process.platform === 'win32' ? 'rg.exe' : 'rg');
            if (fs.existsSync(testPath)) {
                setRgPath(testPath);
                break;
            }
        }
    }

    // add providers
    context.subscriptions.push(vscode.languages.registerHoverProvider('hlsl', new HLSLHoverProvider()));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('hlsl', new HLSLCompletionItemProvider(), '.'));
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider('hlsl', new HLSLSignatureHelpProvider(), '(', ','));
    context.subscriptions.push(vscode.languages.registerReferenceProvider('hlsl', new HLSLReferenceProvider()));

    let symbolProvider = new HLSLSymbolProvider();
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider('hlsl', symbolProvider));
    context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(symbolProvider));

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