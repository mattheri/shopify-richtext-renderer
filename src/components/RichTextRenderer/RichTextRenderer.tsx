import type {ReactElementAttributes, RichTextNode} from '../../types';
import type {HTMLAttributes} from 'react';

import React from 'react';
import createElement from '../../utils/createElement';
import createNode from '../../utils/node';

type Props = HTMLAttributes<HTMLElement> & {
  data?: string | RichTextNode;
  h1?: ReactElementAttributes;
  h2?: ReactElementAttributes;
  h3?: ReactElementAttributes;
  h4?: ReactElementAttributes;
  h5?: ReactElementAttributes;
  h6?: ReactElementAttributes;
  list?: ReactElementAttributes;
  listItem?: ReactElementAttributes;
  a?: ReactElementAttributes;
  paragraph?: ReactElementAttributes;
  text?: ReactElementAttributes;
};

function getBaseNode(text: string): RichTextNode {
  return {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: text,
          },
        ],
      },
    ],
  };
}
export default function RichTextRenderer({
  data,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  list,
  listItem,
  a,
  paragraph,
  text,
  ...props
}: Props) {
  if (data) {
    let node: RichTextNode;
    try {
      node = typeof data === 'string' ? JSON.parse(data) : data;
    } catch (e) {
      node = typeof data === 'string' ? getBaseNode(data) : getBaseNode('');
    }

    const elementProps = {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      list,
      listItem,
      a,
      paragraph,
      text,
    };

    return (
      <div {...props}>{createElement(createNode(node, elementProps))}</div>
    );
  }
  return null;
}
