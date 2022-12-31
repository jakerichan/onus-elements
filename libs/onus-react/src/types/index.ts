import { PropsWithChildren } from 'react';
export interface GetElementProps extends PropsWithChildren {
  name: string;
}

export interface SetElementOptions {
  name: string;
  priority: number;
  prepend?: boolean;
  append?: boolean;
}

export interface SetElementProps extends PropsWithChildren, SetElementOptions {}

export type UseSetElement = (
  options: SetElementOptions,
  content: unknown
) => void;
