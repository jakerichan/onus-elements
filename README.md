# onus-elements

[![npm Version](https://img.shields.io/npm/v/onus-elements.svg)](https://www.npmjs.com/package/onus-elements) [![License](https://img.shields.io/npm/l/onus-elements.svg)](https://www.npmjs.com/package/onus-elements) 

Register elements and render it anywhere in the application

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
import { GetElement, SetElement } from 'onus-elements'

const list = [
  {
    "label": "Digital",
    "description": "Try to compress the GB sensor, maybe it will connect the redundant capacitor!",
    "id": "digital"
  },
  {
    "label": "Port",
    "description": "Use the cross-platform XML port, then you can quantify the bluetooth feed!",
    "id": "port"
  },
  {
    "label": "Alarm",
    "description": "You can't calculate the monitor without navigating the virtual AGP driver!",
    "id": "alarm"
  }
];

const Home = () => (
  <section>
    {/* This will show on root path */}
    <SetElement name='heading' priority={0}>
      <h1>Home</h1>
    </SetElement>
  </section>
);

const Item = ({ match }) => {
  const item = list.find(({ id }) => id === match.params.item);

  return (
    <article>
      {/* This will show on path /items/:itemLabel */}
      <SetElement name='heading' priority={2}>
        <h1>{item.label}</h1>
      </SetElement>

      <p>{item.description}</p>

      <hr />
    </article>
  );
};

const Items = ({ match }) => (
  <section>
    {/* This will show on path /items */}
    <SetElement name='heading' priority={1}>
      <h1>Items</h1>
    </SetElement>
    <ul>
      {list.map(({ label, id }) => (
        <li key={id}>
          <Link to={`${match.url}/${id}`}>{label}</Link>
        </li>
      ))}
    </ul>

    <hr />

    <Route path={`${match.path}/:item`} component={Item} />
  </section>
);

const App = () => (
  <BrowserRouter>
    <section>
    {/* The children of the highest priority SetElement will replace  the GetElement with matching name */}
      <GetElement name='heading' />
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/items'>Items</Link>
        </li>
      </ul>

      <hr />

      <Route exact path='/' component={Home} />
      <Route path='/items' component={Items} />
    </section>
  </BrowserRouter>
);
```

## Props

### GetElement

#### Used as placeholder for where you want content to be rendered

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| name | String | **Required** | Unique name that will be matched with SetElement |

### SetElement

#### Used to set the content to be rendered inside the GetContent component

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| name      | String  | **Required** | Unique name that will be matched with GetElement     |
| priority  | Number  | **Required** | Priority to render children, highest wins            |
| append    | Boolean | undefined  | Append children to currently rendered content        |
| prepend   | Boolean | undefined  | Prepended children to currently rendered content     |
| withProps | Object  | undefined  | Apply additional props to currently rendered element |

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