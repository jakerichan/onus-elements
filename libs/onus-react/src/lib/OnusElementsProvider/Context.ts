import { Register, Subscribe, Unregister } from '@onus-elements/core/types';
import { createContext } from 'react';

const warn = (name?: string) => {
  console.warn('Onus-Element provider not found. Called from:', name);
};

export interface OnusElementsContext {
  subscribe: Subscribe;
  register: Register;
  unregister: Unregister;
}

const Context = createContext({
  subscribe: (name) => {
    warn(`GetElement named ${name}`);
    return warn;
  },
  register: (entry, position) =>
    warn(
      `SetElement or useSetElement named ${entry.name}, position ${position}`
    ),
  unregister: (name, priority) =>
    warn(
      `Unmounting a SetElement or useSetElement named ${name}, priority: ${priority}`
    ),
} as OnusElementsContext);
export default Context;
export const Provider = Context.Provider;
