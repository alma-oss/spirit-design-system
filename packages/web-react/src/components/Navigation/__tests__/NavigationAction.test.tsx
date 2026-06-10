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
import { Icon } from '../../Icon';
import NavigationAction from '../NavigationAction';

describe('NavigationAction', () => {
  classNamePrefixProviderTest(NavigationAction, 'NavigationAction');

  stylePropsTest(NavigationAction);

  restPropsTest(NavigationAction, 'a');

  validHtmlAttributesTest(NavigationAction);

  ariaAttributesTest(NavigationAction);

  elementTypePropsTest(NavigationAction);

  it('should have default classname', () => {
    render(<NavigationAction href="/">Content</NavigationAction>);

    const navigationAction = screen.getByRole('link');

    expect(navigationAction).toHaveClass('NavigationAction');
    expect(navigationAction).toHaveClass('NavigationAction--box');
  });

  it('should have selected classname', () => {
    render(
      <NavigationAction href="/" isSelected>
        Content
      </NavigationAction>,
    );

    expect(screen.getByRole('link')).toHaveClass('NavigationAction NavigationAction--selected');
  });

  it('should not set aria-current automatically when selected', () => {
    render(
      <NavigationAction href="/" isSelected>
        Content
      </NavigationAction>,
    );

    expect(screen.getByRole('link')).not.toHaveAttribute('aria-current');
  });

  it('should not set aria-current when not selected', () => {
    render(<NavigationAction href="/">Content</NavigationAction>);

    expect(screen.getByRole('link')).not.toHaveAttribute('aria-current');
  });

  it('should allow setting aria-current manually', () => {
    render(
      <NavigationAction href="/" aria-current="page">
        Content
      </NavigationAction>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
  });

  it('should apply the open visual state from aria-expanded', () => {
    render(
      <NavigationAction elementType="button" aria-expanded="true">
        Content
      </NavigationAction>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('should have disabled classname and correct elementType', () => {
    const { container } = render(
      <NavigationAction href="/" isDisabled>
        Content
      </NavigationAction>,
    );

    const disabledAction = container.querySelector('span.NavigationAction');

    expect(disabledAction).toHaveClass('NavigationAction NavigationAction--disabled');
    expect(disabledAction?.tagName).toBe('SPAN');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should render children', () => {
    render(<NavigationAction href="/">Content</NavigationAction>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should have correct className for pill variant', () => {
    render(
      <NavigationAction href="/" variant="pill">
        Content
      </NavigationAction>,
    );

    const navigationAction = screen.getByRole('link');

    expect(navigationAction).toHaveClass('NavigationAction');
    expect(navigationAction).toHaveClass('NavigationAction--pill');
  });

  it('should render start slot', () => {
    render(
      <NavigationAction href="/" startSlot={<span data-testid="start-slot">Start</span>}>
        Content
      </NavigationAction>,
    );

    expect(screen.getByTestId('start-slot')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('Start');
    expect(screen.getByRole('link')).toHaveTextContent('Content');
  });

  it('should render end slot', () => {
    render(
      <NavigationAction href="/" endSlot={<span data-testid="end-slot">End</span>}>
        Content
      </NavigationAction>,
    );

    expect(screen.getByTestId('end-slot')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('Content');
    expect(screen.getByRole('link')).toHaveTextContent('End');
  });

  it('should apply slot wrapper classnames', () => {
    render(
      <NavigationAction
        href="/"
        startSlot={<span data-testid="start-slot">Start</span>}
        endSlot={<span data-testid="end-slot">End</span>}
      >
        Content
      </NavigationAction>,
    );

    const link = screen.getByRole('link');

    expect(link.querySelectorAll('.NavigationAction__slot')).toHaveLength(2);
  });

  it('should not render slots when null is provided', () => {
    render(
      <NavigationAction href="/" startSlot={null} endSlot={null}>
        Content
      </NavigationAction>,
    );

    expect(screen.getByRole('link').querySelector('.NavigationAction__slot')).not.toBeInTheDocument();
  });

  it('should set default icon slot size to 20 when missing', () => {
    const { container } = render(
      <NavigationAction href="/" startSlot={<Icon name="profile" />}>
        Content
      </NavigationAction>,
    );

    const icon = container.querySelector('.NavigationAction__slot .Icon');

    expect(icon).toHaveStyle({
      '--spirit-icon-size': 'var(--spirit-icon-composition-size, 1.5rem)',
    });
  });

  it('should keep explicit icon slot size', () => {
    const { container } = render(
      <NavigationAction href="/" startSlot={<Icon name="profile" boxSize={16} />}>
        Content
      </NavigationAction>,
    );

    expect(container.querySelector('.NavigationAction__slot .Icon')).toHaveAttribute('width', '16');
  });
});
