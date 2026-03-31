import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import React, { type ComponentProps, type ReactElement } from 'react';
import { ariaAttributesTest, restPropsTest, stylePropsTest, validHtmlAttributesTest } from '@local/tests';
import { MULTIPLE_SELECTION_MODE } from '../../../constants';
import { PickerPopoverContextProvider } from '../PickerPopoverContext';
import type { UnstablePickerPopoverContextValue } from '../types';
import UNSTABLE_PickerGroup from '../UNSTABLE_PickerGroup';

jest.mock('../../../hooks/useIcon');

const defaultPopoverContext: UnstablePickerPopoverContextValue = {
  id: 'test-picker',
  isDisabled: false,
  onSelectionChange: jest.fn(),
  selectedKeys: [],
  selectionMode: MULTIPLE_SELECTION_MODE,
};

const renderWithPopoverContext = (ui: ReactElement, contextValue: Partial<UnstablePickerPopoverContextValue> = {}) =>
  render(
    <PickerPopoverContextProvider value={{ ...defaultPopoverContext, ...contextValue }}>
      {ui}
    </PickerPopoverContextProvider>,
  );

const PickerGroupTest = (props: Partial<ComponentProps<typeof UNSTABLE_PickerGroup>>) => {
  const { children, ...rest } = props;

  return (
    <PickerPopoverContextProvider value={defaultPopoverContext}>
      <UNSTABLE_PickerGroup label="Label" data-testid="picker-group-test" {...rest}>
        {children ?? <span />}
      </UNSTABLE_PickerGroup>
    </PickerPopoverContextProvider>
  );
};

describe('UNSTABLE_PickerGroup', () => {
  stylePropsTest(PickerGroupTest, 'picker-group-test');

  restPropsTest(PickerGroupTest, 'fieldset');

  validHtmlAttributesTest(PickerGroupTest);

  ariaAttributesTest(PickerGroupTest);

  it('should pass isFluid, isLabelHidden, and label to FieldGroup', () => {
    renderWithPopoverContext(
      <UNSTABLE_PickerGroup label="Languages">
        <span>child</span>
      </UNSTABLE_PickerGroup>,
    );

    const group = screen.getByRole('group', { name: 'Languages' });

    expect(group.localName).toBe('fieldset');
    expect(group).toHaveClass('FieldGroup', 'FieldGroup--fluid');
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('should render multiple groups under the same picker context', () => {
    renderWithPopoverContext(
      <>
        <UNSTABLE_PickerGroup label="Group A">
          <span>a</span>
        </UNSTABLE_PickerGroup>
        <UNSTABLE_PickerGroup label="Group B">
          <span>b</span>
        </UNSTABLE_PickerGroup>
      </>,
      { id: 'same-picker' },
    );

    expect(screen.getByRole('group', { name: 'Group A' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Group B' })).toBeInTheDocument();
  });

  it('should forward additional FieldGroup and DOM props', () => {
    renderWithPopoverContext(
      <UNSTABLE_PickerGroup label="Regions" UNSAFE_className="MyPickerGroup" data-testid="picker-group-regions">
        <span>x</span>
      </UNSTABLE_PickerGroup>,
    );

    const group = screen.getByRole('group', { name: 'Regions' });

    expect(group).toHaveAttribute('data-testid', 'picker-group-regions');
    expect(group.localName).toBe('fieldset');
    expect(group).toHaveClass('MyPickerGroup');
  });

  describe('ARIA-related FieldGroup props', () => {
    it('should pass label to FieldGroup for accessible naming and hide visible duplicate label', () => {
      renderWithPopoverContext(
        <UNSTABLE_PickerGroup label="Regions">
          <span>x</span>
        </UNSTABLE_PickerGroup>,
      );

      const group = screen.getByRole('group', { name: 'Regions' });

      // Only the legend carries the group name; no second visible "Regions" label (isLabelHidden).
      expect(within(group).getAllByText('Regions')).toHaveLength(1);
    });
  });
});
