import React from 'react';
import { GetElement, SetElement } from '../../../../../index';
import list from '../list.json';

export default ({ match }) => {
  const item = list.find(({ id }) => id === match.params.item);

  return (
    <div>
      <SetElement name='heading' priority={2}>
        <h1>{item.label}</h1>
      </SetElement>

      <GetElement name='heading' />
      <p>{item.description}</p>
      <hr />
    </div>
  );
};
