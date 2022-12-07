import { useState, useEffect, useContext } from 'react';
import { Context } from '../OnusElementsProvider';
import { GetElementProps } from '../../types';

const GetElement = ({ name, children = null }: GetElementProps) => {
  const { subscribe } = useContext(Context);
  const [content = null, setContent] = useState(null);
  if (!subscribe) {
    console.error(
      'Onus Elements context not found. `OnusElementsProvider` is required',
      name
    );
  }

  useEffect(() => {
    if (!subscribe || !name) return;
    subscribe(name, setContent);
  }, [name, subscribe]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{content || children}</>;
};

export default GetElement;
