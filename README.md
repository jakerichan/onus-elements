# onus-content
[![npm Version](https://img.shields.io/npm/v/onus-content.svg)](https://www.npmjs.com/package/onus-content) [![License](https://img.shields.io/npm/l/onus-content.svg)](https://www.npmjs.com/package/onus-content) 

Register content and render it anywhere in the application

## Installation
```bash
yarn add onus-content
```
or
```bash
npm i --save onus-content
```

## Usage
```js
import { GetContent, SetContent } from 'onus-content'

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
    <SetContent name='heading' depth={0}>
      <h1>Home</h1>
    </SetContent>
  </section>
);

const Item = ({ match }) => {
  const item = list.find(({ id }) => id === match.params.item);

  return (
    <article>
      {/* This will show on path /items/:itemLabel */}
      <SetContent name='heading' depth={2}>
        <h1>{item.label}</h1>
      </SetContent>

      <p>{item.description}</p>

      <hr />
    </article>
  );
};

const Items = ({ match }) => (
  <section>
    {/* This will show on path /items */}
    <SetContent name='heading' depth={1}>
      <h1>Items</h1>
    </SetContent>
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
    {/* The children of the highest depth SetContent will replace  the GetContent with matching name */}
      <GetContent name='heading' />
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
#### GetContent
<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>[required]</td>
      <td>Unique name that will be matched with SetContent</td>
    </tr>
  </tbody>
</table>

#### SetContent
<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>[required]</td>
      <td>Unique name that will be matched with GetContent</td>
    </tr>
    <tr>
      <td>depth</td>
      <td>Number</td>
      <td>[required]</td>
      <td>Priority to render children, highest wins</td>
    </tr>
    <tr>
      <td>append</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Rather than replacing matching GetContent, it will be appended to it's current children</td>
    </tr>
    <tr>
      <td>prepend</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Rather than replacing matching GetContent, it will be prepended to it's current children</td>
    </tr>
  </tbody>
</table>

## Testing
```bash
yarn test
```
## Build Example
```bash
yarn build
```
## Start Example
```
yarn start
```