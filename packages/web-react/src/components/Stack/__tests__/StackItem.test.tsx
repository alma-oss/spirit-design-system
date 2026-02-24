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
import StackItem from '../StackItem';

describe('StackItem', () => {
  classNamePrefixProviderTest(StackItem, 'StackItem');

  stylePropsTest(StackItem);

  restPropsTest(StackItem, 'div');

  validHtmlAttributesTest(StackItem);

  ariaAttributesTest(StackItem);

  elementTypePropsTest(StackItem);

  it('should render text children', () => {
    render(<StackItem data-testid="test">Hello World</StackItem>);

    expect(screen.getByTestId('test')).toHaveTextContent('Hello World');
  });

  it('should default to div when used without Stack context', () => {
    render(<StackItem data-testid="standalone">Standalone</StackItem>);

    const item = screen.getByTestId('standalone');

    expect(item).toBeInTheDocument();
    expect(item.tagName).toBe('DIV');
  });
});
