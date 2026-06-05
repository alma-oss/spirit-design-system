import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { Direction } from '../../../constants';
import { type ScrollViewDirectionType, type ScrollViewOverflowDecoratorsType } from '../../../types';
import {
  SCROLL_CANCEL_DELAY,
  SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_END,
  SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_END,
} from '../constants';
import ScrollView from '../ScrollView';

jest.mock('../../../hooks/useIcon');

describe('ScrollView', () => {
  classNamePrefixProviderTest(ScrollView, 'ScrollView');

  stylePropsTest((props) => <ScrollView {...props} />);

  restPropsTest(ScrollView, 'div');

  validHtmlAttributesTest(ScrollView);

  ariaAttributesTest(ScrollView);

  it('should render children', () => {
    render(<ScrollView>Content</ScrollView>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should have correct className', () => {
    render(<ScrollView data-testid="scroll-test">Content</ScrollView>);

    expect(screen.getByTestId('scroll-test')).toHaveClass('ScrollView');
  });

  it('should have correct direction className', () => {
    render(<ScrollView data-testid="scroll-test">Content</ScrollView>);

    expect(screen.getByTestId('scroll-test')).toHaveClass('ScrollView');
  });

  it.each([['vertical'], ['horizontal']])('should have correct direction className %s', (direction) => {
    render(
      <ScrollView direction={direction as ScrollViewDirectionType} data-testid="scroll-test">
        Content
      </ScrollView>,
    );

    expect(screen.getByTestId('scroll-test')).toHaveClass(`ScrollView ScrollView--${direction}`);
  });

  it('should have viewport element', () => {
    render(<ScrollView data-testid="scroll-test">Content</ScrollView>);

    expect(screen.getByTestId('scroll-test').firstChild).toHaveClass('ScrollView__viewport');
  });

  it('should have tabindex on viewport element', () => {
    render(<ScrollView data-testid="scroll-test">Content</ScrollView>);

    expect(screen.getByTestId('scroll-test').firstChild).toHaveAttribute('tabindex', '0');
  });

  it('should have content element', () => {
    render(<ScrollView>Content</ScrollView>);

    expect(screen.getByText('Content')).toHaveClass('ScrollView__content');
  });

  it('should have decorators element', () => {
    render(<ScrollView data-testid="scroll-test">Content</ScrollView>);

    expect(screen.getByTestId('scroll-test').lastChild).toHaveClass('ScrollView__overflowDecorators');
  });

  it('should have aria-hidden on decorators element', () => {
    render(<ScrollView data-testid="scroll-test">Content</ScrollView>);

    expect(screen.getByTestId('scroll-test').lastChild).toHaveAttribute('aria-hidden', 'true');
  });

  it.each([['borders'], ['shadows'], ['both']])('should have correct decorator class for %s', (decorator) => {
    render(
      <ScrollView overflowDecorators={decorator as ScrollViewOverflowDecoratorsType} data-testid="scroll-test">
        Content
      </ScrollView>,
    );

    const expectedClass =
      decorator === 'both'
        ? 'ScrollView__overflowDecorators--shadows ScrollView__overflowDecorators--borders'
        : `ScrollView__overflowDecorators--${decorator}`;

    expect(screen.getByTestId('scroll-test').lastChild).toHaveClass(expectedClass);
  });

  it('should have correct className when scrollbar is disabled', () => {
    render(
      <ScrollView isScrollbarDisabled data-testid="scroll-test">
        Content
      </ScrollView>,
    );

    expect(screen.getByTestId('scroll-test')).toHaveClass('ScrollView ScrollView--scrollbarDisabled');
  });

  it('should render controls when hasControls is true', () => {
    render(
      <ScrollView hasControls data-testid="scroll-test">
        Content
      </ScrollView>,
    );

    expect(screen.getByTestId('scroll-test').lastElementChild).toHaveClass('ScrollView__controls');
  });

  it.each([
    {
      direction: Direction.HORIZONTAL,
      scrollStep: 100,
      contentStyle: { width: '1000px' },
      controlLabel: SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_END,
      viewportProps: {
        scrollLeft: 0,
        scrollWidth: 1000,
        clientWidth: 500,
      },
      expectedScroll: { left: 100 },
    },
    {
      direction: Direction.VERTICAL,
      scrollStep: 80,
      contentStyle: { height: '1000px' },
      controlLabel: SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_END,
      viewportProps: {
        scrollTop: 0,
        scrollHeight: 1000,
        clientHeight: 500,
      },
      expectedScroll: { top: 80 },
    },
  ])(
    'should scroll by given scroll step when control is clicked ($direction)',
    ({ direction, scrollStep, contentStyle, controlLabel, viewportProps, expectedScroll }) => {
      render(
        <ScrollView hasControls direction={direction} controlsScrollStep={scrollStep} data-testid="scroll">
          <div style={contentStyle}>Content</div>
        </ScrollView>,
      );

      const viewport = screen.getByTestId('scroll').firstElementChild as HTMLElement;
      const control = screen.getByRole('button', { name: controlLabel });

      const scrollTo = jest.fn();
      viewport.scrollTo = scrollTo;
      Object.keys(viewportProps).forEach((key) => {
        Object.defineProperty(viewport, key, {
          value: viewportProps[key as keyof typeof viewportProps],
          writable: true,
        });
      });

      jest.useFakeTimers();

      control?.click();

      // First call cancels ongoing scroll (behavior: 'auto')
      const cancelScrollKey = Object.keys(expectedScroll)[0] as 'left' | 'top';
      const cancelScroll = { [cancelScrollKey]: 0, behavior: 'auto' as const };

      expect(scrollTo).toHaveBeenCalledWith(cancelScroll);

      // Advance timer to trigger the delayed scrollTo
      jest.advanceTimersByTime(SCROLL_CANCEL_DELAY);

      // Second call performs the actual scroll (behavior: 'smooth')
      expect(scrollTo).toHaveBeenCalledWith({ ...expectedScroll, behavior: 'smooth' });

      jest.useRealTimers();
    },
  );

  it('should not render controls when hasControls is false', () => {
    render(<ScrollView>Content</ScrollView>);

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('should use custom control labels (vertical)', () => {
    render(
      <ScrollView hasControls ariaLabelControls={{ top: 'Custom top label', bottom: 'Custom bottom label' }}>
        <div style={{ height: '1000px' }}>Content</div>
      </ScrollView>,
    );

    expect(screen.getByRole('button', { name: 'Custom top label' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Custom bottom label' })).toBeInTheDocument();
  });

  it('should use custom control labels (horizontal)', () => {
    render(
      <ScrollView
        hasControls
        direction="horizontal"
        ariaLabelControls={{ start: 'Custom start label', end: 'Custom end label' }}
      >
        <div style={{ width: '1000px' }}>Content</div>
      </ScrollView>,
    );

    expect(screen.getByRole('button', { name: 'Custom start label' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Custom end label' })).toBeInTheDocument();
  });
});
