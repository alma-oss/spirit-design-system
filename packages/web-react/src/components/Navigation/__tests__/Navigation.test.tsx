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
import { Direction } from '../../../constants';
import Navigation from '../Navigation';

const dataProvider = [
  {
    direction: Direction.HORIZONTAL,
    directionClassName: 'Navigation--horizontal',
  },
  {
    direction: Direction.VERTICAL,
    directionClassName: 'Navigation--vertical',
  },
  {
    direction: undefined,
    directionClassName: 'Navigation--horizontal',
  },
];

describe('Navigation', () => {
  classNamePrefixProviderTest(Navigation, 'Navigation');

  stylePropsTest(Navigation);

  restPropsTest(Navigation, 'nav');

  validHtmlAttributesTest(Navigation);

  ariaAttributesTest(Navigation);

  elementTypePropsTest(Navigation, 'div');

  describe.each(dataProvider)('when direction is $direction', ({ direction, directionClassName }) => {
    beforeEach(() => {
      render(
        <Navigation direction={direction}>
          <li>Content</li>
        </Navigation>,
      );
    });

    it('should have default classname', () => {
      const navigation = screen.getByRole('navigation');

      expect(navigation).toHaveClass('Navigation');
      expect(navigation).toHaveClass(directionClassName);
    });

    it('should render list and children', () => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should render children', () => {
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });
});
