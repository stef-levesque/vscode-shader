'use strict';

import { ReferenceProvider, CancellationToken, TextDocument, Position, Location, SymbolInformation, commands, workspace } from 'vscode';

export default class HLSLReferenceProvider implements ReferenceProvider {

    public provideReferences(document: TextDocument, position: Position, options: { includeDeclaration: boolean }, token: CancellationToken): Thenable<Location[]> {
        let enable = workspace.getConfiguration('hlsl').get<boolean>('suggest.basic', true);
        if (!enable) {
            return null;
        }

        let wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return null;
        }

        let name = document.getText(wordRange);

        return new Promise<Location[]>( async (resolve, reject) => {
            let results: Location[] = [];

            const text = document.getText();
            
            const regex = new RegExp(`\\b${name}\\b`, 'gm');
            let match: RegExpExecArray = null;
            while (match = regex.exec(text)) {
                let refPosition = document.positionAt(match.index);
                results.push(new Location(document.uri, document.getWordRangeAtPosition(refPosition)));
            }

            let symbols = await commands.executeCommand<SymbolInformation[]>('vscode.executeWorkspaceSymbolProvider', name);
            symbols.filter(s => (s.name === name && s.location.uri.toString() != document.uri.toString()) ).forEach(symbol => {
                results.push(symbol.location);
            });
            resolve(results);
        });
    }
}
