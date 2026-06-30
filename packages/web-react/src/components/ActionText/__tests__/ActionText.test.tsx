import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  sizePropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { TextColors } from '../../../constants';
import { type TextColorsDictionaryType } from '../../../types';
import ActionText from '../ActionText';

describe('ActionText', () => {
  classNamePrefixProviderTest(ActionText, 'typography-action-medium');

  stylePropsTest(ActionText);

  sizePropsTest(ActionText);

  restPropsTest(ActionText, 'span');

  validHtmlAttributesTest(ActionText);

  ariaAttributesTest(ActionText);

  elementTypePropsTest(ActionText);

  it('should render children', () => {
    render(<ActionText>Action label</ActionText>);

    expect(screen.getByText('Action label')).toBeInTheDocument();
  });

  it('should render small size class', () => {
    render(<ActionText size="small">Action label</ActionText>);

    expect(screen.getByText('Action label')).toHaveClass('typography-action-small');
  });

  it('should render large size with primary color', () => {
    render(
      <ActionText size="large" textColor="primary">
        Action label
      </ActionText>,
    );

    expect(screen.getByText('Action label')).toHaveClass('typography-action-large', 'text-primary');
  });

  it('should render anchor element', () => {
    render(
      <ActionText elementType="a" href="#">
        Action label
      </ActionText>,
    );

    expect(screen.getByRole('link', { name: 'Action label' })).toBeInTheDocument();
  });

  it.each(Object.values(TextColors))('should render text color %s', (textColor) => {
    render(
      <ActionText textColor={textColor as TextColorsDictionaryType} data-testid="action-text">
        Action label
      </ActionText>,
    );

    expect(screen.getByTestId('action-text')).toHaveClass(`text-${textColor}`);
  });
});
