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
        <DropdownPopover data-testid="test-popover">Hello World</DropdownPopover>
      </Dropdown>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('Trigger');
    expect(screen.getByTestId('test-popover')).toHaveTextContent('Hello World');
  });

  it('should be opened', () => {
    const onToggle = jest.fn();

    render(
      <Dropdown id="dropdown" isOpen onToggle={onToggle}>
        <DropdownTrigger>trigger</DropdownTrigger>
        <DropdownPopover data-testid="test-popover">Hello World</DropdownPopover>
      </Dropdown>,
    );

    expect(screen.getByRole('button')).toHaveClass('is-expanded');
    expect(screen.getByTestId('test-popover')).toHaveClass('is-open');
  });

  it('should call toggle function', () => {
    const onToggle = jest.fn();

    render(
      <Dropdown id="dropdown" isOpen={false} onToggle={onToggle}>
        <DropdownTrigger>trigger</DropdownTrigger>
        <DropdownPopover>Hello World</DropdownPopover>
      </Dropdown>,
    );

    const trigger = screen.getByRole('button') as HTMLElement;

    fireEvent.click(trigger);

    expect(onToggle).toHaveBeenCalled();
  });

  it('should call toggle function and focus trigger on Escape when open', () => {
    const onToggle = jest.fn();
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');

    render(
      <Dropdown id="dropdown" isOpen onToggle={onToggle}>
        <DropdownTrigger>trigger</DropdownTrigger>
        <DropdownPopover>Hello World</DropdownPopover>
      </Dropdown>,
    );

    const root = screen.getByRole('button').closest('.Dropdown') as HTMLElement;

    fireEvent.keyDown(root, { key: 'Escape', bubbles: true });

    expect(onToggle).toHaveBeenCalledTimes(1);

    return Promise.resolve().then(() => {
      expect(focusSpy).toHaveBeenCalledTimes(1);

      focusSpy.mockRestore();
    });
  });

  it('should not call toggle on Escape when closed', () => {
    const onToggle = jest.fn();

    render(
      <Dropdown id="dropdown" isOpen={false} onToggle={onToggle}>
        <DropdownTrigger>trigger</DropdownTrigger>
        <DropdownPopover>Hello World</DropdownPopover>
      </Dropdown>,
    );

    const root = screen.getByRole('button').closest('.Dropdown') as HTMLElement;

    fireEvent.keyDown(root, { key: 'Escape', bubbles: true });

    expect(onToggle).not.toHaveBeenCalled();
  });

  it('should not have same id on trigger and popover', () => {
    render(
      <Dropdown id="dropdown" isOpen={false} onToggle={() => {}}>
        <DropdownTrigger>trigger</DropdownTrigger>
        <DropdownPopover data-testid="test-popover">Hello World</DropdownPopover>
      </Dropdown>,
    );

    expect(screen.getByRole('button')).not.toHaveAttribute('id', 'dropdown');
    expect(screen.getByTestId('test-popover')).toHaveAttribute('id', 'dropdown');
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
