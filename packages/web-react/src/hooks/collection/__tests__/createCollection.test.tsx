import React, { type ReactNode } from 'react';
import { createCollection } from '../createCollection';
import { getNodeText } from '../getNodeText';

const TestItem = ({ children, value, isDisabled }: { children?: ReactNode; value?: string; isDisabled?: boolean }) => (
  <div data-value={value} data-disabled={isDisabled}>
    {children}
  </div>
);
TestItem.getCollectionNode = function* getCollectionNode(props: Record<string, unknown>) {
  yield {
    type: 'item' as const,
    key: String(props.value ?? ''),
    rendered: props.children as ReactNode,
    textValue: getNodeText(props.children as ReactNode),
    isDisabled: Boolean(props.isDisabled),
  };
};

const TestSection = ({ children, label }: { children?: ReactNode; label?: ReactNode }) => (
  <div data-label={getNodeText(label)}>{children}</div>
);
TestSection.getCollectionNode = function* getCollectionNode(props: Record<string, unknown>) {
  yield {
    type: 'section' as const,
    key: `group:${getNodeText(props.label as ReactNode)}`,
    textValue: getNodeText(props.label as ReactNode),
    hasChildNodes: true,
    children: props.children as ReactNode,
  };
};

describe('createCollection', () => {
  it('should collect items via getCollectionNode in document order', () => {
    const collection = createCollection({
      children: (
        <>
          <TestItem value="cs">Czech</TestItem>
          <TestItem value="en" isDisabled>
            English
          </TestItem>
        </>
      ),
    });

    expect(collection.size).toBe(2);
    expect([...collection.getKeys()]).toEqual(['cs', 'en']);
    expect(collection.getItem('en')?.isDisabled).toBe(true);
    expect(collection.getItem('cs')?.textValue).toBe('Czech');
    expect(collection.getFirstKey()).toBe('cs');
    expect(collection.getLastKey()).toBe('en');
    expect(collection.getKeyAfter('cs')).toBe('en');
    expect(collection.getKeyBefore('en')).toBe('cs');
  });

  it('should represent sections and still expose flat item nodes', () => {
    const collection = createCollection({
      children: (
        <TestSection label="Languages">
          <div>
            <TestItem value="cs">Czech</TestItem>
            <TestItem value="dk">Danish</TestItem>
          </div>
        </TestSection>
      ),
    });

    const roots = [...collection.getChildren('')];

    expect(roots).toHaveLength(1);
    expect(roots[0].type).toBe('section');
    expect(roots[0].textValue).toBe('Languages');

    expect([...collection.getItemNodes()].map((node) => ({ key: node.key, rendered: node.rendered }))).toEqual([
      { key: 'cs', rendered: 'Czech' },
      { key: 'dk', rendered: 'Danish' },
    ]);
  });

  it('should support custom role option/row escape hatch', () => {
    const collection = createCollection({
      children: React.createElement(
        'div',
        {
          role: 'option',
          id: 'custom-1',
          isDisabled: true,
        } as React.HTMLAttributes<HTMLDivElement> & { isDisabled?: boolean },
        'Custom',
      ),
    });

    expect(collection.size).toBe(1);
    expect(collection.getItem('custom-1')?.textValue).toBe('Custom');
    expect(collection.getItem('custom-1')?.isDisabled).toBe(true);
  });

  it('should build the same items from a dynamic items path', () => {
    const items = [
      { id: 'cs', label: 'Czech' },
      { id: 'en', label: 'English' },
    ];

    const dynamic = createCollection({
      items,
      renderItem: (item) => (
        <TestItem key={item.id} value={item.id}>
          {item.label}
        </TestItem>
      ),
    });

    const staticCollection = createCollection({
      children: (
        <>
          <TestItem value="cs">Czech</TestItem>
          <TestItem value="en">English</TestItem>
        </>
      ),
    });

    expect([...dynamic.getKeys()]).toEqual([...staticCollection.getKeys()]);
    expect([...dynamic].map((node) => node.textValue)).toEqual([...staticCollection].map((node) => node.textValue));
  });

  it('should dedupe colliding section keys with an index suffix', () => {
    const collection = createCollection({
      children: (
        <>
          <TestSection label="Same">
            <TestItem value="a">A</TestItem>
          </TestSection>
          <TestSection label="Same">
            <TestItem value="b">B</TestItem>
          </TestSection>
        </>
      ),
    });

    const roots = [...collection.getChildren('')];

    expect(roots.map((node) => node.key)).toEqual(['group:Same', 'group:Same#1']);
  });

  it('should skip duplicate item keys instead of suffixing them', () => {
    const collection = createCollection({
      children: (
        <>
          <TestItem value="cs">Czech</TestItem>
          <TestItem value="cs">Czech duplicate</TestItem>
          <TestItem value="en">English</TestItem>
        </>
      ),
    });

    expect([...collection.getKeys()]).toEqual(['cs', 'en']);
    expect(collection.getItem('cs')?.textValue).toBe('Czech');
    expect(collection.getItem('cs#1')).toBeUndefined();
  });
});
