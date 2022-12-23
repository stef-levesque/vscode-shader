'use strict'

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as Path from 'path';
import * as tmp from 'tmp';

import { setRgPath, setHlslExtensions } from './common'

import HLSLHoverProvider from './hlsl/hoverProvider';
import HLSLCompletionItemProvider from './hlsl/completionProvider';
import HLSLSignatureHelpProvider from './hlsl/signatureProvider';
import HLSLSymbolProvider from './hlsl/symbolProvider';
import HLSLDefinitionProvider from './hlsl/definitionProvider';
import HLSLReferenceProvider from './hlsl/referenceProvider';

import { GLSLSemanticProvider, GLSLSemanticProviderLegend } from './glsl/semanticProvider';

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

const HLSLDocumentSelector = [
    { language: 'hlsl', scheme: 'file' },
    { language: 'hlsl', scheme: 'untitled' },
];

const GLSLDocumentSelector = [
    { language: 'glsl', scheme: 'file' },
    { language: 'glsl', scheme: 'untitled' },
];

function searchRgPath()
{
    function exeName() {
        const isWin = /^win/.test( process.platform );
        return isWin ? "rg.exe" : "rg";
    }

    function exePathIsDefined( rgExePath ) {
        return fs.existsSync( rgExePath ) ? rgExePath : undefined;
    }

    let rgPath = "";

    rgPath = exePathIsDefined( Path.join( vscode.env.appRoot, "node_modules/vscode-ripgrep/bin/", exeName() ) );
    if( rgPath ) {
        return rgPath;
    }

    // If vscode-ripgrep is in an .asar file, then the binary is unpacked.
    rgPath = exePathIsDefined( Path.join( vscode.env.appRoot, "node_modules.asar.unpacked/vscode-ripgrep/bin/", exeName() ) );
    if( rgPath ) {
        return rgPath;
    }

    return rgPath;
}

export async function activate(context: vscode.ExtensionContext) {

    console.log('vscode-shader extension started');

    const rgDiskPath = searchRgPath();
    if (!rgDiskPath) {
        console.log("vscode-shader couldn't find vscode-ripgrep binary path");
    }
    setRgPath(rgDiskPath);


    const associations = vscode.workspace.getConfiguration('files.associations');
    for (const fileType of Object.keys(associations)){
        if(associations[fileType]  === 'hlsl')
        {
            setHlslExtensions(fileType.substring(1));
        }
    }

    // add providers
    context.subscriptions.push(vscode.languages.registerHoverProvider(HLSLDocumentSelector, new HLSLHoverProvider()));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(HLSLDocumentSelector, new HLSLCompletionItemProvider(), '.'));
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider(HLSLDocumentSelector, new HLSLSignatureHelpProvider(), '(', ','));
    context.subscriptions.push(vscode.languages.registerReferenceProvider(HLSLDocumentSelector, new HLSLReferenceProvider()));

    let symbolProvider = new HLSLSymbolProvider();
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(HLSLDocumentSelector, symbolProvider));
    context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(symbolProvider));

    let definitionProvider = new HLSLDefinitionProvider();
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(HLSLDocumentSelector, definitionProvider));
    context.subscriptions.push(vscode.languages.registerImplementationProvider(HLSLDocumentSelector, definitionProvider));
    context.subscriptions.push(vscode.languages.registerTypeDefinitionProvider(HLSLDocumentSelector, definitionProvider));

    if (vscode.extensions.getExtension('ms-vscode.cpptools') !== undefined) {
        let formatingProvider = new HLSLFormatingProvider();
        context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(HLSLDocumentSelector, formatingProvider));
        context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(HLSLDocumentSelector, formatingProvider));
    }

    context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(GLSLDocumentSelector, new GLSLSemanticProvider(), GLSLSemanticProviderLegend));
}
