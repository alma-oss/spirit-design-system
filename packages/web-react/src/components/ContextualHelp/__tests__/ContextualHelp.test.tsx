import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { restPropsTest, stylePropsTest } from '@local/tests';
import { ContextPropsProvider } from '../../../context';
import { useIcon } from '../../../hooks/useIcon';
import { ContextualHelp } from '..';

jest.mock('../../../hooks/useIcon');

describe('ContextualHelp', () => {
  stylePropsTest((props) => <ContextualHelp {...props}>Help content</ContextualHelp>);

  restPropsTest((props) => <ContextualHelp {...props}>Help content</ContextualHelp>, 'div');

  it('should render an info trigger and open the tooltip', () => {
    render(<ContextualHelp>Help content</ContextualHelp>);

    fireEvent.click(screen.getByRole('button', { name: 'More information' }));

    expect(screen.getByRole('tooltip')).toHaveTextContent('Help content');
  });

  it('should apply tooltip placement', () => {
    render(<ContextualHelp placement="top">Help content</ContextualHelp>);

    fireEvent.click(screen.getByRole('button', { name: 'More information' }));

    expect(screen.getByRole('tooltip')).toHaveClass('placement-top');
  });

  it('should apply the trigger size', () => {
    render(<ContextualHelp size="medium">Help content</ContextualHelp>);

    expect(screen.getByRole('button', { name: 'More information' })).toHaveClass('ControlButton--medium');
  });

  it('should use a custom accessible label', () => {
    render(<ContextualHelp label="More information about Languages">Help content</ContextualHelp>);

    expect(screen.getByRole('button', { name: 'More information about Languages' })).toBeInTheDocument();
  });

  it('should use custom icon props', () => {
    const { container } = render(
      <ContextualHelp iconProps={{ name: 'help', boxSize: 20 }}>Help content</ContextualHelp>,
    );

    expect(useIcon).toHaveBeenCalledWith('help');
    expect(container.querySelector('svg')).toHaveAttribute('width', '20');
    expect(container.querySelector('svg')).toHaveAttribute('height', '20');
  });

  it('should disable the trigger when the field is disabled', () => {
    render(
      <ContextPropsProvider value={{ isDisabled: true }}>
        <ContextualHelp>Help content</ContextualHelp>
      </ContextPropsProvider>,
    );

    expect(screen.getByRole('button', { name: 'More information' })).toBeDisabled();
  });

  it('should use the tooltip id from context', () => {
    render(
      <ContextPropsProvider value={{ contextualHelp: { id: 'languages-help' } }}>
        <ContextualHelp>Help content</ContextualHelp>
      </ContextPropsProvider>,
    );

    expect(screen.getByRole('button', { name: 'More information' })).toHaveAttribute('id', 'languages-help');
  });

  it('should generate an id when used standalone', () => {
    render(<ContextualHelp>Help content</ContextualHelp>);

    expect(screen.getByRole('button', { name: 'More information' })).toHaveAttribute('id');
  });
});
