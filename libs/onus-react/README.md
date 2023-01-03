# @onus-elements/react

[![npm Version](https://img.shields.io/npm/v/@onus-elements/react.svg)](https://www.npmjs.com/package/@onus-elements/react) [![License](https://img.shields.io/npm/l/@onus-elements/react.svg)](https://www.npmjs.com/package/@onus-elements/react)

Separate DOM position from rendering position. Like Portals, but better because you don't have to interact with the DOM, and you can easily replace or append to the previous content.

## Installation

```bash
yarn add onus-elements
```

or

```bash
npm i --save onus-elements
```

## Usage

```jsx
import { GetElement, SetElement, OnusElementsProvider } from 'onus-elements';

<OnusElementsProvider>
  <header>
    <GetElement name="header" />
  </header>
  <footer>
    <SetElement name="header" priority={0}>
      <a href="/">Home</a>
    </SetElement>
    // These can be rendered anywhere in your application, and it will appear where
    GetElement lives in the DOM
    <SetElement name="header" priority={1} append>
      <span>
        > <a href="/breadcrumb">Breadcrumb</a>
      </span>
    </SetElement>
  </footer>
</OnusElementsProvider>;
```

## Props

### GetElement

#### Used as placeholder for where you want content to be rendered

| Prop     | Type   | Default      | Description                                                 |
| -------- | ------ | ------------ | ----------------------------------------------------------- |
| name     | String | **Required** | Unique name that will be matched with SetElement            |
| children | Node   |              | Default content to render if nothing else has been provided |

### SetElement

#### Used to set the content to be rendered inside the GetContent component

| Prop     | Type    | Default      | Description                                           |
| -------- | ------- | ------------ | ----------------------------------------------------- |
| children | Node    | Fragment     | Children to render in GetElement with a matching name |
| name     | String  | **Required** | Unique name that will be matched with GetElement      |
| priority | Number  | **Required** | Priority to render children, highest wins             |
| append   | Boolean |              | Append children to currently rendered content         |
| prepend  | Boolean |              | Prepended children to currently rendered content      |

### useSetElement

#### Hook to set the onus element at the top of your component

|       | Name     | Type    | Default      | Description                                               |
| ----- | -------- | ------- | ------------ | --------------------------------------------------------- |
| Param | Options  | Object  | **Required** | Describes the element to set                              |
| ↳     | name     | String  | **Required** | _Same as SetElement `name`_                               |
| ↳     | priority | Number  | **Required** | _Same as SetElement `priority`_                           |
| ↳     | append   | Boolean |              | _Same as SetElement `append`_                             |
| ↳     | prepend  | Boolean |              | _Same as SetElement `prepend`_                            |
| Param | node     | Node    |              | Children to render in the GetElement with a matching name |

## Testing

```bash
yarn test
```

## Build Example

```bash
yarn build
```

## Start Example

```bash
yarn start
```

## Running unit tests

Run `nx test onus-react` to execute the unit tests via [Jest](https://jestjs.io).
