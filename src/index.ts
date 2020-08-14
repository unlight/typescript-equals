import trim from 'lodash.trim';
import { createScanner, ScriptTarget, SyntaxKind } from 'typescript';

export function equals(firstText: string, secondText: string): boolean {
    const firstTokens = convertToTokens(firstText);
    // console.log('firstTokens', firstTokens);
    const secondTokens = convertToTokens(secondText);
    // console.log('secondTokens', secondTokens);
    return tokensEquals(firstTokens, secondTokens);
}

function tokensEquals(first: TokenInfo[], second: TokenInfo[]) {
    if (first.length !== second.length) {
        return false;
    }
    let index = first.length;
    while (--index >= 0) {
        const firstToken = first[index];
        const secondToken = second[index];
        if (firstToken.text !== secondToken.text) {
            return false;
        }
    }
    return true;
}

type TokenInfo = {
    value: SyntaxKind;
    text: string;
    pos: number;
};

function convertToTokens(text: string) {
    const result: TokenInfo[] = [];

    const scanner = createScanner(ScriptTarget.Latest, true);
    scanner.setText(text);

    while (scanner.scan() !== SyntaxKind.EndOfFileToken) {
        const token = {
            value: scanner.getToken(),
            text: scanner.getTokenText(),
            pos: scanner.getTokenPos(),
        };
        if (
            token.value === SyntaxKind.CommaToken ||
            token.value === SyntaxKind.OpenParenToken ||
            token.value === SyntaxKind.CloseParenToken ||
            token.value === SyntaxKind.SemicolonToken
        ) {
            continue;
        }
        if (token.value === SyntaxKind.StringLiteral) {
            // console.log('token.text', token.text);
            token.text = trim(token.text, '\'"`');
            // console.log('token.text', token.text);
        }
        result.push(token);
    }
    return result;
}
