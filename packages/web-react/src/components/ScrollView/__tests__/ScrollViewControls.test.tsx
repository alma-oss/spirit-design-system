import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React, { type RefObject, createRef } from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { Direction } from '../../../constants';
import {
  SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_END,
  SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_START,
  SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_END,
  SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_START,
} from '../constants';
import ScrollViewControls from '../ScrollViewControls';

jest.mock('../../../hooks/useIcon');

describe('ScrollViewControls', () => {
  classNamePrefixProviderTest(ScrollViewControls, 'ScrollView__controls');

  stylePropsTest((props) => <ScrollViewControls {...props} />);

  restPropsTest(ScrollViewControls, 'div');

  validHtmlAttributesTest(ScrollViewControls);

  ariaAttributesTest(ScrollViewControls);

  it('should render horizontal controls with correct icons and labels', () => {
    const viewportRef = createRef<HTMLDivElement>();

    render(<ScrollViewControls direction={Direction.HORIZONTAL} scrollStep={100} viewportRef={viewportRef} />);

    expect(screen.getByRole('button', { name: SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_START })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_END })).toBeInTheDocument();
  });

  it('should render vertical controls with correct icons and labels', () => {
    const viewportRef = createRef<HTMLDivElement>();

    render(<ScrollViewControls direction={Direction.VERTICAL} scrollStep={80} viewportRef={viewportRef} />);

    expect(screen.getByRole('button', { name: SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_START })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_END })).toBeInTheDocument();
  });

  it('should call scrollTo with correct values for horizontal controls', () => {
    const scrollTo = jest.fn();
    const viewportRef = {
      current: {
        scrollLeft: 0,
        scrollWidth: 1000,
        clientWidth: 500,
        scrollTo,
      },
    } as unknown as RefObject<HTMLDivElement>;

    jest.useFakeTimers();

    render(<ScrollViewControls direction={Direction.HORIZONTAL} scrollStep={50} viewportRef={viewportRef} />);

    fireEvent.click(screen.getByLabelText(SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_END));

    // First call cancels ongoing scroll (behavior: 'auto')
    expect(scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'auto' });

    // Advance timer to trigger the delayed scrollTo
    jest.advanceTimersByTime(10);

    // Second call performs the actual scroll (behavior: 'smooth')
    expect(scrollTo).toHaveBeenCalledWith({ left: 50, behavior: 'smooth' });

    // Reset for next click
    scrollTo.mockClear();
    viewportRef.current!.scrollLeft = 50;

    fireEvent.click(screen.getByLabelText(SCROLL_VIEW_CONTROLS_LABEL_HORIZONTAL_START));

    // Cancel ongoing scroll
    expect(scrollTo).toHaveBeenCalledWith({ left: 50, behavior: 'auto' });

    jest.advanceTimersByTime(10);

    // Scroll to new position
    expect(scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });

    jest.useRealTimers();
  });

  it('should call scrollTo with correct values for vertical controls', () => {
    const scrollTo = jest.fn();
    const viewportRef = {
      current: {
        scrollTop: 0,
        scrollHeight: 1000,
        clientHeight: 500,
        scrollTo,
      },
    } as unknown as RefObject<HTMLDivElement>;

    jest.useFakeTimers();

    render(<ScrollViewControls direction={Direction.VERTICAL} scrollStep={40} viewportRef={viewportRef} />);

    fireEvent.click(screen.getByLabelText(SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_END));

    // First call cancels ongoing scroll (behavior: 'auto')
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });

    // Advance timer to trigger the delayed scrollTo
    jest.advanceTimersByTime(10);

    // Second call performs the actual scroll (behavior: 'smooth')
    expect(scrollTo).toHaveBeenCalledWith({ top: 40, behavior: 'smooth' });

    // Reset for next click
    scrollTo.mockClear();
    viewportRef.current!.scrollTop = 40;

    fireEvent.click(screen.getByLabelText(SCROLL_VIEW_CONTROLS_LABEL_VERTICAL_START));

    // Cancel ongoing scroll
    expect(scrollTo).toHaveBeenCalledWith({ top: 40, behavior: 'auto' });

    jest.advanceTimersByTime(10);

    // Scroll to new position
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

    jest.useRealTimers();
  });

  it('should have correct class', () => {
    const viewportRef = createRef<HTMLDivElement>();

    render(
      <ScrollViewControls
        direction={Direction.HORIZONTAL}
        scrollStep={100}
        viewportRef={viewportRef}
        data-testid="controls-test"
      />,
    );

    expect(screen.getByTestId('controls-test')).toHaveClass('ScrollView__controls');
  });

  describe('control labels', () => {
    it('should render controls with custom horizontal labels from ariaLabelControls prop', () => {
      const viewportRef = createRef<HTMLDivElement>();

      render(
        <ScrollViewControls
          direction={Direction.HORIZONTAL}
          scrollStep={100}
          viewportRef={viewportRef}
          ariaLabelControls={{ start: 'Custom Left', end: 'Custom Right' }}
        />,
      );

      expect(screen.getByRole('button', { name: 'Custom Left' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Custom Right' })).toBeInTheDocument();
    });

    it('should render controls with custom vertical labels from ariaLabelControls prop', () => {
      const viewportRef = createRef<HTMLDivElement>();

      render(
        <ScrollViewControls
          direction={Direction.VERTICAL}
          scrollStep={100}
          viewportRef={viewportRef}
          ariaLabelControls={{ top: 'Custom Up', bottom: 'Custom Down' }}
        />,
      );

      expect(screen.getByRole('button', { name: 'Custom Up' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Custom Down' })).toBeInTheDocument();
    });
  });
});
