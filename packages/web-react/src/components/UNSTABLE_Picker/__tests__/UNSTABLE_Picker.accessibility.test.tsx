import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React, { type ComponentProps } from 'react';
import { accessibilityDisabledTest, accessibilityTest, accessibilityValidationStateTest } from '@local/tests';
import { useToggle } from '../../../hooks';
import { UNSTABLE_Picker, UNSTABLE_PickerGroup, UNSTABLE_PickerItem } from '..';

jest.mock('../../../hooks/useIcon');

const pickerFieldId = 'picker-accessibility';
const pickerShellId = `picker-${pickerFieldId}`;
const popoverDomId = `${pickerShellId}-popover`;
const selectionDomId = `${pickerShellId}-selection`;
const tagDescriptionDomId = `${pickerShellId}-tag-description`;

describe('UNSTABLE_Picker accessibility', () => {
  const PickerTest = (props: Partial<ComponentProps<typeof UNSTABLE_Picker>>) => {
    const [isOpen, onToggle] = useToggle(false);

    return (
      <UNSTABLE_Picker
        data-testid="picker-test"
        id={pickerFieldId}
        label="Languages"
        selectedKeys={[]}
        onSelectionChange={() => {}}
        validationText="Validation text"
        {...props}
        isOpen={isOpen}
        onToggle={onToggle}
      >
        <UNSTABLE_PickerGroup label="Language">
          <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
          <UNSTABLE_PickerItem value="dk">Danish</UNSTABLE_PickerItem>
        </UNSTABLE_PickerGroup>
      </UNSTABLE_Picker>
    );
  };

  accessibilityTest(PickerTest, '[data-testid="picker-test"]');

  accessibilityDisabledTest(PickerTest, '[data-testid="picker-test"]');

  accessibilityValidationStateTest(PickerTest, '[data-testid="picker-test"]');

  describe('ARIA attributes', () => {
    it('sets outer input container group label to field label', () => {
      const { container } = render(<PickerTest />);
      const outerGroup = container.querySelector('.UNSTABLE_Picker__inputContainer');

      expect(outerGroup).toHaveAttribute('role', 'group');
      expect(outerGroup).toHaveAttribute('aria-label', 'Languages');
    });

    it('uses role group and default selection aria-label when nothing is selected', () => {
      render(<PickerTest />);
      const selection = document.getElementById(selectionDomId);

      expect(selection).toHaveAttribute('role', 'group');
      expect(selection).toHaveAttribute('aria-label', 'Selected Languages');
      expect(selection).toHaveAttribute('aria-live', 'off');
      expect(selection).toHaveAttribute('aria-atomic', 'false');
      expect(selection).toHaveAttribute('aria-relevant', 'additions');
    });

    it('uses role grid when selection has tags', () => {
      render(<PickerTest selectedKeys={['cs']} />);
      const selection = document.getElementById(selectionDomId);

      expect(selection).toHaveAttribute('role', 'grid');
      expect(selection).toHaveAttribute('aria-label', 'Selected Languages');
    });

    it('applies custom selectionAriaLabel with label substitution', () => {
      render(<PickerTest selectionAriaLabel="Picked: {label}" />);

      expect(document.getElementById(selectionDomId)).toHaveAttribute('aria-label', 'Picked: Languages');
    });

    it('marks empty selection placeholder as aria-hidden', () => {
      const { container } = render(<PickerTest />);
      const placeholder = container.querySelector('.UNSTABLE_Picker__selectionEmpty');

      expect(placeholder).toHaveAttribute('aria-hidden', 'true');
    });

    it('links trigger to popover with haspopup, expanded, and controls', () => {
      render(<PickerTest />);
      const trigger = screen.getByRole('button', { name: 'Add' });

      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-controls', popoverDomId);

      fireEvent.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(document.getElementById(popoverDomId)).toBeInTheDocument();
    });

    it('exposes tag instruction text in a hidden element', () => {
      render(<PickerTest tagDescriptionText="Custom remove hint" />);
      const el = document.getElementById(tagDescriptionDomId);

      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute('hidden');
      expect(el).toHaveTextContent('Custom remove hint');
    });

    it('links tag instruction text to each focusable tag row via aria-describedby', () => {
      render(<PickerTest selectedKeys={['cs']} />);
      const row = screen.getByRole('row', { name: 'Czech' });

      expect(row).toHaveAttribute('aria-describedby', tagDescriptionDomId);
    });

    it('exposes UNSTABLE_PickerGroup label on the nested fieldset in the popover', () => {
      render(<PickerTest />);
      fireEvent.click(screen.getByRole('button', { name: 'Add' }));

      expect(screen.getByRole('group', { name: 'Language' })).toBeInTheDocument();
    });
  });
});
