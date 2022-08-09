'use strict';
import { HoverProvider, Hover, SymbolInformation, TextDocument, CancellationToken, Position, ViewColumn, Disposable, commands, window, WebviewPanel, ProviderResult } from 'vscode';
import { getWebviewContent } from '../getWebviewContent';


export abstract class ShaderHoverProvider implements HoverProvider {
    abstract provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover>;
    private _subscriptions: Disposable[] = [];
    private _panel: WebviewPanel = null;

    protected getSymbols(document: TextDocument): Thenable<SymbolInformation[]> {
        return commands.executeCommand<SymbolInformation[]>('vscode.executeDocumentSymbolProvider', document.uri);
    }

    constructor(language: 'hlsl' | 'glsl') {
        const openLinkCommand = `shader.openLink${language}`;
        this._subscriptions.push(commands.registerCommand(openLinkCommand, (link: string, newWindow: boolean) => {
            if (!this._panel) {
                this._panel = window.createWebviewPanel(
                    `${language}doc`,
                    `${language.toUpperCase()} Documentation`,
                    newWindow ? ViewColumn.Two : ViewColumn.Active,
                    {
                        // Enable scripts in the webview
                        enableScripts: true
                    }
                );

                this._panel.onDidDispose(() => {
                    this._panel = null;
                });

                this._panel.webview.onDidReceiveMessage(
                    message => {
                        switch (message.command) {
                            case 'clickLink':
                                commands.executeCommand(openLinkCommand, message.text);
                                return;
                        }
                    }
                );
            }
            this._panel.reveal();
            // And set its HTML content
            getWebviewContent(link).then(html => this._panel.webview.html = html);
        }));

    }

    dispose() {
        this._subscriptions.forEach(s => { s.dispose(); });
    }
}
