import { useState, useEffect, useContext } from 'react';
import { Context } from '../OnusElementsProvider';
import { GetElementProps } from '../../types';

const GetElement = ({ name, children = null }: GetElementProps) => {
  const { subscribe } = useContext(Context);
  const [content, setContent] = useState([]);
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

  const getContent = () => (content.length ? content : children);

  return <>{getContent()}</>;
};

export default GetElement;
