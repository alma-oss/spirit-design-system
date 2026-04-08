import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { classNamePrefixProviderTest, restPropsTest, stylePropsTest, validHtmlAttributesTest } from '@local/tests';
import { FillVariants } from '../../../constants';
import { type ChildrenProps, type FillVariantDictionaryType } from '../../../types';
import SegmentedControl from '../SegmentedControl';
import SegmentedControlItem from '../SegmentedControlItem';

type ControlledSegmentedControlProps = ChildrenProps & {
  isMultiselect?: boolean;
  defaultValue?: string | string[];
  isFluid?: boolean;
  variant: FillVariantDictionaryType | undefined;
  onSelectionChange?: (value: string | string[]) => void;
};

const ControlledSegmentedControl = ({
  children,
  defaultValue = '1',
  isMultiselect,
  isFluid = false,
  variant,
  onSelectionChange,
}: ControlledSegmentedControlProps) => {
  const [selectedValue, setSelectedValue] = useState<string | string[]>(defaultValue);

  return (
    <SegmentedControl
      name="test-control"
      label="Test label"
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      isMultiselect={isMultiselect}
      variant={variant}
      isFluid={isFluid}
      onSelectionChange={onSelectionChange}
    >
      {children}
    </SegmentedControl>
  );
};

describe('SegmentedControl', () => {
  classNamePrefixProviderTest(SegmentedControl, 'SegmentedControl');

  stylePropsTest(SegmentedControl);

  restPropsTest(SegmentedControl, 'fieldset');

  validHtmlAttributesTest(SegmentedControl);

  describe.each<string | undefined>([undefined, ...Object.values(FillVariants)])(
    'should render for %s variant',
    (variant) => {
      it('should render label as visually hidden', () => {
        render(<ControlledSegmentedControl variant={variant}>Item</ControlledSegmentedControl>);

        expect(screen.getByText('Test label')).toBeInTheDocument();
      });

      it('should render children', () => {
        render(<ControlledSegmentedControl variant={variant}>Item</ControlledSegmentedControl>);

        expect(screen.getByText('Item')).toBeInTheDocument();
      });

      it('should render with fluid class', () => {
        render(
          <ControlledSegmentedControl variant={variant} isFluid>
            Item
          </ControlledSegmentedControl>,
        );

        expect(screen.getByText('Item')).toHaveClass('SegmentedControl--fluid');
      });

      it('should check first item by default', () => {
        render(
          <ControlledSegmentedControl variant={variant} defaultValue="1">
            <SegmentedControlItem id="option-1" value="1">
              Item 1
            </SegmentedControlItem>
            <SegmentedControlItem id="option-2" value="2">
              Item 2
            </SegmentedControlItem>
          </ControlledSegmentedControl>,
        );

        const inputs = screen.getAllByRole('radio') as HTMLInputElement[];

        expect(inputs).toHaveLength(2);
        expect(inputs[0]?.checked).toBe(true);
      });

      it('should change selected item on click (single selection)', () => {
        render(
          <ControlledSegmentedControl variant={variant} defaultValue="1">
            <SegmentedControlItem id="option-1" value="1">
              Item 1
            </SegmentedControlItem>
            <SegmentedControlItem id="option-2" value="2">
              Item 2
            </SegmentedControlItem>
          </ControlledSegmentedControl>,
        );

        const input1 = screen.getByLabelText('Item 1') as HTMLInputElement;
        const input2 = screen.getByLabelText('Item 2') as HTMLInputElement;

        expect(input1.checked).toBe(true);
        expect(input2.checked).toBe(false);

        fireEvent.click(input2);

        expect(input1.checked).toBe(false);
        expect(input2.checked).toBe(true);
      });

      it('should allow multiple selection when isMultiselect is true', () => {
        render(
          <ControlledSegmentedControl variant={variant} defaultValue={['1']} isMultiselect>
            <SegmentedControlItem id="option-1" value="1">
              Item 1
            </SegmentedControlItem>
            <SegmentedControlItem id="option-2" value="2">
              Item 2
            </SegmentedControlItem>
          </ControlledSegmentedControl>,
        );

        const input1 = screen.getByLabelText('Item 1') as HTMLInputElement;
        const input2 = screen.getByLabelText('Item 2') as HTMLInputElement;

        expect(input1.checked).toBe(true);
        expect(input2.checked).toBe(false);

        fireEvent.click(input2);

        expect(input1.checked).toBe(true);
        expect(input2.checked).toBe(true);

        fireEvent.click(input1);

        expect(input1.checked).toBe(false);
        expect(input2.checked).toBe(true);
      });

      it('should render with disabled item', () => {
        render(
          <ControlledSegmentedControl variant={variant} defaultValue="2">
            <SegmentedControlItem id="option-1" value="1" isDisabled>
              Item 1
            </SegmentedControlItem>
          </ControlledSegmentedControl>,
        );

        expect(screen.getByRole('radio')).toBeDisabled();
      });

      it('should correctly handle disabled item', () => {
        render(
          <ControlledSegmentedControl variant={variant} defaultValue="2">
            <SegmentedControlItem id="option-1" value="1" isDisabled>
              Item 1
            </SegmentedControlItem>
            <SegmentedControlItem id="option-2" value="2">
              Item 2
            </SegmentedControlItem>
          </ControlledSegmentedControl>,
        );

        const input1 = screen.getByLabelText('Item 1') as HTMLInputElement;
        const input2 = screen.getByLabelText('Item 2') as HTMLInputElement;

        expect(input1.checked).toBe(false);
        expect(input2.checked).toBe(true);

        fireEvent.click(input1); // Should not change selection

        expect(input1.checked).toBe(false);
        expect(input2.checked).toBe(true);
      });

      it('should render with multiple selected items', () => {
        render(
          <ControlledSegmentedControl variant={variant} defaultValue={['1', '2']} isMultiselect>
            <SegmentedControlItem id="option-1" value="1">
              Item 1
            </SegmentedControlItem>
            <SegmentedControlItem id="option-2" value="2">
              Item 2
            </SegmentedControlItem>
          </ControlledSegmentedControl>,
        );

        const inputs = screen.getAllByRole('checkbox') as HTMLInputElement[];

        expect(inputs[0]?.checked).toBe(true);
        expect(inputs[1]?.checked).toBe(true);
      });

      it('should call onSelectionChange callback', () => {
        const mockOnSelectionChange = jest.fn();

        render(
          <ControlledSegmentedControl variant={variant} onSelectionChange={mockOnSelectionChange}>
            <SegmentedControlItem id="option-1" value="1">
              Item 1
            </SegmentedControlItem>
            <SegmentedControlItem id="option-2" value="2">
              Item 2
            </SegmentedControlItem>
          </ControlledSegmentedControl>,
        );

        fireEvent.click(screen.getByLabelText('Item 2'));

        expect(mockOnSelectionChange).toHaveBeenCalledWith('2');
      });
    },
  );
});
