import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { type DropdownAlignmentXType, type DropdownAlignmentYType } from '../../../types';
import Dropdown from '../Dropdown';
import DropdownPopover from '../DropdownPopover';
import DropdownTrigger from '../DropdownTrigger';
import UncontrolledDropdown from '../UncontrolledDropdown';

describe('Dropdown', () => {
  classNamePrefixProviderTest(Dropdown, 'Dropdown');

  stylePropsTest(
    (props: Record<string, unknown>) => (
      <Dropdown id="dropdown" isOpen={false} onToggle={() => {}} {...props} data-testid="test-dropdown" />
    ),
    'test-dropdown',
  );

  restPropsTest(Dropdown, '.Dropdown');

  validHtmlAttributesTest(Dropdown);

  ariaAttributesTest(Dropdown);

  it('should render text children', () => {
    render(
      <Dropdown id="dropdown" isOpen={false} onToggle={() => {}}>
        <DropdownTrigger>Trigger</DropdownTrigger>
        <DropdownPopover aria-label="Dropdown">Hello World</DropdownPopover>
      </Dropdown>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('Trigger');
    expect(screen.getByRole('dialog', { name: 'Dropdown' })).toHaveTextContent('Hello World');
  });

  it('should be opened', () => {
    const onToggle = jest.fn();

    render(
      <Dropdown id="dropdown" isOpen onToggle={onToggle}>
        <DropdownTrigger>trigger</DropdownTrigger>
        <DropdownPopover aria-label="Dropdown">Hello World</DropdownPopover>
      </Dropdown>,
    );

    expect(screen.getByRole('button')).toHaveClass('is-expanded');
    expect(screen.getByRole('dialog', { name: 'Dropdown' })).toHaveClass('is-open');
  });

  it('should call toggle function', () => {
    const onToggle = jest.fn();

    render(
      <Dropdown id="dropdown" isOpen={false} onToggle={onToggle}>
        <DropdownTrigger>trigger</DropdownTrigger>
        <DropdownPopover aria-label="Dropdown">Hello World</DropdownPopover>
      </Dropdown>,
    );

    const trigger = screen.getByRole('button') as HTMLElement;

    fireEvent.click(trigger);

    expect(onToggle).toHaveBeenCalled();
  });

  it('should call toggle function on ArrowDown when trigger is focused and closed', () => {
    const onToggle = jest.fn();

    render(
      <Dropdown id="dropdown" isOpen={false} onToggle={onToggle}>
        <DropdownTrigger>trigger</DropdownTrigger>
        <DropdownPopover aria-label="Dropdown">Hello World</DropdownPopover>
      </Dropdown>,
    );

    const trigger = screen.getByRole('button');
    trigger.focus();
    fireEvent.keyDown(trigger, { key: 'ArrowDown', bubbles: true });

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should call toggle function and focus trigger on Escape when open', async () => {
    const onToggle = jest.fn();
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');

    try {
      render(
        <Dropdown id="dropdown" isOpen onToggle={onToggle}>
          <DropdownTrigger>trigger</DropdownTrigger>
          <DropdownPopover aria-label="Dropdown">Hello World</DropdownPopover>
        </Dropdown>,
      );

      const root = screen.getByRole('button').closest('.Dropdown') as HTMLElement;

      fireEvent.keyDown(root, { key: 'Escape', bubbles: true });

      expect(onToggle).toHaveBeenCalledTimes(1);

      await Promise.resolve();

      expect(focusSpy).toHaveBeenCalledTimes(1);
    } finally {
      focusSpy.mockRestore();
    }
  });

  it('should not call toggle on Escape when closed', () => {
    const onToggle = jest.fn();

    render(
      <Dropdown id="dropdown" isOpen={false} onToggle={onToggle}>
        <DropdownTrigger>trigger</DropdownTrigger>
        <DropdownPopover aria-label="Dropdown">Hello World</DropdownPopover>
      </Dropdown>,
    );

    const root = screen.getByRole('button').closest('.Dropdown') as HTMLElement;

    fireEvent.keyDown(root, { key: 'Escape', bubbles: true });

    expect(onToggle).not.toHaveBeenCalled();
  });

  it('should close uncontrolled dropdown and focus trigger on Escape when open', async () => {
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');

    try {
      render(
        <UncontrolledDropdown id="dropdown">
          <DropdownTrigger>trigger</DropdownTrigger>
          <DropdownPopover aria-label="Dropdown">Hello World</DropdownPopover>
        </UncontrolledDropdown>,
      );

      const trigger = screen.getByRole('button');
      const popover = screen.getByRole('dialog', { name: 'Dropdown' });
      const root = trigger.closest('.Dropdown') as HTMLElement;

      fireEvent.click(trigger);

      expect(popover).toHaveClass('is-open');

      fireEvent.keyDown(root, { key: 'Escape', bubbles: true });

      expect(popover).not.toHaveClass('is-open');

      await Promise.resolve();

      expect(focusSpy).toHaveBeenCalledTimes(1);
    } finally {
      focusSpy.mockRestore();
    }
  });

  it('should open uncontrolled dropdown on ArrowDown when trigger is focused', () => {
    render(
      <UncontrolledDropdown id="dropdown">
        <DropdownTrigger>trigger</DropdownTrigger>
        <DropdownPopover aria-label="Dropdown">Hello World</DropdownPopover>
      </UncontrolledDropdown>,
    );

    const trigger = screen.getByRole('button');
    const popover = screen.getByRole('dialog', { name: 'Dropdown' });
    trigger.focus();

    fireEvent.keyDown(trigger, { key: 'ArrowDown', bubbles: true });

    expect(popover).toHaveClass('is-open');
  });

  it('should support external triggerRef in uncontrolled dropdown', () => {
    const triggerRef = { current: null as HTMLElement | null | undefined };

    render(
      <UncontrolledDropdown id="dropdown" triggerRef={triggerRef}>
        <DropdownTrigger>trigger</DropdownTrigger>
        <DropdownPopover aria-label="Dropdown">Hello World</DropdownPopover>
      </UncontrolledDropdown>,
    );

    expect(triggerRef.current).toBe(screen.getByRole('button'));
  });

  it('should not have same id on trigger and popover', () => {
    render(
      <Dropdown id="dropdown" isOpen={false} onToggle={() => {}}>
        <DropdownTrigger>trigger</DropdownTrigger>
        <DropdownPopover aria-label="Dropdown">Hello World</DropdownPopover>
      </Dropdown>,
    );

    expect(screen.getByRole('button')).not.toHaveAttribute('id', 'dropdown');
    expect(screen.getByRole('dialog', { name: 'Dropdown' })).toHaveAttribute('id', 'dropdown');
  });

  describe('Alignment tests', () => {
    const alignmentTests: Array<[unknown, unknown, string]> = [
      ['center', undefined, 'Dropdown Dropdown--alignmentXCenter'],
      ['center', 'center', 'Dropdown Dropdown--alignmentXCenter Dropdown--alignmentYCenter'],
      [
        { tablet: 'center', desktop: 'right' },
        undefined,
        'Dropdown Dropdown--tablet--alignmentXCenter Dropdown--desktop--alignmentXRight',
      ],
      [
        { mobile: 'left', tablet: 'center', desktop: 'right' },
        undefined,
        'Dropdown Dropdown--alignmentXLeft Dropdown--tablet--alignmentXCenter Dropdown--desktop--alignmentXRight',
      ],
      [
        { mobile: 'left', tablet: 'center', desktop: 'right' },
        { mobile: 'top', tablet: 'center', desktop: 'bottom' },
        'Dropdown Dropdown--alignmentXLeft Dropdown--tablet--alignmentXCenter Dropdown--desktop--alignmentXRight Dropdown--alignmentYTop Dropdown--tablet--alignmentYCenter Dropdown--desktop--alignmentYBottom',
      ],
    ];

    it.each(alignmentTests)(
      'should render alignmentX=%o and alignmentY=%o',
      (alignmentX, alignmentY, expectedClass) => {
        render(
          <Dropdown
            alignmentX={alignmentX as DropdownAlignmentXType}
            alignmentY={alignmentY as DropdownAlignmentYType}
            data-testid="dropdown"
            id="dropdown"
            isOpen={false}
            onToggle={() => {}}
          />,
        );

        // If your component *always* applies the 'Dropdown' class, include it in the expectation:
        expect(screen.getByTestId('dropdown')).toHaveClass(expectedClass);
      },
    );
  });
});
