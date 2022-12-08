import { PropsWithChildren } from 'react';

enum RenderPosition {
  Prepend = 2,
  Append = 1,
  Default = 0,
}

interface ContentEntry {
  l: RenderPosition;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  c: any;
}

interface ContentPriority {
  [key: string]: ContentEntry;
}

interface ContentsObject {
  [key: string]: ContentPriority;
}

interface OnusEntry {
  priority: number;
}

interface GetLocationOptions {
  append?: boolean;
  prepend?: boolean;
}
export type GetLocation = (options: GetLocationOptions) => number;

export type Watch = (callback: CallableFunction) => CallableFunction;

export type Subscribe = (
  name: string,
  callbackFunction: CallableFunction
) => CallableFunction;

export interface RegisterableEntry {
  name: string;
  children: unknown;
  priority: number;
}

export type Register = (
  entry: RegisterableEntry,
  position: RenderPosition
) => void;

export type Unregister = (name: string, priority: number) => void;

export type TriggerDeepest = (name: string) => void;

export type FindDeepest = (name: string) => [] | null;

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

export {
  ContentEntry,
  ContentPriority,
  ContentsObject,
  RenderPosition,
  OnusEntry,
};
