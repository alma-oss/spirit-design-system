import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  colorSchemeBasicTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { DEFAULT_TOOLTIP_COLOR } from '../constants';
import { TooltipPopover } from '..';

describe('TooltipPopover', () => {
  classNamePrefixProviderTest(TooltipPopover, 'TooltipPopover');

  stylePropsTest((props) => <TooltipPopover {...props} data-testid="tooltip-popover-test" />, 'tooltip-popover-test');

  restPropsTest((props) => <TooltipPopover {...props} />, 'div');

  validHtmlAttributesTest(TooltipPopover);

  ariaAttributesTest(TooltipPopover);

  colorSchemeBasicTest(TooltipPopover, [DEFAULT_TOOLTIP_COLOR]);

  it('should render tooltip popover', () => {
    const popoverText = 'TooltipPopover';

    render(<TooltipPopover data-testid="test-tooltipPopover">{popoverText}</TooltipPopover>);

    expect(screen.getByTestId('test-tooltipPopover').textContent).toBe(popoverText);
    expect(screen.getByTestId('test-tooltipPopover')).toHaveClass('color-scheme-on-neutral-basic');
  });
});
