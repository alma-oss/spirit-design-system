import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
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
import Heading from '../Heading';
import headingSizeDataProvider from './headingSizeDataProvider';

describe('Heading', () => {
  classNamePrefixProviderTest(() => <Heading elementType="h1" />, 'typography-heading-medium-bold');

  stylePropsTest((props) => <Heading elementType="h1" {...props} />);

  sizePropsTest((props) => <Heading elementType="h1" {...props} />);

  sizeExtendedPropsTest((props) => <Heading elementType="h1" {...props} />);

  textAlignmentPropsTest((props) => <Heading elementType="h1" {...props} />);

  textColorPropsTest((props) => <Heading elementType="h1" {...props} />);

  textHyphensPropsTest((props) => <Heading elementType="h1" {...props} />);

  textIsBalancedPropsTest((props) => <Heading elementType="h1" {...props} />, 'text-wrap-balance');

  textWordBreakPropsTest((props) => <Heading elementType="h1" {...props} />);

  restPropsTest((props) => <Heading elementType="h1" {...props} />, 'h1');

  validHtmlAttributesTest((props) => <Heading elementType="h1" {...props} />);

  ariaAttributesTest((props) => <Heading elementType="h1" {...props} />);

  elementTypePropsTest(Heading);

  it.each(headingSizeDataProvider)('should have classname', (size, fontWeight, expectedClassName) => {
    render(
      <Heading
        size={size as SizesDictionaryType<string> as SizeExtendedDictionaryType<string>}
        fontWeight={fontWeight as FontWeightDictionaryType}
        elementType="h1"
      />,
    );

    expect(screen.getByRole('heading')).toHaveClass(expectedClassName as string);
  });

  it('should use deprecated emphasis as font weight fallback', () => {
    render(
      <Heading elementType="h1" emphasis="semibold">
        Heading
      </Heading>,
    );

    expect(screen.getByRole('heading')).toHaveClass('typography-heading-medium-semibold');
  });

  it('should still apply italic when emphasis is italic', () => {
    render(
      <Heading elementType="h1" emphasis="italic">
        Heading
      </Heading>,
    );

    expect(screen.getByRole('heading')).toHaveClass('typography-heading-medium-regular', 'text-italic');
  });

  it('should prefer fontWeight over deprecated emphasis', () => {
    render(
      <Heading elementType="h1" emphasis="italic" fontWeight="bold">
        Heading
      </Heading>,
    );

    expect(screen.getByRole('heading')).toHaveClass('typography-heading-medium-bold', 'text-italic');
  });

  it('should have text-italic classname when isItalic is set', () => {
    render(
      <Heading elementType="h1" isItalic>
        Heading
      </Heading>,
    );

    expect(screen.getByRole('heading')).toHaveClass('typography-heading-medium-bold', 'text-italic');
  });
});
