# @onus-elements/core

[![npm Version](https://img.shields.io/npm/v/@onus-elements/react.svg)](https://www.npmjs.com/package/@onus-elements/react) [![License](https://img.shields.io/npm/l/@onus-elements/react.svg)](https://www.npmjs.com/package/@onus-elements/react)

## Installing

```
npm install @onus-elements/core
```

or replace `npm` with your dependency management tool of choice

## Usage

```js
import { OnusCore, POSITION_DEFAULT } from '@onus-elements/core';

const core = new OnusCore();

core.subscribe('tag_name', (children) => {
  console.log(
    'This callback is triggerd with the highest priority children:',
    children
  );
});

core.register(
  {
    name: 'tag_name',
    children: 'something to track',
    priority: 0,
  },
  POSITION_DEFAULT
);
```

## Building

Run `nx build onus-core` to build the library.

## Running unit tests

Run `nx test onus-core` to execute the unit tests via [Jest](https://jestjs.io).
