import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { Button } from '../../Button';
import { TooltipTrigger } from '..';

describe('TooltipTrigger', () => {
  stylePropsTest((props) => <TooltipTrigger {...props} data-testid="TooltipTrigger-test" />, 'TooltipTrigger-test');

  restPropsTest((props) => <TooltipTrigger elementType={Button} {...props} />, 'button');

  validHtmlAttributesTest(TooltipTrigger);

  ariaAttributesTest(TooltipTrigger);

  elementTypePropsTest(TooltipTrigger);

  it('should render tooltip trigger', () => {
    const triggerText = 'TooltipTrigger';

    render(<TooltipTrigger>{triggerText}</TooltipTrigger>);

    expect(screen.getByRole('button')).toHaveTextContent(triggerText);
  });

  it('should render as button with default type="button"', () => {
    render(<TooltipTrigger>TooltipTrigger</TooltipTrigger>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('should honor user-supplied type on button', () => {
    render(<TooltipTrigger type="submit">TooltipTrigger</TooltipTrigger>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should not set type on non-button element', () => {
    render(
      <TooltipTrigger elementType="span" data-testid="TooltipTrigger-test">
        TooltipTrigger
      </TooltipTrigger>,
    );

    expect(screen.getByTestId('TooltipTrigger-test')).not.toHaveAttribute('type');
  });
});
