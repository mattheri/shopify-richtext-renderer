import type {ElementProps, FutureReactNode, RichTextNode} from '../types';
import provideNodeProperties from './provideNodeProperties';

export default function createNode(
  node: RichTextNode,
  elementProps?: ElementProps,
): FutureReactNode {
  const {type, nodeAttributes} = provideNodeProperties(node, elementProps);

  const styles = [
    node.bold ? ['fontWeight', 'bold'] : [],
    node.italic ? ['fontStyle', 'italic'] : [],
  ];

  const attributes = {
    key: Math.random().toString(36),
    ...(nodeAttributes ?? {}),
    ...(node.url ? {href: node.url} : {}),
    ...(node.target ? {target: node.target} : {}),
    ...(node.title ? {title: node.title} : {}),
    ...(node.bold || node.italic ? {style: Object.fromEntries(styles)} : {}),
  };

  return {
    type,
    attributes,
    children:
      node.value ||
      node.children?.map((child) => createNode(child, elementProps)),
  };
}
