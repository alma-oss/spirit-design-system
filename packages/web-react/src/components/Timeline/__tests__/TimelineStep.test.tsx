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
import TimelineStep from '../TimelineStep';

describe('TimelineStep', () => {
  classNamePrefixProviderTest(TimelineStep, 'TimelineStep');

  stylePropsTest(TimelineStep);

  restPropsTest(TimelineStep, 'li');

  validHtmlAttributesTest(TimelineStep);

  ariaAttributesTest(TimelineStep);

  elementTypePropsTest(TimelineStep);

  it('should render with default props', () => {
    render(<TimelineStep>Content</TimelineStep>);

    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveClass('TimelineStep');
  });

  it('should render with default element type li', () => {
    render(<TimelineStep>Content</TimelineStep>);
    const step = screen.getByRole('listitem');

    expect(step.localName).toBe('li');
  });

  it('should render children correctly', () => {
    render(<TimelineStep>Content</TimelineStep>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
