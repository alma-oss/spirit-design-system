import { Children, type ComponentType, type ReactElement, isValidElement } from 'react';

/**
 * Custom snapshot serializer for React elements.
 *
 * Jest 30.2.0 changed how React elements are serialized in snapshots.
 * This serializer ensures they're converted to JSX format for readability.
 *
 * Architecture: 3-layer design separates parsing (React → AST), formatting (AST → string),
 * and adaptation (Jest interface) to keep each concern isolated and testable.
 *
 * @see https://jestjs.io/docs/snapshot-testing#custom-serializers
 */

// ============================================================================
// Layer 1: AST Types (data structures only, no logic)
// ============================================================================

/** Primitive value inside an object prop */
type PropScalar =
  | { kind: 'string'; value: string }
  | { kind: 'boolean'; value: boolean }
  | { kind: 'number'; value: number }
  | { kind: 'null' };

/** Value of a JSX prop (scalar or object with entries) */
type PropValue = PropScalar | { kind: 'object'; entries: ReadonlyArray<readonly [string, PropScalar]> };

/** Parsed JSX prop with name and value */
interface PropNode {
  name: string;
  value: PropValue;
}

/** Parsed JSX element with tag, props, and children */
interface ElementNode {
  kind: 'element';
  tag: string;
  props: PropNode[];
  children: AstNode[];
}

/** Parsed text node (trimmed, never empty) */
interface TextNode {
  kind: 'text';
  value: string;
}

/** Any AST node */
type AstNode = ElementNode | TextNode;

/** Root-level parse result: single element or array of elements */
type RootNode = ElementNode | { kind: 'array'; items: ElementNode[] };

// ============================================================================
// Layer 2: Parser (React → AST, no string output)
// ============================================================================

/**
 * Classifies a leaf value into a PropScalar.
 * Returns null only for null/undefined (filtered out at prop level).
 *
 * @param value - The value to classify
 */
function parsePropScalar(value: unknown): PropScalar | null {
  if (value === null || value === undefined) {
    return { kind: 'null' };
  }

  if (typeof value === 'string') {
    return { kind: 'string', value };
  }

  if (typeof value === 'boolean') {
    return { kind: 'boolean', value };
  }

  if (typeof value === 'number') {
    return { kind: 'number', value };
  }

  // For complex objects, stringify as fallback (shouldn't happen in props)
  return { kind: 'string', value: JSON.stringify(value) };
}

/**
 * Parses a prop value, handling objects by extracting entries and sorting.
 *
 * @param value - The value to parse
 */
function parsePropValue(value: unknown): PropValue {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const entries = Object.keys(value)
      .sort()
      .map((k) => {
        const v = (value as Record<string, unknown>)[k];
        const scalar = parsePropScalar(v);

        return [k, scalar || { kind: 'null' }] as const;
      });

    return { kind: 'object', entries };
  }

  const scalar = parsePropScalar(value);

  return scalar || { kind: 'null' };
}

/**
 * Parses a single prop, filtering out null/undefined.
 * Returns null if value should be omitted.
 *
 * @param name - The prop name
 * @param value - The prop value
 */
function parseProp(name: string, value: unknown): PropNode | null {
  if (value === null || value === undefined) {
    return null;
  }

  return {
    name,
    value: parsePropValue(value),
  };
}

// Forward declaration for recursive call
let parseElement: (element: ReactElement) => ElementNode;

/**
 * Builds an ElementNode from tag and raw props.
 * Extracts children, filters props, and recurses on children.
 *
 * @param tag - The element tag name
 * @param rawProps - The raw props object
 */
function buildElementNode(tag: string, rawProps: Record<string, unknown>): ElementNode {
  const { children, ...otherProps } = rawProps;

  // Parse props: filter out null/undefined
  const props = Object.keys(otherProps)
    .sort()
    .map((k) => parseProp(k, otherProps[k]))
    .filter((p) => p !== null) as PropNode[];

  // Parse children: filter out whitespace-only strings
  const childrenArray = Children.toArray(children);
  const parsedChildren: AstNode[] = childrenArray
    .map((child) => {
      if (typeof child === 'string') {
        const trimmed = child.trim();

        if (trimmed) {
          return { kind: 'text' as const, value: trimmed };
        }

        return null;
      }

      if (isValidElement(child)) {
        return parseElement(child);
      }

      return null;
    })
    .filter((node) => node !== null) as AstNode[];

  return {
    kind: 'element',
    tag,
    props,
    children: parsedChildren,
  };
}

/**
 * Parses a React element into an ElementNode.
 * Handles string (HTML) and component element types.
 *
 * @param element - The React element to parse
 */
parseElement = (element: ReactElement): ElementNode => {
  if (typeof element.type === 'string') {
    // HTML element
    return buildElementNode(element.type, element.props);
  }

  // Component element: resolve display name
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const componentType = element.type as ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayName = (componentType as any).displayName || (componentType as any).name || 'Unknown';

  return buildElementNode(displayName, element.props);
};

/**
 * Entry point: parses React value into AST.
 *
 * @param value - The value to parse
 */
function parse(value: unknown): RootNode {
  if (Array.isArray(value)) {
    const items = value
      .map((item) => {
        if (isValidElement(item)) {
          return parseElement(item);
        }

        // Non-element items in array: wrap as text
        return {
          kind: 'element' as const,
          tag: 'text',
          props: [],
          children: [{ kind: 'text' as const, value: String(item) }],
        };
      })
      .filter((item) => !(item.kind === 'element' && item.tag === 'text' && item.children.length === 0));

    return { kind: 'array', items };
  }

  if (isValidElement(value)) {
    return parseElement(value);
  }

  // Fallback: treat as text element
  return {
    kind: 'element',
    tag: 'text',
    props: [],
    children: [{ kind: 'text', value: String(value) }],
  };
}

// ============================================================================
// Layer 3: Printer (AST → string, no React knowledge)
// ============================================================================

// Forward declaration for recursive call
let printNode: (node: AstNode, indent: string) => string;

/**
 * Formats a PropScalar for output.
 *
 * @param node - The scalar node to format
 */
function printPropScalar(node: PropScalar): string {
  switch (node.kind) {
    case 'string':
      return `"${node.value.replace(/"/g, '\\"')}"`;

    case 'boolean':
      return `{${node.value}}`;

    case 'number':
      return String(node.value);

    default:
      return 'null';
  }
}

/**
 * Formats a PropValue (scalar or object).
 *
 * @param node - The value node to format
 * @param propIndent - The indentation level for the prop
 */
function printPropValue(node: PropValue, propIndent: string): string {
  if (node.kind === 'object') {
    const { entries } = node;

    if (entries.length === 0) {
      return '{}';
    }

    const entryIndent = `${propIndent}  `;
    const formattedEntries = entries.map(([key, scalar]) => `${entryIndent}"${key}": ${printPropScalar(scalar)}`);

    return `{\n${formattedEntries.join(',\n')},\n${propIndent}}`;
  }

  return printPropScalar(node);
}

/**
 * Formats props as lines (name="value" pairs).
 *
 * @param props - The props to format
 * @param elementIndent - The indentation level for the element
 */
function printProps(props: PropNode[], elementIndent: string): string {
  const propIndent = `${elementIndent}  `;
  const lines = props.map((prop) => {
    const value = printPropValue(prop.value, propIndent);

    return `${propIndent}${prop.name}=${value}`;
  });

  return lines.join('\n');
}

/**
 * Formats a text node.
 *
 * @param node - The text node to format
 * @param indent - The indentation level
 */
function printText(node: TextNode, indent: string): string {
  return `${indent}${node.value}`;
}

/**
 * Formats an element node.
 *
 * @param node - The element node to format
 * @param indent - The indentation level
 */
function printElement(node: ElementNode, indent: string): string {
  const { tag, props, children } = node;

  const propsStr = props.length > 0 ? printProps(props, indent) : '';
  const childrenStr =
    children.length > 0
      ? children
          .map((child) => printNode(child, `${indent}  `))
          .filter(Boolean)
          .join('\n')
      : '';

  // Self-closing tag
  if (childrenStr === '') {
    if (!propsStr) {
      return `${indent}<${tag} />`;
    }

    return `${indent}<${tag}\n${propsStr}\n${indent}/>`;
  }

  // Full open/close tag
  if (!propsStr) {
    return `${indent}<${tag}>\n${childrenStr}\n${indent}</${tag}>`;
  }

  return `${indent}<${tag}\n${propsStr}\n${indent}>\n${childrenStr}\n${indent}</${tag}>`;
}

/**
 * Dispatches formatting based on node type.
 *
 * @param node - The AST node to format
 * @param indent - The indentation level
 */
printNode = (node: AstNode, indent: string): string => {
  switch (node.kind) {
    case 'text':
      return printText(node, indent);

    default:
      return printElement(node, indent);
  }
};

/**
 * Entry point: formats AST into JSX string.
 *
 * @param root - The root AST node to format
 * @param indent - The initial indentation level
 */
function printRoot(root: RootNode, indent: string = ''): string {
  if (root.kind === 'array') {
    const items = root.items.map((item) => printElement(item, `${indent}  `)).join(`,\n`);

    return `[\n${items},\n${indent}]`;
  }

  return printElement(root, indent);
}

// ============================================================================
// Layer 4: Jest Adapter (thin interface)
// ============================================================================

const reactElementSerializer = {
  test(value: unknown): boolean {
    return (
      isValidElement(value) ||
      (Array.isArray(value) && value.every((item) => isValidElement(item) || typeof item === 'string'))
    );
  },

  serialize(value: unknown): string {
    return printRoot(parse(value));
  },
};

export default reactElementSerializer;
