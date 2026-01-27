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
import { ButtonLink } from '../../ButtonLink';
import PricingPlanHeader from '../PricingPlanHeader';

describe('PricingPlanHeader', () => {
  classNamePrefixProviderTest(PricingPlanHeader, 'PricingPlanHeader');

  stylePropsTest(PricingPlanHeader);

  restPropsTest(PricingPlanHeader, 'header');

  validHtmlAttributesTest(PricingPlanHeader);

  ariaAttributesTest(PricingPlanHeader);

  elementTypePropsTest(PricingPlanHeader);

  describe('should render individual props correctly', () => {
    it('should render title', () => {
      render(<PricingPlanHeader title="Test Title" />);
      const title = screen.getByText('Test Title');

      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('PricingPlanHeader__title');
    });

    it('should render title as ReactNode', () => {
      render(
        <PricingPlanHeader
          title={
            <span id="plan-title-test" data-testid="custom-title">
              Custom Title
            </span>
          }
        />,
      );
      const title = screen.getByText('Custom Title');

      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute('id', 'plan-title-test');
      expect(title.parentElement).toHaveClass('PricingPlanHeader__title');
    });

    it('should render subtitle', () => {
      render(<PricingPlanHeader subtitle="Test Subtitle" />);
      const subtitle = screen.getByText('Test Subtitle');

      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveClass('PricingPlanHeader__subtitle');
    });

    it('should render price', () => {
      render(<PricingPlanHeader price="123 EUR" />);
      const price = screen.getByText('123 EUR');

      expect(price).toBeInTheDocument();
      expect(price).toHaveClass('PricingPlanHeader__price');
    });

    it('should render badge', () => {
      render(<PricingPlanHeader badge="Badge" />);
      const badge = screen.getByText('Badge');

      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('PricingPlanHeader__badge');
    });

    it('should render badge as ReactNode', () => {
      render(<PricingPlanHeader badge={<span data-testid="custom-badge">Custom Badge</span>} />);
      const badge = screen.getByText('Custom Badge');

      expect(badge).toBeInTheDocument();
    });

    it('should render note', () => {
      render(<PricingPlanHeader note="Note text" />);
      const note = screen.getByText('Note text');

      expect(note).toBeInTheDocument();
      expect(note).toHaveClass('PricingPlanHeader__note');
    });

    it('should render action', () => {
      render(
        <PricingPlanHeader
          action={
            <ButtonLink href="#" size="large">
              Click me
            </ButtonLink>
          }
        />,
      );
      const button = screen.getByRole('button', { name: 'Click me' });

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('Button Button--primary Button--large');
    });

    it('should support aria-labelledby to achieve better accessibility', () => {
      render(
        <PricingPlanHeader
          title={<span id="plan-title">Premium Plan</span>}
          action={
            <ButtonLink href="#" size="large" id="plan-action" aria-labelledby="plan-action plan-title">
              Subscribe
            </ButtonLink>
          }
        />,
      );
      const title = screen.getByText('Premium Plan');
      // When using aria-labelledby, the accessible name becomes the referenced element's text
      const button = screen.getByRole('button', { name: 'Subscribe Premium Plan' });

      expect(title).toHaveAttribute('id', 'plan-title');
      expect(button).toHaveAttribute('aria-labelledby', 'plan-action plan-title');
    });
  });

  it('should render with default structure', () => {
    render(<PricingPlanHeader title="Sample" />);
    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('PricingPlanHeader');
    expect(header.firstElementChild).toHaveClass('PricingPlanHeader__content');
  });

  it('should render structure with badge', () => {
    render(<PricingPlanHeader title="Sample" badge="New" />);
    const header = screen.getByRole('banner');
    const badge = screen.getByText('New');

    expect(header).toBeInTheDocument();
    expect(header.children).toHaveLength(2);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('PricingPlanHeader__badge');
    expect(badge.nextElementSibling).toHaveClass('PricingPlanHeader__content');
  });
});
