'use strict'

import * as vscode from 'vscode';

import HLSLHoverProvider from './hlsl/hoverProvider';
import HLSLCompletionItemProvider from './hlsl/completionProvider';

export function activate(context: vscode.ExtensionContext) {

    console.log('vscode-shader extension started');

    // add providers
    context.subscriptions.push(vscode.languages.registerHoverProvider('hlsl', new HLSLHoverProvider()));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('hlsl', new HLSLCompletionItemProvider(), '.'));
    
}