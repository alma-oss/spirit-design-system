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
import { ControlButton } from '../../ControlButton';
import { Dropdown, DropdownPopover, DropdownTrigger } from '../../Dropdown';
import { Tag } from '../../Tag';
import UNSTABLE_SplitTag from '../UNSTABLE_SplitTag';

describe('UNSTABLE_SplitTag', () => {
  classNamePrefixProviderTest(UNSTABLE_SplitTag, 'UNSTABLE_SplitTag');

  stylePropsTest(UNSTABLE_SplitTag);

  restPropsTest(UNSTABLE_SplitTag, 'div');

  validHtmlAttributesTest(UNSTABLE_SplitTag);

  ariaAttributesTest(UNSTABLE_SplitTag);

  it('should have default classname', () => {
    render(<UNSTABLE_SplitTag data-testid="test" />);

    expect(screen.getByTestId('test')).toHaveClass('UNSTABLE_SplitTag');
  });

  it('should render text children', () => {
    render(<UNSTABLE_SplitTag>Content</UNSTABLE_SplitTag>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should pass tag props to nested Tags and ControlButtons as defaults', () => {
    render(
      <UNSTABLE_SplitTag color="selected" isDisabled isSubtle size="large">
        <Tag>Prague</Tag>
        <Tag elementType="button">+5 km</Tag>
        <Tag elementType="button" aria-label="Remove Prague">
          <ControlButton elementType="span" aria-hidden="true" isSymmetrical />
        </Tag>
      </UNSTABLE_SplitTag>,
    );

    expect(screen.getByText('Prague')).toHaveClass('Tag--selected', 'Tag--large', 'Tag--subtle', 'disabled');
    expect(screen.getByRole('button', { name: '+5 km' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Remove Prague' })).toHaveClass(
      'Tag--selected',
      'Tag--large',
      'disabled',
    );
    expect(screen.getByRole('button', { name: 'Remove Prague' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Remove Prague' }).querySelector('.ControlButton')).toHaveClass(
      'ControlButton--large',
      'disabled',
    );
    expect(screen.getByRole('button', { name: 'Remove Prague' }).querySelector('.ControlButton')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('should allow nested Tags and ControlButtons to override split tag defaults', () => {
    render(
      <UNSTABLE_SplitTag color="selected" isDisabled isSubtle size="large">
        <Tag color="neutral" isDisabled={false} isSubtle={false} size="small">
          Prague
        </Tag>
        <Tag elementType="button" aria-label="Remove Prague" isDisabled={false}>
          <ControlButton elementType="span" aria-hidden="true" isDisabled={false} isSymmetrical size="xsmall" />
        </Tag>
      </UNSTABLE_SplitTag>,
    );

    expect(screen.getByText('Prague')).toHaveClass('Tag--neutral', 'Tag--small');
    expect(screen.getByText('Prague')).not.toHaveClass('Tag--selected', 'Tag--large', 'Tag--subtle', 'disabled');
    expect(screen.getByRole('button', { name: 'Remove Prague' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Remove Prague' }).querySelector('.ControlButton')).toHaveClass(
      'ControlButton--xsmall',
    );
    expect(screen.getByRole('button', { name: 'Remove Prague' })).not.toHaveClass('ControlButton--large', 'disabled');
    expect(screen.getByRole('button', { name: 'Remove Prague' }).querySelector('.ControlButton')).not.toHaveClass(
      'ControlButton--large',
      'disabled',
    );
  });

  it('should keep remove action on the Tag segment', () => {
    const handleRemove = jest.fn();

    render(
      <UNSTABLE_SplitTag>
        <Tag elementType="button" aria-label="Remove Prague" onClick={handleRemove}>
          <ControlButton elementType="span" aria-hidden="true" isSymmetrical />
        </Tag>
      </UNSTABLE_SplitTag>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Remove Prague' }));

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Remove Prague' }).querySelector('.ControlButton')?.tagName).toBe('SPAN');
    expect(screen.getByRole('button', { name: 'Remove Prague' }).querySelector('button')).not.toBeInTheDocument();
  });

  it('should render a DropdownTrigger with Tag as a button segment', () => {
    render(
      <UNSTABLE_SplitTag>
        <Tag>Prague</Tag>
        <Dropdown id="radius-dropdown" isOpen={false} onToggle={jest.fn()}>
          <DropdownTrigger elementType={Tag}>+5 km</DropdownTrigger>
          <DropdownPopover>Radius options</DropdownPopover>
        </Dropdown>
      </UNSTABLE_SplitTag>,
    );

    expect(screen.getByRole('button', { name: '+5 km' })).toHaveClass('Tag');
  });
});
