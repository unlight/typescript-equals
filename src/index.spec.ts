import { expect } from 'earljs';

import { equals } from '.';

it('smoke', () => {
    const text1 = `var a = 1`;
    const text2 = `var a = 1`;
    expect(equals(text1, text2)).toEqual(true);
});

it('spaces', () => {
    const text1 = `var a = 1`;
    const text2 = `var a\t =\n1`;
    expect(equals(text1, text2)).toEqual(true);
});

it('object trailing comma', () => {
    const text1 = `var a = {a:1}`;
    const text2 = `var a = {a:1,}`;
    expect(equals(text1, text2)).toEqual(true);
});

it('object multiple trailing comma', () => {
    const text1 = `var a = {a:1}`;
    const text2 = `var a = {a:1,,,}`;
    expect(equals(text1, text2)).toEqual(true);
});

it('array trailing comma', () => {
    const text1 = `var a = [1]`;
    const text2 = `var a = [1,]`;
    expect(equals(text1, text2)).toEqual(true);
});

it('array multiple trailing comma', () => {
    const text1 = `var a = [1]`;
    const text2 = `var a = [1,,,]`;
    expect(equals(text1, text2)).toEqual(true);
});

it('comment multiple line', () => {
    const text1 = `/* comment */ const a = 1`;
    const text2 = `const a = 1`;
    expect(equals(text1, text2)).toEqual(true);
});

it('comment single line', () => {
    const text1 = `// comment
    const a = 1`;
    const text2 = `const a = 1`;
    expect(equals(text1, text2)).toEqual(true);
});

it('semi colon', () => {
    const text1 = `var a = 1;`;
    const text2 = `var a = 1`;
    expect(equals(text1, text2)).toEqual(true);
});

it('quotes', () => {
    const text1 = `var a = '1'`;
    const text2 = `var a = "1"`;
    expect(equals(text1, text2)).toEqual(true);
});

it('ticks is not a quote', () => {
    const text1 = 'var a = `1`';
    const text2 = `var a = '1'`;
    expect(equals(text1, text2)).toEqual(false);
    const text3 = `var a = "1"`;
    expect(equals(text1, text3)).toEqual(false);
});

it('parenthesis expression', () => {
    const text1 = `var a = (1)`;
    const text2 = `var a = 1`;
    expect(equals(text1, text2));
});

it('arrow function positive', () => {
    const text1 = `var a = (x) => x`;
    const text2 = `var a = x => x`;
    expect(equals(text1, text2)).toEqual(true);
});

it('arrow function negative', () => {
    const text1 = `var a = (x) => x`;
    const text2 = `var b = (x) => x`;
    expect(equals(text1, text2)).toEqual(false);
});
