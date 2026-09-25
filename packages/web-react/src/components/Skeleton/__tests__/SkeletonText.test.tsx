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
import SkeletonText from '../SkeletonText';

describe('SkeletonText', () => {
  classNamePrefixProviderTest(SkeletonText, 'Skeleton');

  stylePropsTest(SkeletonText);

  restPropsTest(SkeletonText, 'div');

  validHtmlAttributesTest(SkeletonText);

  ariaAttributesTest(SkeletonText);

  elementTypePropsTest(SkeletonText);

  beforeEach(() => {
    render(<SkeletonText data-testid="SkeletonText" />);
  });

  it('should have default classname', () => {
    expect(screen.getByTestId('SkeletonText')).toHaveClass('Skeleton--text');
  });

  it('should render default size class when size is not provided', () => {
    expect(screen.getByTestId('SkeletonText')).toHaveClass('Skeleton--medium');
  });

  it('should render 1 text child by default', () => {
    expect(screen.getByTestId('SkeletonText').children).toHaveLength(1);
  });

  it('should fall back to the default line count when lines is undefined', () => {
    render(<SkeletonText data-testid="SkeletonTextUndefinedLines" lines={undefined} />);

    expect(screen.getByTestId('SkeletonTextUndefinedLines').children).toHaveLength(1);
  });

  describe('with custom props', () => {
    beforeEach(() => {
      render(<SkeletonText data-testid="SkeletonTextCustom" lines={3} size="large" />);
    });

    it('should render custom size class when size is provided', () => {
      expect(screen.getByTestId('SkeletonTextCustom')).toHaveClass('Skeleton--large');
    });

    it('should render custom text children when lines is provided', () => {
      expect(screen.getByTestId('SkeletonTextCustom').children).toHaveLength(3);
    });
  });

  it('should apply width as a css variable', () => {
    render(<SkeletonText data-testid="SkeletonTextWidth" width="60%" />);

    const skeleton = screen.getByTestId('SkeletonTextWidth');

    expect(skeleton).toHaveStyle({ '--spirit-skeleton-width': '60%' });
    expect(skeleton).not.toHaveAttribute('width');
  });
});
