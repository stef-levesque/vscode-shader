'use strict';

import { DocumentSymbolProvider, WorkspaceSymbolProvider, SymbolKind, SymbolInformation, CancellationToken, TextDocument, Position, Range, Location, Uri, workspace } from 'vscode';

const functionMatch = /^\w+\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9:_\x7f-\xff]*)\s*\(/mg; 
const structMatch = /^(?:struct|cbuffer|tbuffer)\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9:_\x7f-\xff]*)/mg;
const samplerMatch = /^(?:sampler|sampler1D|sampler2D|sampler3D|samplerCUBE|samplerRECT|sampler_state|SamplerState)\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9:_\x7f-\xff]*)/mg;
const textureMatch = /^(?:texture|texture2D|textureCUBE|Texture1D|Texture1DArray|Texture2D|Texture2DArray|Texture2DMS|Texture2DMSArray|Texture3D|TextureCube|TextureCubeArray|RWTexture1D|RWTexture1DArray|RWTexture2D|RWTexture2DArray|RWTexture3D)(?:\s*<(?:[a-zA-Z_\x7f-\xff][a-zA-Z0-9,_\x7f-\xff]*)>)?\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9\[\]_\x7f-\xff]*)/mg;
const bufferMatch = /^(?:AppendStructuredBuffer|Buffer|ByteAddressBuffer|ConsumeStructuredBuffer|RWBuffer|RWByteAddressBuffer|RWStructuredBuffer|StructuredBuffer)(?:\s*<(?:[a-zA-Z_\x7f-\xff][a-zA-Z0-9,_\x7f-\xff]*)>)?\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9\[\]_\x7f-\xff]*)/mg;


export default class HLSLDocumentSymbolProvider implements DocumentSymbolProvider, WorkspaceSymbolProvider {

    private getDocumentSymbols(uri: Uri): Promise<SymbolInformation[]> {
        return new Promise<SymbolInformation[]>((resolve, reject) => {
            let result: SymbolInformation[] = [];

            let document: TextDocument = null;
            for (let d of workspace.textDocuments) {
                if (d.uri.toString() === uri.toString()) {
                    document = d;
                    break;
                }
            }

            if (document === null) {
                resolve([]);
                return;
            }

            let text = document.getText();

            function fetchSymbol(regex: RegExp, kind: SymbolKind) {
                let match: RegExpExecArray = null;
                while (match = regex.exec(text)) {
                    let line = document.positionAt(match.index).line;
                    let range = document.lineAt(line).range;
                    let word = match[1];

                    let lastChar =  kind === SymbolKind.Function ? ')' :
                                    kind === SymbolKind.Struct ? '}' :
                                    kind === SymbolKind.Variable ? ';' :
                                    kind === SymbolKind.Field ? ';' :
                                    '';

                    if (lastChar) {
                        let end = text.indexOf(lastChar, match.index) + 1;
                        range = new Range(range.start, document.positionAt(end));
                    }
                    result.push(new SymbolInformation(word, kind, '', new Location(document.uri, range)));
                }
            }

            fetchSymbol(functionMatch, SymbolKind.Function);
            fetchSymbol(structMatch, SymbolKind.Struct);
            fetchSymbol(samplerMatch, SymbolKind.Variable);
            fetchSymbol(textureMatch, SymbolKind.Field);
            fetchSymbol(bufferMatch, SymbolKind.Field);

            resolve(result);

        });
    }

    public provideDocumentSymbols(document: TextDocument, token: CancellationToken): Thenable<SymbolInformation[]> {
        return this.getDocumentSymbols(document.uri);
    }

    public provideWorkspaceSymbols(query: string, token: CancellationToken): Thenable<SymbolInformation[]> {
        return new Promise<SymbolInformation[]>((resolve, reject) => {
            workspace.findFiles('**/*.hlsl', '**/node_modules/**').then(uris => {
                let results: SymbolInformation[] = [];
                let symbolPromises: Promise<SymbolInformation[]>[] = [];
                for (let uri of uris) {
                    symbolPromises.push( this.getDocumentSymbols(uri) );
                }
                Promise.all(symbolPromises).then(values => {
                    resolve( values.reduce((a,b) => a.concat(b), []) );
                });
            })
        });

    }

}
