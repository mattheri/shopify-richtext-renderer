# Shopify Hydrogen Rich Text Renderer

A flexible, fully typed, Hydrogen friendly, component to render correctly the data sent by a metafield/metaobject Rich Text field.

## Defaults

By default, the `RichTextRenderer` will render all elements without any attributes and style. The only style applied, will be `fontStyle: italic` or `fontWeight: bold` if a node is set as bold and/or italic. It will also render all headings as `p` elements
to be friendly with SEO (you don't want 15 `h1`s in your page). All defaults can be changed either through a global configuration and/or granularly through props.
## Installation

Install with npm

```bash
  npm install @novatize-mattheri/shopify-richtext-renderer
```
    
## Usage/Examples

### Simple usage

```typescript
import type {RichTextNode} from '@novatize-mattheri/shopify-richtext-renderer'

import {RichTextRenderer} from '@novatize-mattheri/shopify-richtext-renderer'

type Props = {
  richText: string | RichTextNode;
}

function App({richText}: Props) {
  return <RichTextRenderer data={richText} />
}
```

### Pass props by rendered element type

Each element can receive any props that can be normally passed to an HTML Element.

```typescript
import type {RichTextNode} from '@novatize-mattheri/shopify-richtext-renderer'

import {RichTextRenderer} from '@novatize-mattheri/shopify-richtext-renderer'

type Props = {
  richText: string | RichTextNode;
}

function App({richText}: Props) {
  return (
    <RichTextRenderer 
      data={richText}
      h1={{
        className: 'text-2xl'
      }}
      h2={{
        className: 'text-xl',
        id: 'my-richtext-heading-2',
      }}
      h3={{
        ...
      }}
      h4={{
        ...
      }}
      h5={{
        ...
      }}
      h6={{
        ...
      }}
      a={{
        ...
      }}
      list={{
        ...
      }}
      listItem={{
        ...
      }}
      paragraph={{
        data-paragraph: 'hello-world',
      }}
      text={{
        className: 'pb-3'
      }}
    />
  );
}
```

### Provide another element

Another element can be passed either as a prop or through the global config.

```typescript
import type {RichTextNode} from '@novatize-mattheri/shopify-richtext-renderer'

import {RichTextRenderer} from '@novatize-mattheri/shopify-richtext-renderer'

type Props = {
  richText: string | RichTextNode;
}

function App({richText}: Props) {
  return (
    <RichTextRenderer 
      data={richText}
      h1={{
        as: 'span'
      }}
    />
  );
}
```

### Provide a custom component

A custom component can also be passed individually to render the elements. Simply make sure that it can render children as the nested elements are passed as childrens internally.

```typescript
import type {RichTextNode} from '@novatize-mattheri/shopify-richtext-renderer'

import {RichTextRenderer} from '@novatize-mattheri/shopify-richtext-renderer'
import MyHeading from './MyHeading'

type Props = {
  richText: string | RichTextNode;
}

function App({richText}: Props) {
  return (
    <RichTextRenderer 
      data={richText}
      h1={{
        as: MyHeading
      }}
    />
  );
}
```

### Provide default configuration

You can provide default configuration for the rendered elements. Please note that if some props are passed to the RichTextRenderer,
they are shallow merged. Therefore, duplicate keys in the props will overwrite keys in the default configuration for this component.

The configuration options accept the same properties as their props counterparts.

```typescript
// richtext-config.ts
import type {Config} from '@novatize-mattheri/shopify-richtext-renderer'

import MyHeading from './MyHeading'

export const config: Config = {
  h1: {
    as: MyHeading,
    className: 'text-2xl'
  }
}
```

```typescript
// root.tsx
import {config} from './richtext-config'
import {setRichtextRendererConfig} from '@novatize-mattheri/shopify-richtext-renderer'

// Call this directly in the file to make sure that there are no hydratation error.
setRichtextRendererConfig(config);
```