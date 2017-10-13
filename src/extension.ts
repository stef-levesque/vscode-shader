'use strict'

import * as vscode from 'vscode';

import HLSLHoverProvider from './hlsl/hoverProvider';

export function activate(context: vscode.ExtensionContext) {

    console.log('vscode-shader extension started');

    // add providers
    context.subscriptions.push(vscode.languages.registerHoverProvider('hlsl', new HLSLHoverProvider()));

}