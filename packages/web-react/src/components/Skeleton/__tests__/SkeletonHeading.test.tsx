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
import SkeletonHeading from '../SkeletonHeading';

describe('SkeletonHeading', () => {
  classNamePrefixProviderTest(SkeletonHeading, 'Skeleton');

  stylePropsTest(SkeletonHeading);

  restPropsTest(SkeletonHeading, 'div');

  validHtmlAttributesTest(SkeletonHeading);

  ariaAttributesTest(SkeletonHeading);

  elementTypePropsTest(SkeletonHeading);

  beforeEach(() => {
    render(<SkeletonHeading data-testid="SkeletonHeading" />);
  });

  it('should have default classname', () => {
    expect(screen.getByTestId('SkeletonHeading')).toHaveClass('Skeleton--heading');
  });

  it('should render default size class when size is not provided', () => {
    expect(screen.getByTestId('SkeletonHeading')).toHaveClass('Skeleton--medium');
  });

  it('should render 1 text child by default', () => {
    expect(screen.getByTestId('SkeletonHeading').children).toHaveLength(1);
  });

  it('should fall back to the default line count when lines is undefined', () => {
    render(<SkeletonHeading data-testid="SkeletonHeadingUndefinedLines" lines={undefined} />);

    expect(screen.getByTestId('SkeletonHeadingUndefinedLines').children).toHaveLength(1);
  });

  describe('with custom props', () => {
    beforeEach(() => {
      render(<SkeletonHeading data-testid="SkeletonHeadingCustom" lines={3} size="large" />);
    });

    it('should render custom size class when size is provided', () => {
      expect(screen.getByTestId('SkeletonHeadingCustom')).toHaveClass('Skeleton--large');
    });

    it('should render custom text children when lines is provided', () => {
      expect(screen.getByTestId('SkeletonHeadingCustom').children).toHaveLength(3);
    });
  });

  it('should apply width as a css variable', () => {
    render(<SkeletonHeading data-testid="SkeletonHeadingWidth" width={160} />);

    const skeleton = screen.getByTestId('SkeletonHeadingWidth');

    expect(skeleton).toHaveStyle({ '--spirit-skeleton-width': '10rem' });
    expect(skeleton).not.toHaveAttribute('width');
  });
});
