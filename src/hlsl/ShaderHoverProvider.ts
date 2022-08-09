'use strict';
import { HoverProvider, Hover, SymbolInformation, TextDocument, CancellationToken, Position, ViewColumn, Disposable, commands, window, WebviewPanel, ProviderResult, Uri } from 'vscode';
import { getWebviewContent } from '../getWebviewContent';

export type Language = 'hlsl' | 'glsl';

export abstract class ShaderHoverProvider implements HoverProvider {
    abstract provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover>;
    private _subscriptions: Disposable[] = [];
    private _panel: WebviewPanel = null;

    protected getSymbols(document: TextDocument): Thenable<SymbolInformation[]> {
        return commands.executeCommand<SymbolInformation[]>('vscode.executeDocumentSymbolProvider', document.uri);
    }

    protected get openLinkCommand() {
        return `shader.openLink${this.language}`
    }

    constructor(protected language: Language, prepareHtmlForTemplate: (uri: Uri, html: string) => string, scripts: string = '') {
        this._subscriptions.push(commands.registerCommand(this.openLinkCommand, async (link: string, newWindow: boolean) => {
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
                                commands.executeCommand(this.openLinkCommand, message.text);
                                return;
                        }
                    }
                );
            }
            this._panel.reveal();
            // And set its HTML content
            try {
                const html = await getWebviewContent(link, prepareHtmlForTemplate, scripts);
                this._panel.webview.html = html;
            } catch (e) {
                console.error(e);
            }
            
        }));

    }

    dispose() {
        this._subscriptions.forEach(s => { s.dispose(); });
    }
}
