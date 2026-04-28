import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { EmotionColors } from '../../../constants';
import type { IconBoxColorsType, IconBoxShapeType, SizeExtendedDictionaryType } from '../../../types';
import { pxToRem } from '../../../utils';
import { IconBoxShapesRadii, IconBoxSizes } from '../constants';
import IconBox from '../IconBox';

jest.mock('../../../hooks/useIcon');

const sizeTestCasesProvider = Object.entries(IconBoxSizes).map(([size, { iconSize, padding }]) => ({
  size,
  iconSize,
  padding: padding.replace('space-', ''),
}));

const shapeTestCasesProvider = Object.entries(IconBoxShapesRadii).map(([shape, radius]) => ({
  shape,
  radius,
}));

const colorTestCasesProvider = [
  {
    color: EmotionColors.INFORMATIVE,
    textColor: 'emotion-informative-basic',
    expectedBorder: 'emotion-informative-subtle',
  },
  {
    color: '01',
    textColor: 'accent-01-basic',
    expectedBorder: 'accent-01-subtle',
  },
  {
    color: EmotionColors.SUCCESS,
    textColor: 'emotion-success-basic',
    expectedBorder: 'emotion-success-subtle',
  },
];

describe('IconBox', () => {
  restPropsTest(IconBox, 'div');

  stylePropsTest(IconBox);

  validHtmlAttributesTest(IconBox);

  ariaAttributesTest(IconBox);

  elementTypePropsTest(IconBox);

  it('should render the icon', () => {
    render(<IconBox iconName="check" data-testid="IconBox" />);

    expect(screen.getByTestId('IconBox')).toBeInTheDocument();
  });

  it('should apply default props (border, color, size, radius)', () => {
    render(<IconBox iconName="check" data-testid="IconBox" />);
    const iconBox = screen.getByTestId('IconBox');

    expect(iconBox).toHaveClass('bg-emotion-informative-subtle');
    expect(iconBox).toHaveClass('border-emotion-informative-subtle border-solid border-100');
    expect(iconBox).toHaveClass('rounded-300');
    expect(iconBox).toHaveClass('text-emotion-informative-basic');
  });

  it('should render custom size icon', () => {
    render(<IconBox iconName="check" size="large" data-testid="IconBox" />);
    const iconBox = screen.getByTestId('IconBox');

    expect(iconBox.firstElementChild).toHaveAttribute('width', '28');
    expect(iconBox.firstElementChild).toHaveAttribute('height', '28');
  });

  it('should render with custom shape', () => {
    render(<IconBox iconName="check" shape="circle" data-testid="IconBox" />);

    expect(screen.getByTestId('IconBox')).toHaveClass('rounded-full');
  });

  it('should support custom elementType', () => {
    render(<IconBox iconName="check" elementType="section" data-testid="IconBox" />);

    expect(screen.getByTestId('IconBox')).toContainHTML('section');
  });

  it.each(sizeTestCasesProvider)('should render correct icon size and style for size "$size"', ({ size, iconSize }) => {
    render(<IconBox iconName="check" size={size as SizeExtendedDictionaryType} data-testid="IconBox" />);

    const iconBox = screen.getByTestId('IconBox');
    const icon = iconBox.firstElementChild;

    expect(icon).toHaveAttribute('width', `${iconSize}`);
    expect(icon).toHaveAttribute('height', `${iconSize}`);

    expect(iconBox).toHaveStyle({
      padding: 'calc(var(--spirit-local-padding) - var(--spirit-local-border-width, 0px)) !important',
    });
  });

  it.each(sizeTestCasesProvider)(
    'should render correct icon size and padding for size "$size" if has no border',
    ({ size, iconSize, padding }) => {
      render(
        <IconBox iconName="check" size={size as SizeExtendedDictionaryType} data-testid="IconBox" hasBorder={false} />,
      );

      const iconBox = screen.getByTestId('IconBox');
      const icon = iconBox.firstElementChild;

      expect(icon).toHaveAttribute('width', `${iconSize}`);
      expect(icon).toHaveAttribute('height', `${iconSize}`);

      expect(iconBox).toHaveClass(`p-${padding}`);
      expect(iconBox).toHaveStyle({
        padding: 'calc(var(--spirit-local-padding) - var(--spirit-local-border-width, 0px)) !important',
      });
    },
  );

  it.each(shapeTestCasesProvider)('should render correct shape class for shape "$shape"', ({ shape, radius }) => {
    render(<IconBox iconName="check" shape={shape as IconBoxShapeType} data-testid="IconBox" />);
    const iconBox = screen.getByTestId('IconBox');

    expect(iconBox.className).toContain(`rounded-${radius}`);
  });

  it.each(colorTestCasesProvider)(
    'should apply correct classes for color "$color"',
    ({ color, textColor, expectedBorder }) => {
      render(<IconBox iconName="check" color={color as IconBoxColorsType} data-testid="IconBox" />);
      const iconBox = screen.getByTestId('IconBox');

      expect(iconBox.className).toContain(`text-${textColor}`);
      expect(iconBox.className).toContain(`border-${expectedBorder}`);
    },
  );

  describe('responsive sizes', () => {
    it('should render correct icon size and styles for responsive size with all breakpoints', () => {
      render(
        <IconBox
          iconName="check"
          size={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}
          data-testid="IconBox"
        />,
      );

      const iconBox = screen.getByTestId('IconBox');
      const icon = iconBox.firstElementChild;

      expect(icon).toHaveAttribute('width', `${IconBoxSizes.small.iconSize}`);
      expect(icon).toHaveAttribute('height', `${IconBoxSizes.small.iconSize}`);

      expect(icon).toHaveStyle({
        '--spirit-icon-size-tablet': pxToRem(IconBoxSizes.medium.iconSize),
        '--spirit-icon-size-desktop': pxToRem(IconBoxSizes.large.iconSize),
      });

      expect(iconBox).toHaveStyle({
        padding: 'calc(var(--spirit-local-padding) - var(--spirit-local-border-width, 0px)) !important',
      });
    });

    it('should render correct icon size and styles for responsive size with partial breakpoints', () => {
      render(<IconBox iconName="check" size={{ mobile: 'small', desktop: 'large' }} data-testid="IconBox" />);

      const iconBox = screen.getByTestId('IconBox');
      const icon = iconBox.firstElementChild;

      expect(icon).toHaveAttribute('width', `${IconBoxSizes.small.iconSize}`);
      expect(icon).toHaveAttribute('height', `${IconBoxSizes.small.iconSize}`);

      expect(icon).toHaveStyle({
        '--spirit-icon-size-desktop': pxToRem(IconBoxSizes.large.iconSize),
      });

      expect(iconBox).toHaveStyle({
        padding: 'calc(var(--spirit-local-padding) - var(--spirit-local-border-width, 0px)) !important',
      });
    });

    it('should render correct icon size and padding for responsive size without border', () => {
      render(
        <IconBox
          iconName="check"
          size={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}
          hasBorder={false}
          data-testid="IconBox"
        />,
      );

      const iconBox = screen.getByTestId('IconBox');
      const icon = iconBox.firstElementChild;

      expect(icon).toHaveAttribute('width', `${IconBoxSizes.small.iconSize}`);
      expect(icon).toHaveAttribute('height', `${IconBoxSizes.small.iconSize}`);

      expect(icon).toHaveStyle({
        '--spirit-icon-size-tablet': pxToRem(IconBoxSizes.medium.iconSize),
        '--spirit-icon-size-desktop': pxToRem(IconBoxSizes.large.iconSize),
      });

      expect(iconBox).toHaveClass(`p-${IconBoxSizes.small.padding.replace('space-', '')}`);
      expect(iconBox).toHaveClass(`p-tablet-${IconBoxSizes.medium.padding.replace('space-', '')}`);
      expect(iconBox).toHaveClass(`p-desktop-${IconBoxSizes.large.padding.replace('space-', '')}`);
      expect(iconBox).toHaveStyle({
        padding: 'calc(var(--spirit-local-padding) - var(--spirit-local-border-width, 0px)) !important',
      });
    });

    it('should render correct icon size for responsive size with only tablet breakpoint', () => {
      render(<IconBox iconName="check" size={{ mobile: 'small', tablet: 'large' }} data-testid="IconBox" />);

      const iconBox = screen.getByTestId('IconBox');
      const icon = iconBox.firstElementChild;

      expect(icon).toHaveAttribute('width', `${IconBoxSizes.small.iconSize}`);
      expect(icon).toHaveAttribute('height', `${IconBoxSizes.small.iconSize}`);

      expect(icon).toHaveStyle({
        '--spirit-icon-size-tablet': pxToRem(IconBoxSizes.large.iconSize),
      });

      expect(iconBox).toHaveStyle({
        padding: 'calc(var(--spirit-local-padding) - var(--spirit-local-border-width, 0px)) !important',
      });
    });
  });
});
