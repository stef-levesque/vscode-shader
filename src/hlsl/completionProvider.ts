'use strict';

import { CompletionItemProvider, CompletionItem, CompletionItemKind, CancellationToken, TextDocument, Position, Range, TextEdit, workspace } from 'vscode';
import hlslGlobals = require('./hlslGlobals');


export default class HLSLCompletionItemProvider implements CompletionItemProvider {

    public triggerCharacters = ['.'];

    public provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): Promise<CompletionItem[]> {
        let result: CompletionItem[] = [];

        let enable = workspace.getConfiguration('hlsl').get<boolean>('suggest.basic', true);
        if (!enable) {
            return Promise.resolve(result);
        }

        var range = document.getWordRangeAtPosition(position);
        var prefix = range ? document.getText(range) : '';
        if (!range) {
            range = new Range(position, position);
        }

        var added: any = {};
        var createNewProposal = function (kind: CompletionItemKind, name: string, entry: hlslGlobals.IEntry, type?: string): CompletionItem {
            var proposal: CompletionItem = new CompletionItem(name);
            proposal.kind = kind;
            if (entry) {
                if (entry.description) {
                    proposal.documentation = entry.description;
                }
                if (entry.parameters) {
                    let signature = type ? '(' + type + ') ' : '';
                    signature += name;
                    signature += '(';
                    if (entry.parameters && entry.parameters.length != 0) {
                        let params = '';
                        entry.parameters.forEach(p => params += p.label + ',');
                        signature += params.slice(0, -1);
                    }
                    signature += ')';
                    proposal.detail = signature;
                }
            }
            return proposal;
        };

        var matches = (name: string) => {
            return prefix.length === 0 || name.length >= prefix.length && name.substr(0, prefix.length) === prefix;
        };

        for (var name in hlslGlobals.datatypes) {
            if (hlslGlobals.datatypes.hasOwnProperty(name) && matches(name)) {
                added[name] = true;
                result.push(createNewProposal(CompletionItemKind.TypeParameter, name, hlslGlobals.datatypes[name], 'datatype'));
            }
        }

        for (var name in hlslGlobals.intrinsicfunctions) {
            if (hlslGlobals.intrinsicfunctions.hasOwnProperty(name) && matches(name)) {
                added[name] = true;
                result.push(createNewProposal(CompletionItemKind.Function, name, hlslGlobals.intrinsicfunctions[name], 'function'));
            }
        }

        for (var name in hlslGlobals.semantics) {
            if (hlslGlobals.semantics.hasOwnProperty(name) && matches(name)) {
                added[name] = true;
                result.push(createNewProposal(CompletionItemKind.Reference, name, hlslGlobals.semantics[name], 'semantic'));
            }
        }

        for (var name in hlslGlobals.semanticsNum) {
            if (hlslGlobals.semanticsNum.hasOwnProperty(name) && matches(name)) {
                added[name] = true;
                result.push(createNewProposal(CompletionItemKind.Reference, name, hlslGlobals.semanticsNum[name], 'semantic'));
            }
        }

        for (var name in hlslGlobals.keywords) {
            if (hlslGlobals.keywords.hasOwnProperty(name) && matches(name)) {
                added[name] = true;
                result.push(createNewProposal(CompletionItemKind.Keyword, name, hlslGlobals.keywords[name], 'keyword'));
            }
        }

        var text = document.getText();
        var functionMatch = /^\w+\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)\s*\(/mg;
        var match: RegExpExecArray = null;
        while (match = functionMatch.exec(text)) {
            var word = match[1];
            if (!added[word]) {
                added[word] = true;
                result.push(createNewProposal(CompletionItemKind.Function, word, null));
            }
        }

        return Promise.resolve(result);
    }
}