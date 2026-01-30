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
  SCROLL_VIEW_ARROWS_LABEL_HORIZONTAL_END,
  SCROLL_VIEW_ARROWS_LABEL_HORIZONTAL_START,
  SCROLL_VIEW_ARROWS_LABEL_VERTICAL_END,
  SCROLL_VIEW_ARROWS_LABEL_VERTICAL_START,
} from '../constants';
import ScrollViewArrows from '../ScrollViewArrows';

jest.mock('../../../hooks/useIcon');

describe('ScrollViewArrows', () => {
  classNamePrefixProviderTest(ScrollViewArrows, 'ScrollView__arrows');

  stylePropsTest((props) => <ScrollViewArrows {...props} />);

  restPropsTest(ScrollViewArrows, 'div');

  validHtmlAttributesTest(ScrollViewArrows);

  ariaAttributesTest(ScrollViewArrows);

  it('should render horizontal arrows with correct icons and labels', () => {
    const viewportRef = createRef<HTMLDivElement>();

    render(<ScrollViewArrows direction={Direction.HORIZONTAL} scrollStep={100} viewportRef={viewportRef} />);

    expect(screen.getByRole('button', { name: SCROLL_VIEW_ARROWS_LABEL_HORIZONTAL_START })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: SCROLL_VIEW_ARROWS_LABEL_HORIZONTAL_END })).toBeInTheDocument();
  });

  it('should render vertical arrows with correct icons and labels', () => {
    const viewportRef = createRef<HTMLDivElement>();

    render(<ScrollViewArrows direction={Direction.VERTICAL} scrollStep={80} viewportRef={viewportRef} />);

    expect(screen.getByRole('button', { name: SCROLL_VIEW_ARROWS_LABEL_VERTICAL_START })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: SCROLL_VIEW_ARROWS_LABEL_VERTICAL_END })).toBeInTheDocument();
  });

  it('should call scrollTo with correct values for horizontal arrows', () => {
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

    render(<ScrollViewArrows direction={Direction.HORIZONTAL} scrollStep={50} viewportRef={viewportRef} />);

    fireEvent.click(screen.getByLabelText(SCROLL_VIEW_ARROWS_LABEL_HORIZONTAL_END));

    // First call cancels ongoing scroll (behavior: 'auto')
    expect(scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'auto' });

    // Advance timer to trigger the delayed scrollTo
    jest.advanceTimersByTime(10);

    // Second call performs the actual scroll (behavior: 'smooth')
    expect(scrollTo).toHaveBeenCalledWith({ left: 50, behavior: 'smooth' });

    // Reset for next click
    scrollTo.mockClear();
    viewportRef.current!.scrollLeft = 50;

    fireEvent.click(screen.getByLabelText(SCROLL_VIEW_ARROWS_LABEL_HORIZONTAL_START));

    // Cancel ongoing scroll
    expect(scrollTo).toHaveBeenCalledWith({ left: 50, behavior: 'auto' });

    jest.advanceTimersByTime(10);

    // Scroll to new position
    expect(scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });

    jest.useRealTimers();
  });

  it('should call scrollTo with correct values for vertical arrows', () => {
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

    render(<ScrollViewArrows direction={Direction.VERTICAL} scrollStep={40} viewportRef={viewportRef} />);

    fireEvent.click(screen.getByLabelText(SCROLL_VIEW_ARROWS_LABEL_VERTICAL_END));

    // First call cancels ongoing scroll (behavior: 'auto')
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });

    // Advance timer to trigger the delayed scrollTo
    jest.advanceTimersByTime(10);

    // Second call performs the actual scroll (behavior: 'smooth')
    expect(scrollTo).toHaveBeenCalledWith({ top: 40, behavior: 'smooth' });

    // Reset for next click
    scrollTo.mockClear();
    viewportRef.current!.scrollTop = 40;

    fireEvent.click(screen.getByLabelText(SCROLL_VIEW_ARROWS_LABEL_VERTICAL_START));

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
      <ScrollViewArrows
        direction={Direction.HORIZONTAL}
        scrollStep={100}
        viewportRef={viewportRef}
        data-testid="arrows-test"
      />,
    );

    expect(screen.getByTestId('arrows-test')).toHaveClass('ScrollView__arrows');
  });

  describe('arrow labels', () => {
    it('should render arrows with custom horizontal labels from ariaLabelArrows prop', () => {
      const viewportRef = createRef<HTMLDivElement>();

      render(
        <ScrollViewArrows
          direction={Direction.HORIZONTAL}
          scrollStep={100}
          viewportRef={viewportRef}
          ariaLabelArrows={{ start: 'Custom Left', end: 'Custom Right' }}
        />,
      );

      expect(screen.getByRole('button', { name: 'Custom Left' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Custom Right' })).toBeInTheDocument();
    });

    it('should render arrows with custom vertical labels from ariaLabelArrows prop', () => {
      const viewportRef = createRef<HTMLDivElement>();

      render(
        <ScrollViewArrows
          direction={Direction.VERTICAL}
          scrollStep={100}
          viewportRef={viewportRef}
          ariaLabelArrows={{ top: 'Custom Up', bottom: 'Custom Down' }}
        />,
      );

      expect(screen.getByRole('button', { name: 'Custom Up' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Custom Down' })).toBeInTheDocument();
    });
  });
});
