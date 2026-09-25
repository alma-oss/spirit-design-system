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
import SkeletonShape from '../SkeletonShape';

describe('SkeletonShape', () => {
  classNamePrefixProviderTest(SkeletonShape, 'Skeleton');

  stylePropsTest(SkeletonShape);

  restPropsTest(SkeletonShape, 'div');

  validHtmlAttributesTest(SkeletonShape);

  ariaAttributesTest(SkeletonShape);

  elementTypePropsTest(SkeletonShape);

  beforeEach(() => {
    render(<SkeletonShape width={100} height={100} data-testid="SkeletonShape" />);
  });

  it('should have default classname', () => {
    expect(screen.getByTestId('SkeletonShape')).toHaveClass('Skeleton--shape');
  });

  it('should apply width and height as css variables', () => {
    render(<SkeletonShape data-testid="SkeletonShapeSize" width={100} height={100} />);

    const skeleton = screen.getByTestId('SkeletonShapeSize');

    expect(skeleton).toHaveStyle({
      '--spirit-skeleton-shape-height': '6.25rem',
      '--spirit-skeleton-shape-width': '6.25rem',
    });
    expect(skeleton).not.toHaveAttribute('width');
    expect(skeleton).not.toHaveAttribute('height');
  });
});
