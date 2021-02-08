'use strict'

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as Path from 'path';
import * as tmp from 'tmp';

import { setRgPath, getRgPath, sethlslExtensions } from './common'

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

        let doc = await vscode.workspace.openTextDocument(tmpFile.name);
        return vscode.commands.executeCommand<vscode.TextEdit[]>('vscode.executeFormatDocumentProvider', doc.uri, options)
            .then(r => (tmpFile.removeCallback(), r));
    }

    public async provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions, token: vscode.CancellationToken): Promise<vscode.TextEdit[]> {

        var tmpFile = tmp.fileSync({prefix: 'hlsl-', postfix: '.cpp'});
        fs.writeFileSync(tmpFile.name, document.getText());

        let doc = await vscode.workspace.openTextDocument(tmpFile.name);
        return vscode.commands.executeCommand<vscode.TextEdit[]>('vscode.executeFormatRangeProvider', doc.uri, range, options)
            .then(r => (tmpFile.removeCallback(), r));
    }

}

const documentSelector = [
    { language: 'hlsl', scheme: 'file' },
    { language: 'hlsl', scheme: 'untitled' },
];

function ripgrepPath()
{
    function exeName()
    {
        var isWin = /^win/.test( process.platform );
        return isWin ? "rg.exe" : "rg";
    }

    function exePathIsDefined( rgExePath )
    {
        return fs.existsSync( rgExePath ) ? rgExePath : undefined;
    }

    var rgPath = "";

    rgPath = exePathIsDefined( Path.join( vscode.env.appRoot, "node_modules/vscode-ripgrep/bin/", exeName() ) );
    if( rgPath ) return rgPath;

    rgPath = exePathIsDefined( Path.join( vscode.env.appRoot, "node_modules.asar.unpacked/vscode-ripgrep/bin/", exeName() ) );
    if( rgPath ) return rgPath;

    return rgPath;
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

    if (!getRgPath())
    {
        let path = ripgrepPath();
        setRgPath(path);
    }

    let associations = vscode.workspace.getConfiguration('files.associations');
    for(let fileType of Object.keys(associations)){
        if(associations[fileType]  === 'hlsl')
        {
            sethlslExtensions(fileType.substring(1));
        }
    }

    // add providers
    context.subscriptions.push(vscode.languages.registerHoverProvider(documentSelector, new HLSLHoverProvider()));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(documentSelector, new HLSLCompletionItemProvider(), '.'));
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider(documentSelector, new HLSLSignatureHelpProvider(), '(', ','));
    context.subscriptions.push(vscode.languages.registerReferenceProvider(documentSelector, new HLSLReferenceProvider()));

    let symbolProvider = new HLSLSymbolProvider();
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(documentSelector, symbolProvider));
    context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(symbolProvider));

    let definitionProvider = new HLSLDefinitionProvider();
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(documentSelector, definitionProvider));
    context.subscriptions.push(vscode.languages.registerImplementationProvider(documentSelector, definitionProvider));
    context.subscriptions.push(vscode.languages.registerTypeDefinitionProvider(documentSelector, definitionProvider));

    if (vscode.extensions.getExtension('ms-vscode.cpptools') !== undefined) {
        let formatingProvider = new HLSLFormatingProvider();
        context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(documentSelector, formatingProvider));
        context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(documentSelector, formatingProvider));
    }

}
