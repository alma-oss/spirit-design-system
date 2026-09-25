import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import SkeletonItem from '../SkeletonItem';

describe('SkeletonItem', () => {
  it('should render a hidden skeleton line', () => {
    const { container } = render(<SkeletonItem />);
    const item = container.firstChild;

    expect(item).toHaveClass('Skeleton__item');
    expect(item).toHaveAttribute('aria-hidden', 'true');
  });
});
