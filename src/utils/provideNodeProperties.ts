import type {FunctionComponent} from 'react';
import type {
  RichTextNode,
  Attributes,
  ElementProps,
  NormalizedElementProps,
} from '../types';

import richtextrendererConfig from './richtextRendererConfig';

const nodeTypeMap = {
  heading: ['p', 'p', 'p', 'p', 'p', 'p'],
  list: {
    ordered: 'ol',
    unordered: 'ul',
  },
  listItem: 'li',
  link: 'a',
  paragraph: 'p',
  text: 'span',
  break: 'br',
};

export default function provideNodeProperties(
  node: RichTextNode,
  elementProps?: ElementProps,
) {
  let nodeType: string | FunctionComponent<any> = 'div';
  let elAttributes: Attributes | null = null;
  const headingKey = `h${node.level}` as keyof typeof richtextrendererConfig;
  const elementPropsAttributesOnly = Object.entries(elementProps ?? {}).reduce(
    (acc, [_key, value]) => {
      if (!value) return acc;

      const key = _key as keyof ElementProps;
      delete value.customElement;
      acc[key] = value;

      return acc;
    },
    {} as NormalizedElementProps,
  );

  switch (node.type) {
    case 'heading':
      node.level = node.level ?? 1;
      nodeType =
        elementProps?.[headingKey]?.customElement ??
        richtextrendererConfig[headingKey]?.customComponent ??
        nodeTypeMap.heading[node.level - 1];
      elAttributes = {
        ...(richtextrendererConfig[headingKey]?.attributes ?? {}),
        ...(elementPropsAttributesOnly?.[headingKey] ?? {}),
      };
      break;
    case 'list':
      nodeType =
        elementProps?.list?.customElement ??
        richtextrendererConfig.list?.customComponent ??
        nodeTypeMap.list[node.listType ?? 'unordered'];
      elAttributes = {
        ...(richtextrendererConfig.list?.attributes ?? {}),
        ...(elementPropsAttributesOnly?.list ?? {}),
      };
      break;
    case 'list-item':
      nodeType =
        richtextrendererConfig.listItem?.customComponent ??
        nodeTypeMap.listItem;
      elAttributes = {
        ...(richtextrendererConfig.listItem?.attributes ?? {}),
        ...(elementPropsAttributesOnly?.listItem ?? {}),
      };
      break;
    case 'link':
      nodeType = richtextrendererConfig.a?.customComponent ?? nodeTypeMap.link;
      elAttributes = {
        ...(richtextrendererConfig.a?.attributes ?? {}),
        ...(elementPropsAttributesOnly?.a ?? {}),
      };
      break;
    case 'paragraph':
      nodeType =
        richtextrendererConfig.paragraph?.customComponent ??
        nodeTypeMap.paragraph;
      elAttributes = {
        ...(richtextrendererConfig.paragraph?.attributes ?? {}),
        ...(elementPropsAttributesOnly?.paragraph ?? {}),
      };
      break;
    case 'text':
      nodeType =
        richtextrendererConfig.text?.customComponent ?? nodeTypeMap.text;
      elAttributes = {
        ...(richtextrendererConfig.text?.attributes ?? {}),
        ...(elementPropsAttributesOnly?.text ?? {}),
      };
      if (!node.value) {
        nodeType = nodeTypeMap.break;
        elAttributes = null;
      }
      break;
  }

  return {
    type: nodeType,
    nodeAttributes: elAttributes,
  };
}
