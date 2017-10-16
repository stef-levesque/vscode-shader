'use strict'

import * as vscode from 'vscode';

import HLSLHoverProvider from './hlsl/hoverProvider';
import HLSLCompletionItemProvider from './hlsl/completionProvider';
import HLSLSignatureHelpProvider from './hlsl/signatureProvider';
import HLSLSymbolProvider from './hlsl/symbolProvider';

export function activate(context: vscode.ExtensionContext) {

    console.log('vscode-shader extension started');

    // add providers
    context.subscriptions.push(vscode.languages.registerHoverProvider('hlsl', new HLSLHoverProvider()));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('hlsl', new HLSLCompletionItemProvider(), '.'));
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider('hlsl', new HLSLSignatureHelpProvider(), '(', ','));
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider('hlsl', new HLSLSymbolProvider()));
    
}