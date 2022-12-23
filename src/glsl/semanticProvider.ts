import { DocumentSemanticTokensProvider, SemanticTokensLegend, TextDocument, CancellationToken, SemanticTokens, SemanticTokensBuilder } from 'vscode';

const tokenTypes = new Map<string, number>();

const structNameTokenType = 'class';

const _USC = '_'.charCodeAt(0);
const _a = 'a'.charCodeAt(0);
const _z = 'z'.charCodeAt(0);
const _A = 'A'.charCodeAt(0);
const _Z = 'Z'.charCodeAt(0);
const _0 = '0'.charCodeAt(0);
const _9 = '9'.charCodeAt(0);

export const GLSLSemanticProviderLegend = (function() {
    const tokenTypesLegend = [
        structNameTokenType
    ];
    tokenTypesLegend.forEach((tokenType, index) => tokenTypes.set(tokenType, index));
    return new SemanticTokensLegend(tokenTypesLegend, []);
})();

interface IParsedToken {
    line: number;
    startCharacter: number;
    length: number;
    tokenType: string;
    tokenModifiers: string[];
}

export class GLSLSemanticProvider implements DocumentSemanticTokensProvider {
    async provideDocumentSemanticTokens(document: TextDocument, token: CancellationToken): Promise<SemanticTokens> {
        const allTokens = this.parseText(document.getText());
        const builder = new SemanticTokensBuilder();
        allTokens.forEach((token) => {
            builder.push(token.line, token.startCharacter, token.length, 0, 0);
        });
        return builder.build();
    }

    private isVaidStructName(name: string): boolean {
        for (let i = 0; i < name.length; i++) {
            const ch = name.charCodeAt(i);
            if (!(ch === _USC || // _
                  ch >= _a && ch <= _z || // a-z
                  ch >= _A && ch <= _Z || // A-Z
                  ch >= _0 && ch <= _9 || // 0/9
                  ch >= 0x80 && ch <= 0xFFFF)) { // nonascii

                return false;
            }
        }
        return name.length > 0;
    }

    private parseText(text: string): IParsedToken[] {
        const r: IParsedToken[] = [];

        const structDefRegex = /\bstruct\b( |\n)+[A-z|a-z|0-9|_]+/g;
        const structs = text.match(structDefRegex).map(struct =>
            struct?.replace(/\bstruct\b( |\n)+/, '')
        ).filter(structName => structName && this.isVaidStructName(structName));

        const lines = text.split(/\r\n|\r|\n/);
        lines.forEach((line, i) => {
            structs.forEach((structName) => {
                const structNameMatch = new RegExp(`\\b${structName}\\b`, 'g');
                let match: RegExpExecArray | null;
                while ((match = structNameMatch.exec(line)) !== null) {
                    r.push({
                        line: i,
                        startCharacter: match.index,
                        length: structName.length,
                        tokenType: structNameTokenType,
                        tokenModifiers: []
                    });
                }
            });
        });
        return r;
    }
}
