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
import { Sizes } from '../../../constants';
import Timeline from '../Timeline';

describe('Timeline', () => {
  classNamePrefixProviderTest(Timeline, 'Timeline');

  stylePropsTest(Timeline);

  restPropsTest(Timeline, 'ol');

  validHtmlAttributesTest(Timeline);

  ariaAttributesTest(Timeline);

  elementTypePropsTest(Timeline);

  it('should render with default props', () => {
    render(<Timeline>Item</Timeline>);
    const timeline = screen.getByRole('list');

    expect(timeline).toHaveClass('Timeline', 'Timeline--small');
  });

  it('should render with default element type ol', () => {
    render(<Timeline>Item</Timeline>);
    const timeline = screen.getByRole('list');

    expect(timeline.localName).toBe('ol');
  });

  it('should render children correctly', () => {
    render(<Timeline>Item</Timeline>);

    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  describe('size prop', () => {
    it.each(Object.entries(Sizes))('should apply %s size class', (_, sizeValue) => {
      render(<Timeline size={sizeValue}>Item</Timeline>);
      const timeline = screen.getByRole('list');

      expect(timeline).toHaveClass('Timeline', `Timeline--${sizeValue}`);
    });

    it('should apply responsive size classes when responsive size is provided', () => {
      render(<Timeline size={{ mobile: Sizes.SMALL, tablet: Sizes.MEDIUM, desktop: Sizes.LARGE }}>Item</Timeline>);
      const timeline = screen.getByRole('list');

      expect(timeline).toHaveClass(
        'Timeline',
        'Timeline--small',
        'Timeline--tablet--medium',
        'Timeline--desktop--large',
      );
    });

    it('should apply partial responsive size classes', () => {
      render(<Timeline size={{ mobile: Sizes.SMALL, tablet: Sizes.MEDIUM }}>Item</Timeline>);
      const timeline = screen.getByRole('list');

      expect(timeline).toHaveClass('Timeline', 'Timeline--small', 'Timeline--tablet--medium');
    });
  });
});
