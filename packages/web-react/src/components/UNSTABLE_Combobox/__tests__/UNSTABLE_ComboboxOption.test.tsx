import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React, { type ComponentProps } from 'react';
import { ariaAttributesTest, restPropsTest, stylePropsTest, validHtmlAttributesTest } from '@local/tests';
import { ComboboxPopoverContextProvider } from '../ComboboxPopoverContext';
import UNSTABLE_ComboboxOption from '../UNSTABLE_ComboboxOption';

const defaultPopoverContextValue = {
  id: 'test-combobox',
  isDisabled: false,
  optionsRole: 'listbox' as const,
  selectedKeysSet: new Set<string>(),
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

  it('should render a listbox option by default', () => {
    render(<ComboboxOptionTest value="cs">Czech</ComboboxOptionTest>);

    const option = screen.getByRole('option', { name: 'Czech' });

    expect(option).toHaveAttribute('id', 'test-combobox-cs');
    expect(option).toHaveAttribute('data-spirit-value', 'cs');
    expect(option).toHaveAttribute('aria-selected', 'false');
    expect(option.querySelector('[role="gridcell"]')).toBeNull();
  });

  it('should render a grid row with nested gridcell when optionsRole is grid', () => {
    render(
      <ComboboxPopoverContextProvider value={{ ...defaultPopoverContextValue, optionsRole: 'grid' }}>
        <UNSTABLE_ComboboxOption value="cs">Czech</UNSTABLE_ComboboxOption>
      </ComboboxPopoverContextProvider>,
    );

    const row = screen.getByRole('row', { name: 'Czech' });

    expect(row).toHaveAttribute('id', 'test-combobox-cs');
    expect(row.querySelector('[role="gridcell"]')).toHaveTextContent('Czech');
  });

  it('should expose an explicit label for selection tags', () => {
    render(
      <ComboboxOptionTest value="malir" label="Malíř pokojů">
        Malíř pokojů Plný úvazek
      </ComboboxOptionTest>,
    );

    expect(screen.getByRole('option')).toHaveAttribute('data-spirit-label', 'Malíř pokojů');
  });

  it('should mark selected options from context', () => {
    render(
      <ComboboxPopoverContextProvider value={{ ...defaultPopoverContextValue, selectedKeysSet: new Set(['cs']) }}>
        <UNSTABLE_ComboboxOption value="cs">Czech</UNSTABLE_ComboboxOption>
      </ComboboxPopoverContextProvider>,
    );

    const option = screen.getByRole('option', { name: 'Czech' });

    expect(option).toHaveAttribute('aria-selected', 'true');
    expect(option).toHaveClass('color-scheme-on-selected-subtle', 'bg-color-scheme');
  });

  it('should apply disabled surface when Combobox is disabled', () => {
    render(
      <ComboboxPopoverContextProvider value={{ ...defaultPopoverContextValue, isDisabled: true }}>
        <UNSTABLE_ComboboxOption value="en">English</UNSTABLE_ComboboxOption>
      </ComboboxPopoverContextProvider>,
    );

    const option = screen.getByRole('option', { name: 'English' });

    expect(option).toHaveAttribute('aria-selected', 'false');
    expect(option).toHaveAttribute('aria-disabled', 'true');
    expect(option).toHaveClass('disabled', 'text-color-scheme');
    expect(option).not.toHaveClass('color-scheme-on-selected-subtle', 'bg-color-scheme');
  });
});
