import { renderHook } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { getNodeText } from '../getNodeText';
import { useCollection } from '../useCollection';

const TestItem = ({ children, value }: { children?: ReactNode; value?: string }) => (
  <div data-value={value}>{children}</div>
);
TestItem.getCollectionNode = function* getCollectionNode(props: Record<string, unknown>) {
  yield {
    type: 'item' as const,
    key: String(props.value ?? ''),
    textValue: getNodeText(props.children as ReactNode),
  };
};

describe('useCollection', () => {
  it('should build a collection from children', () => {
    const { result } = renderHook(() =>
      useCollection({
        children: <TestItem value="cs">Czech</TestItem>,
      }),
    );

    expect(result.current.size).toBe(1);
    expect(result.current.getFirstKey()).toBe('cs');
  });

  it('should update when children change', () => {
    const { result, rerender } = renderHook(({ children }) => useCollection({ children }), {
      initialProps: {
        children: (<TestItem value="cs">Czech</TestItem>) as ReactNode,
      },
    });

    expect(result.current.size).toBe(1);

    rerender({
      children: (
        <>
          <TestItem value="cs">Czech</TestItem>
          <TestItem value="en">English</TestItem>
        </>
      ),
    });

    expect(result.current.size).toBe(2);
    expect([...result.current.getKeys()]).toEqual(['cs', 'en']);
  });
});
