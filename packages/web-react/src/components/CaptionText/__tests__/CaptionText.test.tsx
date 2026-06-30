import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { TextColors } from '../../../constants';
import { type TextColorsDictionaryType } from '../../../types';
import CaptionText from '../CaptionText';

describe('CaptionText', () => {
  classNamePrefixProviderTest(CaptionText, 'typography-caption');

  stylePropsTest(CaptionText);

  restPropsTest(CaptionText, 'span');

  validHtmlAttributesTest(CaptionText);

  ariaAttributesTest(CaptionText);

  elementTypePropsTest(CaptionText);

  it('should render children', () => {
    render(<CaptionText>Caption label</CaptionText>);

    expect(screen.getByText('Caption label')).toBeInTheDocument();
  });

  it('should render with primary color', () => {
    render(
      <CaptionText textColor="primary" data-testid="caption-text">
        Caption label
      </CaptionText>,
    );

    expect(screen.getByTestId('caption-text')).toHaveClass('typography-caption', 'text-primary');
  });

  it('should render anchor element', () => {
    render(
      <CaptionText elementType="a" href="#">
        Caption label
      </CaptionText>,
    );

    expect(screen.getByRole('link', { name: 'Caption label' })).toBeInTheDocument();
  });

  it.each(Object.values(TextColors))('should render text color %s', (textColor) => {
    render(
      <CaptionText textColor={textColor as TextColorsDictionaryType} data-testid="caption-text">
        Caption label
      </CaptionText>,
    );

    expect(screen.getByTestId('caption-text')).toHaveClass(`text-${textColor}`);
  });
});
