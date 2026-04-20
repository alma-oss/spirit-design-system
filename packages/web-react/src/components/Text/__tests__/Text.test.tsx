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
import { type EmphasisDictionaryType, type SizeExtendedDictionaryType, type SizesDictionaryType } from '../../../types';
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

  it.each(textPropsDataProvider)('should have classname', (size, emphasis, expectedClassName) => {
    render(
      <Text
        size={size as SizesDictionaryType as SizeExtendedDictionaryType}
        emphasis={emphasis as EmphasisDictionaryType}
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
});
