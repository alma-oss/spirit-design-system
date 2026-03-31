import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React, { type ComponentProps } from 'react';
import { accessibilityDisabledTest, accessibilityTest, accessibilityValidationStateTest } from '@local/tests';
import { UNSTABLE_PickerGroup, UNSTABLE_PickerItem, UNSTABLE_UncontrolledPicker } from '..';

jest.mock('../../../hooks/useIcon');

const pickerFieldId = 'picker-uncontrolled-accessibility';
const pickerShellId = `picker-${pickerFieldId}`;
const popoverDomId = `${pickerShellId}-popover`;
const selectionDomId = `${pickerShellId}-selection`;
const pickerAccessibilityTestId = 'uncontrolled-picker-test';

describe('UNSTABLE_UncontrolledPicker accessibility', () => {
  const UncontrolledPickerTest = (props: Partial<ComponentProps<typeof UNSTABLE_UncontrolledPicker>>) => (
    <UNSTABLE_UncontrolledPicker
      data-testid={pickerAccessibilityTestId}
      id={pickerFieldId}
      label="Languages"
      validationText="Validation text"
      {...props}
    >
      <UNSTABLE_PickerGroup label="Language">
        <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
        <UNSTABLE_PickerItem value="dk">Danish</UNSTABLE_PickerItem>
      </UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>
  );

  accessibilityTest(UncontrolledPickerTest, `[data-testid="${pickerAccessibilityTestId}"]`);

  accessibilityDisabledTest(UncontrolledPickerTest, `[data-testid="${pickerAccessibilityTestId}"]`);

  accessibilityValidationStateTest(UncontrolledPickerTest, `[data-testid="${pickerAccessibilityTestId}"]`);

  describe('ARIA attributes', () => {
    it('matches controlled picker shell for trigger aria-controls and selection aria-label', () => {
      render(<UncontrolledPickerTest />);
      const trigger = screen.getByRole('button', { name: 'Add' });

      expect(trigger).toHaveAttribute('aria-controls', popoverDomId);
      expect(document.getElementById(selectionDomId)).toHaveAttribute('aria-label', 'Selected Languages');
    });
  });
});
