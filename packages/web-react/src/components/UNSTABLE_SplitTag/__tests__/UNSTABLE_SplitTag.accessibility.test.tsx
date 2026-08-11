import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';
import { accessibilityDisabledTest, accessibilityTest } from '@local/tests';
import { Tag } from '../../Tag';
import SplitTagLocationRadius from '../demo/SplitTagLocationRadius';
import { type SpiritUnstableSplitTagProps } from '../types';
import UNSTABLE_SplitTag from '../UNSTABLE_SplitTag';

jest.mock('../../../hooks/useIcon');

describe('UNSTABLE_SplitTag accessibility', () => {
  const SplitTagTest = (props: SpiritUnstableSplitTagProps) => (
    <UNSTABLE_SplitTag role="group" aria-label="Prague distance filter" {...props}>
      <Tag>Prague</Tag>
      <Tag elementType="button">+5 km</Tag>
    </UNSTABLE_SplitTag>
  );

  accessibilityTest(SplitTagTest, '[role="group"]');

  accessibilityDisabledTest(SplitTagTest, 'button');

  it('should expose a dialog with a named listbox and options', () => {
    render(<SplitTagLocationRadius />);

    const trigger = screen.getByRole('button', { name: 'Select distance, selected +5 km' });
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Distance options' });
    const listbox = within(dialog).getByRole('listbox', { name: 'Distance' });
    const options = within(listbox).getAllByRole('option');

    expect(options).toHaveLength(4);
    expect(options[0]).toHaveAttribute('id', 'split-tag-location-radius-option-0');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(options[0]).toHaveAttribute('tabindex', '0');
    expect(options[0]?.tagName).toBe('DIV');
    expect(options[0]).toHaveFocus();
  });

  it('should select an option with the keyboard and close the Dropdown', () => {
    render(<SplitTagLocationRadius />);

    fireEvent.click(screen.getByRole('button', { name: 'Select distance, selected +5 km' }));

    const options = screen.getAllByRole('option');
    fireEvent.keyDown(options[0]!, { key: 'ArrowDown' });

    expect(options[1]).toHaveFocus();

    fireEvent.keyDown(options[1]!, { key: 'Enter' });

    expect(screen.getByRole('button', { name: 'Select distance, selected +10 km' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});
