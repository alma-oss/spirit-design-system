import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import Toast from '../Toast';

const restorePrototypeProperty = <T extends keyof HTMLElement>(
  property: T,
  originalValue: HTMLElement[T] | undefined,
) => {
  if (typeof originalValue === 'undefined') {
    delete (HTMLElement.prototype as unknown as Record<string, unknown>)[property as string];
  } else {
    Object.defineProperty(HTMLElement.prototype, property, {
      configurable: true,
      value: originalValue,
    });
  }
};

describe('Toast', () => {
  classNamePrefixProviderTest(Toast, 'Toast');

  stylePropsTest(Toast);

  restPropsTest(Toast, 'div');

  validHtmlAttributesTest(Toast);

  ariaAttributesTest(Toast);

  it('should render with default alignments', () => {
    const dom = render(<Toast />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element).toHaveClass('Toast Toast--center Toast--bottom');
    expect(element).toHaveAttribute('popover', 'manual');
    expect(element).toHaveAttribute('role', 'log');
  });

  it('should call showPopover on mount when supported and popover is closed', () => {
    const showPopover = jest.fn();
    const originalShowPopover = HTMLElement.prototype.showPopover;
    const originalMatches = HTMLElement.prototype.matches;

    Object.defineProperty(HTMLElement.prototype, 'showPopover', {
      configurable: true,
      value: showPopover,
    });
    Object.defineProperty(HTMLElement.prototype, 'matches', {
      configurable: true,
      value: jest.fn().mockReturnValue(false),
    });

    render(<Toast />);

    expect(showPopover).toHaveBeenCalledTimes(1);

    restorePrototypeProperty('showPopover', originalShowPopover);
    restorePrototypeProperty('matches', originalMatches);
  });

  it('should not call showPopover on mount when popover is already open', () => {
    const showPopover = jest.fn();
    const originalShowPopover = HTMLElement.prototype.showPopover;
    const originalMatches = HTMLElement.prototype.matches;

    Object.defineProperty(HTMLElement.prototype, 'showPopover', {
      configurable: true,
      value: showPopover,
    });
    Object.defineProperty(HTMLElement.prototype, 'matches', {
      configurable: true,
      value: jest.fn().mockReturnValue(true),
    });

    render(<Toast />);

    expect(showPopover).not.toHaveBeenCalled();

    restorePrototypeProperty('showPopover', originalShowPopover);
    restorePrototypeProperty('matches', originalMatches);
  });

  it('should render with custom alignments', () => {
    const dom = render(<Toast alignmentX="left" alignmentY="top" />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element).toHaveClass('Toast Toast--left Toast--top');
  });

  it('should render with responsive alignments', () => {
    const dom = render(
      <Toast
        alignmentX={{ mobile: 'right', tablet: 'center', desktop: 'left' }}
        alignmentY={{ mobile: 'top', tablet: 'bottom', desktop: 'top' }}
      />,
    );

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element).toHaveClass(
      'Toast Toast--desktop--left Toast--tablet--center Toast--right Toast--desktop--top Toast--tablet--bottom Toast--top',
    );
  });
});
