import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React, { type ComponentProps } from 'react';
import { ariaAttributesTest, restPropsTest, stylePropsTest, validHtmlAttributesTest } from '@local/tests';
import { ComboboxPopoverContextProvider } from '../ComboboxPopoverContext';
import UNSTABLE_ComboboxOption from '../UNSTABLE_ComboboxOption';

const defaultPopoverContextValue = {
  id: 'test-combobox',
  isDisabled: false,
  selectedKeys: [] as string[],
};

const ComboboxOptionTest = (props: Partial<ComponentProps<typeof UNSTABLE_ComboboxOption>>) => {
  const { children, value = 'cs', ...rest } = props;

  return (
    <ComboboxPopoverContextProvider value={defaultPopoverContextValue}>
      <UNSTABLE_ComboboxOption value={value} {...rest}>
        {children ?? 'Czech'}
      </UNSTABLE_ComboboxOption>
    </ComboboxPopoverContextProvider>
  );
};

describe('UNSTABLE_ComboboxOption', () => {
  stylePropsTest(ComboboxOptionTest);

  restPropsTest(ComboboxOptionTest, 'div');

  validHtmlAttributesTest(ComboboxOptionTest);

  ariaAttributesTest(ComboboxOptionTest);

  it('should render a grid row with nested gridcell', () => {
    render(<ComboboxOptionTest value="cs">Czech</ComboboxOptionTest>);

    const row = screen.getByRole('row', { name: 'Czech' });

    expect(row).toHaveAttribute('id', 'test-combobox-cs');
    expect(row).toHaveAttribute('data-spirit-value', 'cs');
    expect(row).toHaveAttribute('aria-selected', 'false');
    expect(row.querySelector('[role="gridcell"]')).toHaveTextContent('Czech');
  });

  it('should mark selected options from context', () => {
    render(
      <ComboboxPopoverContextProvider value={{ ...defaultPopoverContextValue, selectedKeys: ['cs'] }}>
        <UNSTABLE_ComboboxOption value="cs">Czech</UNSTABLE_ComboboxOption>
      </ComboboxPopoverContextProvider>,
    );

    const row = screen.getByRole('row', { name: 'Czech' });

    expect(row).toHaveAttribute('aria-selected', 'true');
    expect(row).toHaveClass('color-scheme-on-selected-subtle', 'bg-color-scheme');
  });

  it('should apply disabled surface when Combobox is disabled', () => {
    render(
      <ComboboxPopoverContextProvider value={{ ...defaultPopoverContextValue, isDisabled: true, selectedKeys: [] }}>
        <UNSTABLE_ComboboxOption value="en">English</UNSTABLE_ComboboxOption>
      </ComboboxPopoverContextProvider>,
    );

    const row = screen.getByRole('row', { name: 'English' });

    expect(row).toHaveAttribute('aria-selected', 'false');
    expect(row).toHaveClass('disabled', 'text-color-scheme');
    expect(row).not.toHaveClass('color-scheme-on-selected-subtle', 'bg-color-scheme');
  });
});
