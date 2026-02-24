import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import Stack from '../Stack';
import StackItem from '../StackItem';

describe('Stack', () => {
  classNamePrefixProviderTest(Stack, 'Stack');

  stylePropsTest(Stack);

  restPropsTest(Stack, 'div');

  validHtmlAttributesTest(Stack);

  ariaAttributesTest(Stack);

  elementTypePropsTest(Stack);

  it('should render text children', () => {
    render(<Stack data-testid="stack">Hello World</Stack>);

    expect(screen.getByTestId('stack')).toHaveTextContent('Hello World');
  });

  it('should render element children', () => {
    render(
      <Stack data-testid="stack">
        <span>Child 1</span>
        <span>Child 2</span>
      </Stack>,
    );

    const element = screen.getByTestId('stack');

    expect(element.children).toHaveLength(2);
    expect(element.children[0]).toHaveTextContent('Child 1');
    expect(element.children[1]).toHaveTextContent('Child 2');
  });

  it('should render with spacing', () => {
    render(<Stack data-testid="stack" hasSpacing />);

    expect(screen.getByTestId('stack')).toHaveClass('Stack--hasSpacing');
  });

  it('should render with custom spacing', () => {
    render(<Stack data-testid="stack" spacing="space-1000" />);

    const element = screen.getByTestId('stack');

    expect(element).toHaveClass('Stack--hasSpacing');
    expect(element).toHaveStyle({ '--stack-spacing': 'var(--spirit-space-1000)' });
  });

  it('should render with custom spacing for each breakpoint', () => {
    render(
      <Stack data-testid="stack" spacing={{ mobile: 'space-100', tablet: 'space-1000', desktop: 'space-1200' }} />,
    );

    const element = screen.getByTestId('stack');

    expect(element).toHaveClass('Stack--hasSpacing');
    expect(element).toHaveStyle({ '--stack-spacing': 'var(--spirit-space-100)' });
    expect(element).toHaveStyle({ '--stack-spacing-tablet': 'var(--spirit-space-1000)' });
    expect(element).toHaveStyle({ '--stack-spacing-desktop': 'var(--spirit-space-1200)' });
  });

  it('should render with custom spacing for only one breakpoint', () => {
    render(<Stack data-testid="stack" spacing={{ tablet: 'space-1000' }} />);

    const element = screen.getByTestId('stack');

    expect(element).toHaveClass('Stack--hasSpacing');
    expect(element).toHaveStyle({ '--stack-spacing-tablet': 'var(--spirit-space-1000)' });
    expect(element).not.toHaveStyle({ '--stack-spacing': 'var(--spirit-space-100)' });
    expect(element).not.toHaveStyle({ '--stack-spacing-desktop': 'var(--spirit-space-1200)' });
  });

  it('should provide context so StackItem renders as li when Stack elementType is ul', () => {
    render(
      <Stack elementType="ul">
        <StackItem data-testid="item">Item</StackItem>
      </Stack>,
    );

    const list = screen.getByRole('list');

    expect(list.tagName).toBe('UL');

    const item = screen.getByTestId('item');

    expect(item).toBeInTheDocument();
    expect(item.tagName).toBe('LI');
    expect(item).toHaveTextContent('Item');
  });

  it('should provide context so StackItem renders as li when Stack elementType is ol', () => {
    render(
      <Stack elementType="ol">
        <StackItem data-testid="item">Item</StackItem>
      </Stack>,
    );

    const list = screen.getByRole('list');

    expect(list.tagName).toBe('OL');

    const item = screen.getByTestId('item');

    expect(item).toBeInTheDocument();
    expect(item.tagName).toBe('LI');
    expect(item).toHaveTextContent('Item');
  });

  it('should allow explicit StackItem elementType to override context', () => {
    render(
      <Stack elementType="ul">
        <StackItem elementType="div" data-testid="item">
          Item
        </StackItem>
      </Stack>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();

    const item = screen.getByTestId('item');

    expect(item).toBeInTheDocument();
    expect(item.localName).toBe('div');
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should prevent nested StackItem elements (or any other element) from inheriting context', () => {
    render(
      <Stack elementType="ul">
        <StackItem data-testid="item">
          <Stack>
            <StackItem data-testid="nested-item">Item</StackItem>
          </Stack>
        </StackItem>
      </Stack>,
    );

    expect(screen.queryByTestId('nested-item')?.localName).toBe('div');
  });
});
