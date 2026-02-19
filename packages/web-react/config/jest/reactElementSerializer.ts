import React from 'react';

/**
 * Custom snapshot serializer for React elements.
 *
 * Jest 30.2.0 changed how React elements are serialized in snapshots.
 * This serializer ensures they're converted to JSX format for readability.
 *
 * @see https://jestjs.io/docs/snapshot-testing#custom-serializers
 */

interface JsxElementProps {
  [key: string]: unknown;
}

function formatValue(value: unknown, indent: string): string {
  if (value === null || value === undefined) {
    return 'null';
  }

  if (typeof value === 'string') {
    return `"${value.replace(/"/g, '\\"')}"`;
  }

  if (typeof value === 'boolean') {
    return `{${value}}`;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return `[${value.join(', ')}]`;
    }
    // Format objects with proper indentation for nested structures
    const entries = Object.keys(value)
      .sort()
      .map((k) => {
        const v = (value as Record<string, unknown>)[k];

        return `"${k}": ${JSON.stringify(v)}`;
      });
    if (entries.length === 0) {
      return '{}';
    }
    // Return formatted object with nested indentation
    const nestedIndent = `${indent}  `;

    return `{\n${nestedIndent}${entries.join(`,\n${nestedIndent}`)},\n${indent}}`;
  }

  return JSON.stringify(value);
}

function formatPropsForDisplay(props: JsxElementProps, indent: string): string {
  const propParts: string[] = [];
  const sortedKeys = Object.keys(props).sort();
  const propIndent = `${indent}  `;

  sortedKeys.forEach((key) => {
    const value = props[key];
    if (value === null || value === undefined) {
      return;
    }

    const formattedValue = formatValue(value, propIndent);
    // Check if the value contains newlines
    if (formattedValue.includes('\n')) {
      // Multi-line value: put = on same line as key, then value on next line(s)
      propParts.push(`${propIndent}${key}=${formattedValue}`);
    } else {
      // Single-line value
      propParts.push(`${propIndent}${key}=${formattedValue}`);
    }
  });

  return propParts.join('\n');
}

function elementToJsx(element: React.ReactElement, indent: string = ''): string {
  if (typeof element.type === 'string') {
    const tagName = element.type;
    const { children, ...otherProps } = element.props;

    const propsStr = formatPropsForDisplay(otherProps, indent);
    const childrenArray = React.Children.toArray(children).filter((c) => (typeof c === 'string' ? c.trim() : true));

    if (childrenArray.length === 0) {
      if (!propsStr) {
        return `${indent}<${tagName} />`;
      }

      return `${indent}<${tagName}\n${propsStr}\n${indent}/>`;
    }

    const nextIndent = `${indent}  `;
    const childrenJsx = childrenArray
      .map((child) => {
        if (typeof child === 'string') {
          const trimmed = child.trim();
          if (trimmed) {
            return `${nextIndent}${trimmed}`;
          }

          return '';
        }
        if (React.isValidElement(child)) {
          return elementToJsx(child, nextIndent);
        }

        return '';
      })
      .filter(Boolean)
      .join('\n');

    if (!propsStr) {
      return `${indent}<${tagName}>\n${childrenJsx}\n${indent}</${tagName}>`;
    }

    return `${indent}<${tagName}\n${propsStr}\n${indent}>\n${childrenJsx}\n${indent}</${tagName}>`;
  }

  // Handle arrays of elements
  if (Array.isArray(element)) {
    const nextIndent = `${indent}  `;
    const elements = element
      .map((el) => {
        if (React.isValidElement(el)) {
          return elementToJsx(el, nextIndent);
        }

        return String(el);
      })
      .join(`,\n`);

    return `[\n${elements},\n${indent}]`;
  }

  return String(element);
}

const reactElementSerializer = {
  test(value: unknown) {
    return (
      React.isValidElement(value) ||
      (Array.isArray(value) && value.every((item) => React.isValidElement(item) || typeof item === 'string'))
    );
  },

  serialize(value: unknown) {
    if (Array.isArray(value)) {
      const elements = value
        .map((el) => {
          if (React.isValidElement(el)) {
            return elementToJsx(el, '  ');
          }

          return String(el);
        })
        .join(`,\n`);

      return `[\n${elements},\n]`;
    }

    if (React.isValidElement(value)) {
      return elementToJsx(value);
    }

    return String(value);
  },
};

export default reactElementSerializer;
