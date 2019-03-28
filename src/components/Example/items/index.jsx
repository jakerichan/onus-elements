import React from 'react';
import { Route, Link } from 'react-router-dom';
import { SetElement } from '../../../../index';
import Item from './item';
import list from './list.json';

export default ({ match }) => (
  <div>
    <SetElement name="heading" priority={1}>
      <h1>Items</h1>
    </SetElement>
    <ul>
      {list.map(({ label, id }) => (
        <li key={label}>
          <Link to={`${match.url}/${id}`}>{label}</Link>
        </li>
      ))}
    </ul>

    <hr />

    <Route path={`${match.path}/:item`} component={Item} />
  </div>
);
