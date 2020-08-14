# typescript-equals

Rough implementation of checking of AST equality:
Ignores spaces, comments, quotes, semicolons, parenthesis.

## Install

```sh
npm i -S typescript-equals
```

## Usage

```js
import { equals } from 'typescript-equals';

const text1 = `var a = {a:1}`;
const text2 = `var a = {a:1,}`;
const text3 = `var a = {a: 1} // comment`;

equals(text1, text2); // => true
equals(text1, text3); // => true
equals(text2, text3); // => true
```

## API

```ts
equals(firstText: string, secondText: string): boolean;
```
