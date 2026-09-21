import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { ComponentButtonColors, Sizes } from '../../../constants';
import { type SplitButtonColorType } from '../../../types';
import UncontrolledSplitButton from '../UncontrolledSplitButton';

jest.mock('../../../hooks/useIcon');

describe('SplitButton', () => {
  const splitButtonColors = Object.values(ComponentButtonColors).filter(
    (color) => color !== ComponentButtonColors.PLAIN,
  ) as SplitButtonColorType<void>[];

  const onClick = jest.fn();

  classNamePrefixProviderTest(UncontrolledSplitButton, 'SplitButton');

  stylePropsTest(UncontrolledSplitButton);

  restPropsTest(UncontrolledSplitButton, 'div');

  validHtmlAttributesTest(UncontrolledSplitButton);

  ariaAttributesTest(UncontrolledSplitButton);

  it('should have default classname', () => {
    render(
      <UncontrolledSplitButton
        id="uncontrolled-split-button-id"
        labelButton="Button"
        buttonOnClick={onClick}
        data-testid="test"
      >
        Content
      </UncontrolledSplitButton>,
    );

    expect(screen.getByTestId('test')).toHaveClass('SplitButton');
  });

  it('should render dropdown content', () => {
    render(
      <UncontrolledSplitButton id="uncontrolled-split-button-id" labelButton="Button" buttonOnClick={onClick}>
        Content
      </UncontrolledSplitButton>,
    );

    expect(screen.getByText('Content')).toHaveClass('DropdownPopover');
  });

  it.each(Object.values(Sizes))('should render size %s on buttons', (size) => {
    render(
      <UncontrolledSplitButton
        id="uncontrolled-split-button-id"
        buttonLabel="Button"
        buttonOnClick={onClick}
        size={size}
      >
        Content
      </UncontrolledSplitButton>,
    );

    expect(screen.getByText('Button')).toHaveClass(`Button--${size}`);
  });

  it.each(splitButtonColors)('should render color %s on buttons', (color) => {
    render(
      <UncontrolledSplitButton
        id="uncontrolled-split-button-id"
        buttonLabel="Button"
        buttonOnClick={onClick}
        color={color}
      >
        Content
      </UncontrolledSplitButton>,
    );

    expect(screen.getByText('Button')).toHaveClass(`Button--${color}`);
  });

  it('should render color and size on buttons', () => {
    render(
      <UncontrolledSplitButton
        id="uncontrolled-split-button-id"
        buttonLabel="Button"
        buttonOnClick={onClick}
        color="secondary"
        size="small"
      >
        Content
      </UncontrolledSplitButton>,
    );

    expect(screen.getByText('Button')).toHaveClass('Button--secondary');
    expect(screen.getByText('Button')).toHaveClass('Button--small');
  });

  it('should resolve required and optional component strings', () => {
    render(
      <UncontrolledSplitButton
        id="uncontrolled-split-button-id"
        labelButton={{ key: 'common.edit' }}
        buttonOnClick={onClick}
        strings={{ ariaLabelDropdown: 'More options' }}
      >
        Content
      </UncontrolledSplitButton>,
    );

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('More options')).toBeInTheDocument();
  });

  it('should prefer labelButton over deprecated buttonLabel', () => {
    render(
      <UncontrolledSplitButton
        id="uncontrolled-split-button-id"
        labelButton="Current"
        buttonLabel="Deprecated"
        buttonOnClick={onClick}
      >
        Content
      </UncontrolledSplitButton>,
    );

    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.queryByText('Deprecated')).not.toBeInTheDocument();
  });
});
