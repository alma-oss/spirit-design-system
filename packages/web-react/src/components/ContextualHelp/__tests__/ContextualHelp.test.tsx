import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { restPropsTest } from '@local/tests';
import { useIcon } from '../../../hooks/useIcon';
import { ContextualHelp } from '..';

jest.mock('../../../hooks/useIcon');

describe('ContextualHelp', () => {
  restPropsTest((props) => <ContextualHelp id="contextual-help-test" {...props} />, 'div');

  it('should render an info trigger and open the tooltip', () => {
    render(<ContextualHelp id="contextual-help-test">Help content</ContextualHelp>);

    fireEvent.click(screen.getByRole('button', { name: 'More information' }));

    expect(screen.getByRole('tooltip')).toHaveTextContent('Help content');
  });

  it('should open the tooltip and call onToggle when uncontrolled', () => {
    const onToggle = jest.fn();
    render(
      <ContextualHelp id="contextual-help-test" onToggle={onToggle}>
        Help content
      </ContextualHelp>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'More information' }));

    expect(onToggle).toHaveBeenCalledWith(true);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Help content');
  });

  it('should use a custom accessible label', () => {
    render(
      <ContextualHelp id="contextual-help-test" label="What is a segment?">
        Help content
      </ContextualHelp>,
    );

    expect(screen.getByRole('button', { name: 'What is a segment?' })).toBeInTheDocument();
  });

  it('should use a custom icon name', () => {
    render(
      <ContextualHelp id="contextual-help-test" icon="help">
        Help content
      </ContextualHelp>,
    );

    expect(useIcon).toHaveBeenCalledWith('help');
  });

  it('should override icon size', () => {
    const { container } = render(
      <ContextualHelp id="contextual-help-test" icon={{ name: 'info', boxSize: 20 }}>
        Help content
      </ContextualHelp>,
    );

    expect(container.querySelector('svg')).toHaveAttribute('width', '20');
    expect(container.querySelector('svg')).toHaveAttribute('height', '20');
  });

  it('should forward size to the trigger button', () => {
    render(
      <ContextualHelp id="contextual-help-test" size="medium">
        Help content
      </ContextualHelp>,
    );

    expect(screen.getByRole('button')).toHaveClass('ControlButton--medium');
  });

  it('should apply tooltip placement', () => {
    render(
      <ContextualHelp id="contextual-help-test" isOpen placement="top">
        Help content
      </ContextualHelp>,
    );

    expect(screen.getByRole('tooltip')).toHaveClass('placement-top');
  });
});
