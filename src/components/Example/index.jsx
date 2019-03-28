import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { GetElement } from '../../../index';
import Home from './home';
import Items from './items';

export default () => (
  <BrowserRouter>
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <GetElement name="heading" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/items">Items</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/items" component={Items} />
    </div>
  </BrowserRouter>
);
