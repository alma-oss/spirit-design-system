import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  staticPropsTest,
  stylePropsTest,
  textAlignmentPropsTest,
  textColorPropsTest,
  textHyphensPropsTest,
  textIsBalancedPropsTest,
  textWordBreakPropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { TextColors } from '../../../constants';
import { type TextColorsDictionaryType } from '../../../types';
import UNSTABLE_EyebrowText from '../UNSTABLE_EyebrowText';

describe('UNSTABLE_EyebrowText', () => {
  classNamePrefixProviderTest(UNSTABLE_EyebrowText, 'typography-eyebrow');

  stylePropsTest(UNSTABLE_EyebrowText);

  textAlignmentPropsTest(UNSTABLE_EyebrowText);

  textColorPropsTest(UNSTABLE_EyebrowText);

  textHyphensPropsTest(UNSTABLE_EyebrowText);

  textIsBalancedPropsTest(UNSTABLE_EyebrowText, 'text-wrap-balance');

  textWordBreakPropsTest(UNSTABLE_EyebrowText);

  restPropsTest(UNSTABLE_EyebrowText, 'p');

  validHtmlAttributesTest(UNSTABLE_EyebrowText);

  ariaAttributesTest(UNSTABLE_EyebrowText);

  elementTypePropsTest(UNSTABLE_EyebrowText);

  staticPropsTest(UNSTABLE_EyebrowText, 'UNSTABLE_EyebrowText');

  it('should render children', () => {
    render(<UNSTABLE_EyebrowText>EyebrowText</UNSTABLE_EyebrowText>);

    expect(screen.getByText('EyebrowText')).toBeInTheDocument();
  });

  it('should render a paragraph by default', () => {
    render(<UNSTABLE_EyebrowText>EyebrowText</UNSTABLE_EyebrowText>);

    expect(screen.getByText('EyebrowText').tagName).toBe('P');
    expect(screen.getByText('EyebrowText')).toHaveClass('typography-eyebrow');
    expect(screen.getByText('EyebrowText').className).not.toMatch(/\btext-/);
  });

  it('should render a span', () => {
    render(<UNSTABLE_EyebrowText elementType="span">EyebrowText</UNSTABLE_EyebrowText>);

    expect(screen.getByText('EyebrowText').tagName).toBe('SPAN');
  });

  it('should render centered alignment', () => {
    render(<UNSTABLE_EyebrowText textAlignment="center">EyebrowText</UNSTABLE_EyebrowText>);

    expect(screen.getByText('EyebrowText')).toHaveClass('typography-eyebrow', 'text-center');
  });

  it.each(Object.values(TextColors))('should render text color %s', (textColor) => {
    render(<UNSTABLE_EyebrowText textColor={textColor as TextColorsDictionaryType}>EyebrowText</UNSTABLE_EyebrowText>);

    expect(screen.getByText('EyebrowText')).toHaveClass('typography-eyebrow', `text-${textColor}`);
  });
});
