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
import { HelperText } from '../../HelperText';
import { Label } from '../../Label';
import { Stack } from '../../Stack';
import { ValidationText } from '../../ValidationText';
import Item from '../Item';

jest.mock('../../../hooks/useIcon');

const renderItemContent = (label = 'Item label', helperText?: string) => (
  <>
    <Label>{label}</Label>
    {helperText && <HelperText helperText={helperText} />}
  </>
);

describe('Item', () => {
  classNamePrefixProviderTest(Item, 'Item');

  stylePropsTest(Item);

  restPropsTest((props: SpiritItemProps) => <Item {...props} />, 'div');

  validHtmlAttributesTest(Item);

  ariaAttributesTest(Item);

  elementTypePropsTest(Item);

  it('should render label', () => {
    const label = 'Item label';

    render(<Item>{renderItemContent(label)}</Item>);

    const element = screen.getByText(label).closest('.Item') as HTMLElement;
    const content = element.querySelector('.Item__content');

    expect(element).toBeInTheDocument();
    expect(element.localName).toBe('div');
    expect(content).toContainElement(screen.getByText(label));
  });

  it('should render as a button when elementType is button', () => {
    const label = 'Item label';

    render(<Item elementType="button">{renderItemContent(label)}</Item>);

    expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
  });

  it('should render helperText', () => {
    const helperText = 'Helper text';
    render(<Item>{renderItemContent('Item label', helperText)}</Item>);

    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('should not apply vertical alignment class by default', () => {
    render(<Item>{renderItemContent()}</Item>);

    expect(screen.getByText('Item label').closest('.Item')).not.toHaveClass('Item--alignmentYTop');
  });

  it('should render with non-default vertical alignment', () => {
    render(<Item alignmentY="bottom">{renderItemContent()}</Item>);

    expect(screen.getByText('Item label').closest('.Item')).toHaveClass('Item--alignmentYBottom');
  });

  it('should provide span element type to nested form field components', () => {
    render(
      <Item>
        <Label>Item label</Label>
        <HelperText helperText="Helper text" />
        <ValidationText validationText="Validation text" />
      </Item>,
    );

    expect(screen.getByText('Item label').localName).toBe('span');
    expect(screen.getByText('Helper text').localName).toBe('span');
    expect(screen.getByText('Validation text').localName).toBe('span');
  });

  it('should allow nested form field components to override provided element type', () => {
    render(
      <Item>
        <Label elementType="strong">Item label</Label>
        <HelperText elementType="small" helperText="Helper text" />
        <ValidationText elementType="p" validationText="Validation text" />
      </Item>,
    );

    expect(screen.getByText('Item label').localName).toBe('strong');
    expect(screen.getByText('Helper text').localName).toBe('small');
    expect(screen.getByText('Validation text').localName).toBe('p');
  });

  it('should render start slot', () => {
    render(<Item startSlot={<span data-testid="start-slot" />}>{renderItemContent()}</Item>);

    const element = screen.getByText('Item label').closest('.Item') as HTMLElement;
    const content = element.querySelector('.Item__content');
    const slot = element.querySelector('.Item__slot');

    expect(content).toContainElement(screen.getByText('Item label'));
    expect(content).not.toContainElement(screen.getByTestId('start-slot'));
    expect(slot).toContainElement(screen.getByTestId('start-slot'));
    expect(element.firstElementChild).toBe(slot);
  });

  it('should inherit list item element type from Stack context', () => {
    render(
      <Stack elementType="ul">
        <Item>{renderItemContent('List item')}</Item>
      </Stack>,
    );

    expect(screen.getByText('List item').closest('li')).toHaveClass('Item');
  });

  it('should be selected', () => {
    render(<Item isSelected>{renderItemContent()}</Item>);

    const element = screen.getByText('Item label').closest('.Item') as HTMLElement;

    expect(element).toHaveClass('color-scheme-on-selected-subtle', 'bg-color-scheme');
    expect(element).not.toHaveClass('text-color-scheme');
    expect(element.querySelectorAll('.Item__slot')).toHaveLength(0);
  });

  it('should keep selected color scheme when disabled', () => {
    render(
      <Item isDisabled isSelected>
        {renderItemContent()}
      </Item>,
    );

    const element = screen.getByText('Item label').closest('.Item') as HTMLElement;

    expect(element).toHaveClass('disabled', 'color-scheme-on-selected-subtle', 'text-color-scheme');
    expect(element).not.toHaveClass('bg-color-scheme');
  });

  it('should render end slot', () => {
    render(<Item endSlot={<span data-testid="end-slot" />}>{renderItemContent()}</Item>);

    const element = screen.getByText('Item label').closest('.Item') as HTMLElement;
    const content = element.querySelector('.Item__content');

    expect(content).toContainElement(screen.getByText('Item label'));
    expect(content).not.toContainElement(screen.getByTestId('end-slot'));
    expect(element.querySelector('.Item__slot')).toContainElement(screen.getByTestId('end-slot'));
    expect(element.lastElementChild).toHaveClass('Item__slot');
  });

  it('should combine selected state and end slot', () => {
    render(
      <Item endSlot={<span data-testid="end-slot" />} isSelected>
        {renderItemContent()}
      </Item>,
    );

    const element = screen.getByText('Item label').closest('.Item') as HTMLElement;

    expect(element).toHaveClass('color-scheme-on-selected-subtle', 'bg-color-scheme');
    expect(element.querySelector('.Item__slot')).toContainElement(screen.getByTestId('end-slot'));
  });

  it('should be disabled', () => {
    render(<Item isDisabled>{renderItemContent()}</Item>);

    const element = screen.getByText('Item label').closest('.Item') as HTMLElement;

    expect(element).toHaveClass('disabled', 'text-color-scheme');
    expect(element).not.toHaveClass('bg-color-scheme');
    expect(element).not.toHaveAttribute('disabled');
  });

  it('should set disabled attribute on button element', () => {
    render(
      <Item elementType="button" isDisabled>
        {renderItemContent()}
      </Item>,
    );

    const element = screen.getByRole('button', { name: 'Item label' });

    expect(element).toBeDisabled();
  });
});
