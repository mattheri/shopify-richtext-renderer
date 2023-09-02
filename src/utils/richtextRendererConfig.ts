import type {Attributes} from '../types';
import type {FunctionComponent} from 'react';

const richtextrendererConfig = {
  h1: {},
  h2: {},
  h3: {},
  h4: {},
  h5: {},
  h6: {},
  list: {},
  listItem: {},
  a: {},
  paragraph: {},
  text: {},
};

export type RichtextrendererConfig = {
  [P in keyof typeof richtextrendererConfig]?: {
    customComponent?: FunctionComponent<any>;
    attributes?: Attributes;
  };
};

export default richtextrendererConfig as RichtextrendererConfig;
