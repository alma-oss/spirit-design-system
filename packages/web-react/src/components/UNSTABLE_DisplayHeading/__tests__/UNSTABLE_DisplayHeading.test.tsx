import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  sizePropsTest,
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
import UNSTABLE_DisplayHeading from '../UNSTABLE_DisplayHeading';

describe('UNSTABLE_DisplayHeading', () => {
  classNamePrefixProviderTest(() => <UNSTABLE_DisplayHeading elementType="h1" />, 'typography-display-medium');

  stylePropsTest((props) => <UNSTABLE_DisplayHeading elementType="h1" {...props} />);

  sizePropsTest((props) => <UNSTABLE_DisplayHeading elementType="h1" {...props} />);

  textAlignmentPropsTest((props) => <UNSTABLE_DisplayHeading elementType="h1" {...props} />);

  textColorPropsTest((props) => <UNSTABLE_DisplayHeading elementType="h1" {...props} />);

  textHyphensPropsTest((props) => <UNSTABLE_DisplayHeading elementType="h1" {...props} />);

  textIsBalancedPropsTest((props) => <UNSTABLE_DisplayHeading elementType="h1" {...props} />, 'text-wrap-balance');

  textWordBreakPropsTest((props) => <UNSTABLE_DisplayHeading elementType="h1" {...props} />);

  restPropsTest((props) => <UNSTABLE_DisplayHeading elementType="h1" {...props} />, 'h1');

  validHtmlAttributesTest((props) => <UNSTABLE_DisplayHeading elementType="h1" {...props} />);

  ariaAttributesTest((props) => <UNSTABLE_DisplayHeading elementType="h1" {...props} />);

  elementTypePropsTest(UNSTABLE_DisplayHeading);

  it('should render children', () => {
    render(<UNSTABLE_DisplayHeading elementType="h1">Display heading</UNSTABLE_DisplayHeading>);

    expect(screen.getByRole('heading', { name: 'Display heading' })).toBeInTheDocument();
  });

  it('should render small size class', () => {
    render(
      <UNSTABLE_DisplayHeading elementType="h1" size="small">
        Display heading
      </UNSTABLE_DisplayHeading>,
    );

    expect(screen.getByRole('heading')).toHaveClass('typography-display-small');
  });

  it('should render large size with primary color', () => {
    render(
      <UNSTABLE_DisplayHeading elementType="h1" size="large" textColor="primary">
        Display heading
      </UNSTABLE_DisplayHeading>,
    );

    expect(screen.getByRole('heading')).toHaveClass('typography-display-large', 'text-primary');
  });

  it('should have text-italic classname when isItalic is set', () => {
    render(
      <UNSTABLE_DisplayHeading elementType="h1" isItalic>
        Display heading
      </UNSTABLE_DisplayHeading>,
    );

    expect(screen.getByRole('heading')).toHaveClass('typography-display-medium', 'text-italic');
  });

  it('should render paragraph element', () => {
    render(<UNSTABLE_DisplayHeading elementType="p">Display heading</UNSTABLE_DisplayHeading>);

    expect(screen.getByText('Display heading').tagName).toBe('P');
  });

  it.each(Object.values(TextColors))('should render text color %s', (textColor) => {
    render(
      <UNSTABLE_DisplayHeading elementType="h1" textColor={textColor as TextColorsDictionaryType}>
        Display heading
      </UNSTABLE_DisplayHeading>,
    );

    expect(screen.getByRole('heading')).toHaveClass(`text-${textColor}`);
  });
});
