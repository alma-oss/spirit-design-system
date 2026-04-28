import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import DropdownPopover from '../DropdownPopover';

describe('DropdownPopover', () => {
  classNamePrefixProviderTest(DropdownPopover, 'DropdownPopover');

  stylePropsTest(DropdownPopover);

  restPropsTest(DropdownPopover, '.DropdownPopover');

  validHtmlAttributesTest(DropdownPopover);

  ariaAttributesTest(DropdownPopover);

  it('should have children', () => {
    const dom = render(<DropdownPopover>Popover</DropdownPopover>);
    const popover = dom.container.querySelector('.DropdownPopover') as HTMLElement;

    expect(popover).toHaveTextContent('Popover');
  });

  it('should have role="dialog" by default', () => {
    const dom = render(<DropdownPopover aria-label="Options">Popover</DropdownPopover>);
    const popover = dom.container.querySelector('.DropdownPopover') as HTMLElement;

    expect(popover).toHaveAttribute('role', 'dialog');
  });

  it('should not have aria-modal by default', () => {
    const dom = render(<DropdownPopover aria-label="Options">Popover</DropdownPopover>);
    const popover = dom.container.querySelector('.DropdownPopover') as HTMLElement;

    expect(popover).not.toHaveAttribute('aria-modal');
  });

  it('should allow overriding role via prop and must not have aria-modal', () => {
    const dom = render(<DropdownPopover role="listbox">Popover</DropdownPopover>);
    const popover = dom.container.querySelector('.DropdownPopover') as HTMLElement;

    expect(popover).toHaveAttribute('role', 'listbox');
    expect(popover).not.toHaveAttribute('aria-modal');
  });
});
