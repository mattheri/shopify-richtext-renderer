import type {FunctionComponent, HTMLAttributes} from 'react';
import type {RichtextrendererConfig} from './utils/richtextRendererConfig';

export type RichTextNode = {
  type:
    | 'root'
    | 'paragraph'
    | 'list'
    | 'list-item'
    | 'heading'
    | 'text'
    | 'link';
  level?: number;
  children?: RichTextNode[];
  value?: string;
  bold?: boolean;
  italic?: boolean;
  url?: string;
  target?: string;
  title?: string;
  listType?: 'ordered' | 'unordered';
};

export type FutureReactNode = {
  type: string | FunctionComponent<any>;
  attributes: {
    key: string;
    href?: string;
    target?: string;
    title?: string;
    style?: string;
  };
  children?: string | FutureReactNode[];
};

export type ReactElementAttributes = {
  customElement?: FunctionComponent<any> | string;
} & HTMLAttributes<HTMLElement>;

export type ElementProps = {
  h1?: ReactElementAttributes;
  h2?: ReactElementAttributes;
  h3?: ReactElementAttributes;
  h4?: ReactElementAttributes;
  h5?: ReactElementAttributes;
  h6?: ReactElementAttributes;
  paragraph?: ReactElementAttributes;
  list?: ReactElementAttributes;
  listItem?: ReactElementAttributes;
  a?: ReactElementAttributes;
  text?: ReactElementAttributes;
};

export type NormalizedElementProps = {
  [P in keyof ElementProps]?: Omit<ReactElementAttributes, 'customElement'>;
};

export type Attributes = HTMLAttributes<HTMLElement>;

export type Config = RichtextrendererConfig;
