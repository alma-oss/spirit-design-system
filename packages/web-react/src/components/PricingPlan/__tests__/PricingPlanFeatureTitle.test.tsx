import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React, { type ComponentProps } from 'react';
import { classNamePrefixProviderTest, validHtmlAttributesTest } from '@local/tests';
import { type PricingPlanFeature } from '../../../types/pricingPlan';
import PricingPlanFeatureTitle from '../PricingPlanFeatureTitle';
import '@local/tests/mocks/dialog';

jest.mock('../../../hooks/useIcon');

const PricingPlanFeatureTitleWithRequiredProps = (props: Partial<ComponentProps<typeof PricingPlanFeatureTitle>>) => (
  <PricingPlanFeatureTitle feature={{ title: 'Test Feature' }} featureId="tier-1-feature-1" {...props} />
);

describe('PricingPlanFeatureTitle', () => {
  classNamePrefixProviderTest(PricingPlanFeatureTitleWithRequiredProps, 'PricingPlanBody__featureTitle');

  validHtmlAttributesTest(PricingPlanFeatureTitleWithRequiredProps);

  describe('should render basic feature without additional information', () => {
    const feature: PricingPlanFeature = { title: 'Basic Feature' };

    beforeEach(() => {
      render(<PricingPlanFeatureTitle feature={feature} featureId="tier-1-feature-1" />);
    });

    it('should render the feature title', () => {
      expect(screen.getByText('Basic Feature')).toBeInTheDocument();
    });

    it('should not render tooltip trigger or modal button', () => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should render inside div element with correct styling', () => {
      const title = screen.getByText('Basic Feature');
      const titleElement = title.parentNode;

      expect(title).toHaveAttribute('id', 'tier-1-feature-1-title');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveClass('PricingPlanBody__featureTitle');
    });
  });

  describe('should render feature with tooltip information', () => {
    const feature: PricingPlanFeature = {
      title: 'Feature with Tooltip',
      tooltipContent: 'This feature provides helpful information in a tooltip',
    };

    beforeEach(() => {
      render(<PricingPlanFeatureTitle feature={feature} featureId="tier-1-feature-2" />);
    });

    it('should render the feature title as a clickable button', () => {
      const titleButton = screen.getByRole('button', { name: 'Feature with Tooltip' });

      expect(titleButton).toBeInTheDocument();
      expect(titleButton).toHaveClass('text-underlined-dotted');
    });

    it('should render tooltip popover (initially hidden)', () => {
      const tooltip = screen.getByRole('tooltip');

      expect(tooltip).toHaveClass('is-hidden');
    });

    it('should show tooltip with additional information on click', () => {
      const trigger = screen.getByRole('button', { name: 'Feature with Tooltip' });
      const tooltip = screen.getByRole('tooltip');

      fireEvent.click(trigger);

      expect(tooltip).not.toHaveClass('is-hidden');
      expect(tooltip).toHaveTextContent('This feature provides helpful information in a tooltip');
    });

    it('should hide tooltip on close button click', () => {
      const trigger = screen.getByRole('button', { name: 'Feature with Tooltip' });
      const closeButton = screen.getByRole('button', { name: 'close' });
      const tooltip = screen.getByRole('tooltip');

      fireEvent.click(trigger);

      expect(tooltip).not.toHaveClass('is-hidden');

      fireEvent.click(closeButton);

      expect(tooltip).toHaveClass('is-hidden');
    });

    it('should have correct tooltip ID', () => {
      const trigger = screen.getByRole('button', { name: 'Feature with Tooltip' });

      expect(trigger).toHaveAttribute('id', 'tier-1-feature-2-tooltip');
    });
  });

  describe('should render feature with modal information', () => {
    const feature: PricingPlanFeature = {
      title: 'Feature with Modal',
      modalContent: 'This feature opens a modal with detailed information and additional content.',
    };

    beforeEach(() => {
      render(<PricingPlanFeatureTitle feature={feature} featureId="tier-1-feature-3" />);
    });

    it('should render the feature title as a clickable button', () => {
      const titleButton = screen.getByRole('button', { name: 'Feature with Modal' });

      expect(titleButton).toBeInTheDocument();
      expect(titleButton).toHaveClass('text-underlined-dotted');
    });

    it('should not render tooltip', () => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('should open modal with detailed information on click', () => {
      const trigger = screen.getByRole('button', { name: 'Feature with Modal' });

      fireEvent.click(trigger);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Feature with Modal' })).toBeInTheDocument();
      expect(
        screen.getByText('This feature opens a modal with detailed information and additional content.'),
      ).toBeInTheDocument();
    });

    it('should have correct modal ID', () => {
      const trigger = screen.getByRole('button', { name: 'Feature with Modal' });

      fireEvent.click(trigger);

      const modal = screen.getByRole('dialog');

      expect(modal).toHaveAttribute('id', 'tier-1-feature-3-modal');
    });
  });

  describe('should render feature with description', () => {
    const feature: PricingPlanFeature = {
      title: 'Feature with Description',
      description: 'This feature includes a description for additional context.',
    };

    beforeEach(() => {
      render(<PricingPlanFeatureTitle feature={feature} featureId="tier-1-feature-4" />);
    });

    it('should render the feature title', () => {
      expect(screen.getByText('Feature with Description')).toBeInTheDocument();
    });

    it('should render as basic feature when only description is provided', () => {
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('should prioritize modal over tooltip when both are provided', () => {
    const feature: PricingPlanFeature = {
      title: 'Feature with Both',
      tooltipContent: 'This should not be shown',
      modalContent: 'This should be shown in modal',
    };

    beforeEach(() => {
      render(<PricingPlanFeatureTitle feature={feature} featureId="tier-1-feature-5" />);
    });

    it('should render modal variant instead of tooltip', () => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

      const trigger = screen.getByRole('button', { name: 'Feature with Both' });
      fireEvent.click(trigger);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('This should be shown in modal')).toBeInTheDocument();
    });
  });
});
