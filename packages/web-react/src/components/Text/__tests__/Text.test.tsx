import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  sizeExtendedPropsTest,
  sizePropsTest,
  stylePropsTest,
  textAlignmentPropsTest,
  textColorPropsTest,
  textHyphensPropsTest,
  textIsBalancedPropsTest,
  textWordBreakPropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import {
  type FontWeightDictionaryType,
  type SizeExtendedDictionaryType,
  type SizesDictionaryType,
} from '../../../types';
import Text from '../Text';
import textPropsDataProvider from './textPropsDataProvider';

describe('Text', () => {
  classNamePrefixProviderTest(Text, 'typography-body-medium-regular');

  stylePropsTest(Text);

  sizePropsTest(Text);

  sizeExtendedPropsTest(Text);

  textAlignmentPropsTest(Text);

  textColorPropsTest(Text);

  textHyphensPropsTest(Text);

  textIsBalancedPropsTest(Text, 'text-wrap-pretty');

  textWordBreakPropsTest(Text);

  restPropsTest(Text, 'p');

  validHtmlAttributesTest(Text);

  ariaAttributesTest(Text);

  elementTypePropsTest(Text);

  it.each(textPropsDataProvider)('should have classname', (size, fontWeight, expectedClassName) => {
    render(
      <Text
        size={size as SizesDictionaryType as SizeExtendedDictionaryType}
        fontWeight={fontWeight as FontWeightDictionaryType}
      >
        Text
      </Text>,
    );

    expect(screen.getByText('Text')).toHaveClass(expectedClassName as string);
  });

  it('should correctly render children', () => {
    render(<Text>Text</Text>);

    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('should use deprecated emphasis as font weight fallback', () => {
    render(<Text emphasis="semibold">Text</Text>);

    expect(screen.getByText('Text')).toHaveClass('typography-body-medium-semibold');
  });

  it('should still apply italic when emphasis is italic', () => {
    render(<Text emphasis="italic">Text</Text>);

    expect(screen.getByText('Text')).toHaveClass('typography-body-medium-regular', 'text-italic');
  });

  it('should prefer fontWeight over deprecated emphasis', () => {
    render(
      <Text emphasis="italic" fontWeight="bold">
        Text
      </Text>,
    );

    expect(screen.getByText('Text')).toHaveClass('typography-body-medium-bold', 'text-italic');
  });

  it('should have text-italic classname when isItalic is set', () => {
    render(<Text isItalic>Text</Text>);

    expect(screen.getByText('Text')).toHaveClass('typography-body-medium-regular', 'text-italic');
  });
});
