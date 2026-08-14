import React from 'react';
import { createCollection } from '../createCollection';
import { filterCollection } from '../filterCollection';
import { getNodeText } from '../getNodeText';

const TestItem = ({ children, value }: { children?: React.ReactNode; value?: string }) =>
  React.createElement('div', { 'data-value': value }, children);
TestItem.getCollectionNode = function* getCollectionNode(props: Record<string, unknown>) {
  yield {
    type: 'item' as const,
    key: String(props.value ?? ''),
    textValue: getNodeText(props.children as React.ReactNode),
    rendered: props.children as React.ReactNode,
  };
};

const TestSection = ({ children, label }: { children?: React.ReactNode; label?: React.ReactNode }) =>
  React.createElement('div', { 'data-label': getNodeText(label) }, children);
TestSection.getCollectionNode = function* getCollectionNode(props: Record<string, unknown>) {
  yield {
    type: 'section' as const,
    key: `group:${getNodeText(props.label as React.ReactNode)}`,
    textValue: getNodeText(props.label as React.ReactNode),
    hasChildNodes: true,
    children: props.children as React.ReactNode,
  };
};

describe('filterCollection', () => {
  it('should keep matching items and skip non-matches in navigation', () => {
    const collection = createCollection({
      children: React.createElement(
        React.Fragment,
        null,
        React.createElement(TestItem, { value: 'cs' }, 'Czech'),
        React.createElement(TestItem, { value: 'en' }, 'English'),
        React.createElement(TestItem, { value: 'pl' }, 'Polish'),
      ),
    });

    const filtered = filterCollection(collection, (node) => node.textValue.toLowerCase().includes('ish'));

    expect([...filtered.getKeys()]).toEqual(['en', 'pl']);
    expect(filtered.getFirstKey()).toBe('en');
    expect(filtered.getKeyAfter('en')).toBe('pl');
    expect(filtered.getKeyBefore('pl')).toBe('en');
    expect(filtered.getItem('cs')).toBeUndefined();
  });

  it('should omit empty sections after filtering', () => {
    const collection = createCollection({
      children: React.createElement(
        React.Fragment,
        null,
        React.createElement(TestSection, { label: 'Match' }, React.createElement(TestItem, { value: 'en' }, 'English')),
        React.createElement(
          TestSection,
          { label: 'No match' },
          React.createElement(TestItem, { value: 'cs' }, 'Czech'),
        ),
      ),
    });

    const filtered = filterCollection(collection, (node) => node.textValue.toLowerCase().includes('eng'));

    expect(filtered.size).toBe(1);
    expect([...filtered.getKeys()]).toEqual(['en']);
    expect([...filtered.getChildren('')]).toHaveLength(1);
    expect([...filtered.getChildren('')][0].type).toBe('section');
  });
});
