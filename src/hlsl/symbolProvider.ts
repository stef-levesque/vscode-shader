'use strict';

import { DocumentSymbolProvider, WorkspaceSymbolProvider, SymbolKind, SymbolInformation, CancellationToken, TextDocument, Position, Range, RelativePattern, Location, Uri, Disposable, workspace, extensions } from 'vscode';
import { rgPath } from 'vscode-ripgrep';
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

    private _symbolCache: ISymbolCache;
    private _disposables: Disposable[] = [];

    private _hlslPattern = '{**/*.hlsl,**/*.hlsli,**/*.fx,**/*.fxh,**/*.vsh,**/*.psh,**/*.cginc,**/*.compute}';
    
    constructor() {
        this._symbolCache = {};

        const extention = extensions.getExtension('vscode.hlsl');
        if (extention && extention.packageJSON 
            && extention.packageJSON.contributes
            && extention.packageJSON.contributes.languages) {
            let hlsllang: any[] = extention.packageJSON.contributes.languages.filter(l => l.id === 'hlsl');
            if (hlsllang.length && hlsllang[0].extensions) {
                this._hlslPattern = '{**/*' + hlsllang[0].extensions.join(',**/*') + '}';
            }
        }

        // watch files to invalidate cache, if needed
        let watcher = workspace.createFileSystemWatcher(new RelativePattern(workspace.rootPath, this._hlslPattern), true);
        watcher.onDidChange(uri => { this._symbolCache[uri.fsPath] = undefined; console.log(uri.fsPath); });
        watcher.onDidDelete(uri => { this._symbolCache[uri.fsPath] = undefined; console.log(uri.fsPath); });
        this._disposables.push(watcher);
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

    public provideWorkspaceSymbols(query: string, token: CancellationToken): Thenable<SymbolInformation[]> {
        return new Promise<SymbolInformation[]>((resolve, reject) => {

            workspace.findFiles(this._hlslPattern).then(uris => {
                let files = uris.reduce((a,b) => {
                    if (!this._symbolCache[b.fsPath]) {
                        this._symbolCache[b.fsPath] = [];
                        a += ' ' + b.fsPath;
                    }
                    return a;
                }, '');

                if (files !== '') {
                    const execOpts = {
                        cwd: workspace.rootPath,
                        maxBuffer: 1024 * 1024
                    }
                    
                    for (let entry of searchPatterns) {
                        const kind = entry.kind;
                        const searchPattern = entry.pattern;
                        let output = execSync(`${rgPath} -o --case-sensitive --line-number --column --hidden -e "${searchPattern}" ${files}`, execOpts);

                        let lines = output.toString().split('\n');
                        for (let line of lines) {
                            let lineMatch = /^(?:((?:[a-zA-Z]:)?[^:]*):)?(\d+):(\d):(.+)/.exec(line);
                            if (lineMatch) {
                                let position: Position = new Position(parseInt(lineMatch[2]) - 1, parseInt(lineMatch[3]) - 1);
                                let range = new Range(position, position);
                                let filepath = lineMatch[1] ? lineMatch[1] : files.trim();//join(workspace.rootPath, match[1]);
                                let regex = new RegExp(searchPattern);
                                let word = '?????';
                                let symbolMatch = regex.exec(lineMatch[4].toString());
                                if (symbolMatch) {
                                    word = symbolMatch[1];
                                    position = position.with({character: symbolMatch[0].indexOf(word)});
                                    range = new Range(position, position.translate(0, word.length));
                                }

                                if (!this._symbolCache[filepath]) {
                                    console.log('missing: ' + filepath);
                                    this._symbolCache[filepath] = [];
                                }

                                this._symbolCache[filepath].push(new SymbolInformation(word, kind, '', new Location(Uri.file(filepath), range)));
                            }
                        }
                    }

                }

                let results: SymbolInformation[] = [];
                for (let key in this._symbolCache) {
                    if(this._symbolCache[key]) {
                        results.push(...this._symbolCache[key]);
                    }
                }

                resolve( results );

            })
        });

    }

}
