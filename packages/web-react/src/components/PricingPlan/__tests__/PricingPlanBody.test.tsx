import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import PricingPlanBody from '../PricingPlanBody';

jest.mock('../../../hooks/useIcon');

describe('PricingPlanBody', () => {
  classNamePrefixProviderTest(PricingPlanBody, 'PricingPlanBody');

  stylePropsTest(PricingPlanBody);

  restPropsTest(PricingPlanBody, 'div');

  validHtmlAttributesTest(PricingPlanBody);

  ariaAttributesTest(PricingPlanBody);

  elementTypePropsTest(PricingPlanBody);

  describe('should render without side effects', () => {
    beforeEach(() => {
      render(<PricingPlanBody id="tier-1" description="Test description" />);
    });

    it('should render description', () => {
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('should render root with correct class', () => {
      expect(screen.getByText('Test description').parentElement).toHaveClass('PricingPlanBody');
    });

    it('should render empty feature list if none provided', () => {
      const featureList = screen.getByText('Test description').nextElementSibling;

      expect(featureList).toHaveClass('PricingPlanBody__featureList');
      expect(featureList?.localName).toBe('ul');
      expect(featureList?.children).toHaveLength(0);
    });
  });

  it('should render all features correctly', () => {
    const features = [
      { title: 'Feature 1', description: 'Description 1' },
      { title: 'Feature 2', description: 'Description 2' },
    ];

    render(<PricingPlanBody id="tier-1" features={features} />);

    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('should render features with correct structure', () => {
    const features = [
      { title: 'Feature 1', description: 'Description 1' },
      { title: 'Feature 2', description: 'Description 2' },
    ];

    render(<PricingPlanBody id="tier-1" features={features} />);

    const items = screen.getAllByRole('listitem', { hidden: true });

    expect(items).toHaveLength(features.length);

    items.forEach((item) => {
      const title = item.childNodes[0];
      const description = item.childNodes[1];

      expect(title).toHaveClass('PricingPlanBody__featureTitle');
      expect(title).not.toHaveClass('Tooltip');
      expect(description).toHaveClass('PricingPlanBody__featureDescription');
      expect(title.parentElement).toHaveClass('PricingPlanBody__featureItem');
    });
  });

  it('should render features with tooltips', () => {
    const features = [
      {
        title: 'Feature with tooltip',
        description: 'Description with tooltip',
        tooltipContent: 'Tooltip content',
      },
    ];

    render(<PricingPlanBody id="tier-1" features={features} />);

    const featureTitle = screen.getByText('Feature with tooltip').parentElement;
    const tooltipTrigger = screen.getByText('Feature with tooltip');
    const tooltipPopover = screen.getByRole('tooltip');

    expect(featureTitle).toHaveClass('Tooltip PricingPlanBody__featureTitle');
    expect(tooltipTrigger).toHaveClass('PricingPlanBody__featureTitleText text-underlined-dotted');
    expect(tooltipPopover).toHaveClass('TooltipPopover TooltipPopover--dismissible is-hidden');

    fireEvent.click(tooltipTrigger);

    expect(tooltipPopover).toHaveClass('TooltipPopover TooltipPopover--dismissible');
    expect(tooltipPopover).not.toHaveClass('is-hidden');
  });

  it('should not render tooltips if tooltipContent is undefined', () => {
    const features = [
      { title: 'Feature without tooltip', description: 'Description without tooltip', tooltipContent: undefined },
    ];

    render(<PricingPlanBody id="tier-1" features={features} />);

    const featureTitle = screen.getByText('Feature without tooltip').parentElement;

    expect(featureTitle).not.toHaveClass('Tooltip');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('should handle tooltip toggle state', () => {
    const features = [
      {
        title: 'Feature with tooltip',
        description: 'Description with tooltip',
        tooltipContent: 'Tooltip content',
      },
    ];

    render(<PricingPlanBody id="tier-1" features={features} />);

    const tooltipTrigger = screen.getByText('Feature with tooltip');
    const tooltipCloseButton = screen.getByRole('button', { name: 'Close' });

    fireEvent.click(tooltipTrigger);

    expect(screen.getByRole('tooltip')).not.toHaveClass('is-hidden');

    fireEvent.click(tooltipCloseButton);

    expect(screen.getByRole('tooltip')).toHaveClass('is-hidden');
  });
});
