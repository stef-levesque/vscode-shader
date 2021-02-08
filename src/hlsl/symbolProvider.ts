'use strict';

import { DocumentSymbolProvider, WorkspaceSymbolProvider, SymbolKind, SymbolInformation, CancellationToken, TextDocument, Position, Range, RelativePattern, Location, Uri, Disposable, window, workspace, extensions } from 'vscode';
import { rgPath, hlslExtensions } from '../common';
import { execSync } from 'child_process';
import { join } from 'path';

interface ISymbolPattern { kind: SymbolKind, pattern: string }

const searchPatterns: ISymbolPattern[] = [
    { kind: SymbolKind.Function, pattern: /^\w+\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9:_\x7f-\xff]*)\s*\(/.source },
    { kind: SymbolKind.Struct, pattern: /^(?:struct|cbuffer|tbuffer)\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9:_\x7f-\xff]*)/.source },
    { kind: SymbolKind.Variable, pattern: /^(?:sampler|sampler1D|sampler2D|sampler3D|samplerCUBE|samplerRECT|sampler_state|SamplerState)\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9:_\x7f-\xff]*)/.source },
    { kind: SymbolKind.Field, pattern: /^(?:texture|texture2D|textureCUBE|Texture1D|Texture1DArray|Texture2D|Texture2DArray|Texture2DMS|Texture2DMSArray|Texture3D|TextureCube|TextureCubeArray|RWTexture1D|RWTexture1DArray|RWTexture2D|RWTexture2DArray|RWTexture3D)(?:\s*<(?:[a-zA-Z_\x7f-\xff][a-zA-Z0-9,_\x7f-\xff]*)>)?\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9\[\]_\x7f-\xff]*)/.source },
    { kind: SymbolKind.Field, pattern: /^(?:AppendStructuredBuffer|Buffer|ByteAddressBuffer|ConsumeStructuredBuffer|RWBuffer|RWByteAddressBuffer|RWStructuredBuffer|StructuredBuffer)(?:\s*<(?:[a-zA-Z_\x7f-\xff][a-zA-Z0-9,_\x7f-\xff]*)>)?\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9\[\]_\x7f-\xff]*)/.source },
];

export interface ISymbolCache { [path: string]: SymbolInformation[]; }

export default class HLSLDocumentSymbolProvider implements DocumentSymbolProvider, WorkspaceSymbolProvider {

    private _disposables: Disposable[] = [];

    private _hlslPattern = ['.hlsl','.hlsli','.fx','.fxh','.vsh','.psh','.cginc','.compute', '.ush', '.usf'];
    
    constructor() {
        const extention = extensions.getExtension('vscode.hlsl');
        if (extention && extention.packageJSON 
            && extention.packageJSON.contributes
            && extention.packageJSON.contributes.languages) {
            let hlsllang: any[] = extention.packageJSON.contributes.languages.filter(l => l.id === 'hlsl');
            if (hlsllang.length && hlsllang[0].extensions) {
                this._hlslPattern = hlsllang[0].extensions.slice();
            }
        }

        for(let ext of hlslExtensions)
        {
            this._hlslPattern.push(ext);
        }
    }

    public dispose(){
        if (this._disposables.length > 0) {
            this._disposables.forEach(d => d.dispose());
            this._disposables = [];
        }
    }

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

            function fetchSymbol(entry: ISymbolPattern) {
                const kind = entry.kind;
                const pattern = entry.pattern;

                let regex = new RegExp(pattern, "gm");
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

            for (let entry of searchPatterns) {
                fetchSymbol(entry);
            }

            resolve(result);

        });
    }

    public provideDocumentSymbols(document: TextDocument, token: CancellationToken): Thenable<SymbolInformation[]> {
        return this.getDocumentSymbols(document.uri);
    }

    private getDocument(): TextDocument | undefined {
        // we wants to have a resource even when asking
        // general questions so we check the active editor. If this
        // doesn't match we take the first TS document.

        const activeDocument = window.activeTextEditor?.document;
        if (activeDocument) {
            if (activeDocument.languageId == 'hlsl') {
                return activeDocument;
            }
        }

        const documents = workspace.textDocuments;
        for (const document of documents) {
            if (document.languageId == 'hlsl') {
                return document;
            }
        }
        return undefined;
    }

    public provideWorkspaceSymbols(query: string, token: CancellationToken): Thenable<SymbolInformation[]> {
        if (!rgPath) {
            return null;
        }
        
        return new Promise<SymbolInformation[]>((resolve, reject) => {
            let results: SymbolInformation[] = [];

            const document = this.getDocument();
            if (!document){
                resolve( results );
            }

            const ws = workspace.getWorkspaceFolder(document.uri);
            if (!ws) {
                resolve(results);
            }

            const rootPath = ws.uri.fsPath;
            const execOpts = {
                cwd: rootPath,
                maxBuffer: 1024 * 1024
            }

            let includePattern = '-g *' +  this._hlslPattern.join(' -g *'); 

            for (let entry of searchPatterns) {
                const kind = entry.kind;
                const searchPattern = entry.pattern;
                let output = execSync(`"${rgPath}" ${includePattern} -o --case-sensitive -H --line-number --column --hidden -e "${searchPattern}" .`, execOpts);

                let lines = output.toString().split('\n');
                for (let line of lines) {
                    let lineMatch = /^(?:((?:[a-zA-Z]:)?[^:]*):)?(\d+):(\d):(.+)/.exec(line);
                    if (lineMatch) {
                        let position: Position = new Position(parseInt(lineMatch[2]) - 1, parseInt(lineMatch[3]) - 1);
                        let range = new Range(position, position);
                        let filepath = join(rootPath, lineMatch[1]);
                        let regex = new RegExp(searchPattern);
                        let word = '?????';
                        let symbolMatch = regex.exec(lineMatch[4].toString());
                        if (symbolMatch) {
                            word = symbolMatch[1];
                            position = position.with({ character: symbolMatch[0].indexOf(word) });
                            range = new Range(position, position.translate(0, word.length));
                        }

                        results.push(new SymbolInformation(word, kind, '', new Location(Uri.file(filepath), range)));
                    }
                }
            }

            resolve( results );
        });

    }

}
