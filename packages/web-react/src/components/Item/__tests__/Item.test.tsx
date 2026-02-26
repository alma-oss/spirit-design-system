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
import { type SpiritItemProps } from '../../../types';
import Item from '../Item';

jest.mock('../../../hooks/useIcon');

describe('Item', () => {
  classNamePrefixProviderTest(Item, 'Item');

  stylePropsTest(Item);

  restPropsTest((props: SpiritItemProps) => <Item {...props} />, 'button');

  validHtmlAttributesTest(Item);

  ariaAttributesTest(Item);

  elementTypePropsTest(Item);

  it('should render label', () => {
    const label = 'Item label';

    render(<Item label={label} />);

    expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
  });

  it('should render helperText', () => {
    const helperText = 'Helper text';
    render(<Item label="Item label" helperText={helperText} />);

    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('should render icon', () => {
    render(<Item label="Item label" iconName="search" />);

    const element = screen.getByRole('button', { name: 'Item label' });
    const startIcon = element.querySelector('.Item__icon--start');

    expect(startIcon).toBeInTheDocument();
  });

  it('should be selected with background only when selectionDecorator is background', () => {
    render(<Item label="Item label" isSelected selectionDecorator="background" />);

    const element = screen.getByRole('button', { name: 'Item label' });

    expect(element).toHaveClass('Item--selected');
    expect(element.querySelectorAll('.Item__icon')).toHaveLength(0);
  });

  it('should be selected with icon only by default', () => {
    render(<Item label="Item label" isSelected />);

    const element = screen.getByRole('button', { name: 'Item label' });

    expect(element).not.toHaveClass('Item--selected');
    expect(element.querySelector('.Item__icon--end')).toBeInTheDocument();
  });

  it('should be selected with both background and icon when selectionDecorator is both', () => {
    render(<Item label="Item label" isSelected selectionDecorator="both" />);

    const element = screen.getByRole('button', { name: 'Item label' });

    expect(element).toHaveClass('Item--selected');
    expect(element.querySelector('.Item__icon--end')).toBeInTheDocument();
  });

  it('should be disabled', () => {
    render(<Item label="Item label" isDisabled />);

    const element = screen.getByRole('button', { name: 'Item label' });

    expect(element).toHaveClass('Item--disabled');
  });
});
