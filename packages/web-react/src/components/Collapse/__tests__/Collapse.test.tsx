import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { Button } from '../../Button';
import Collapse from '../Collapse';

// @TODO: Missing test for collapsibleToBreakpoint

describe('Collapse', () => {
  classNamePrefixProviderTest(Collapse, 'Collapse');

  stylePropsTest(Collapse);

  restPropsTest(Collapse, 'div');

  validHtmlAttributesTest(Collapse);

  ariaAttributesTest(Collapse);

  elementTypePropsTest(Collapse);

  it('should render text children', () => {
    render(
      <Collapse id="collapse" isOpen data-testid="collapse-element">
        Hello World
      </Collapse>,
    );

    const element = screen.getByTestId('collapse-element');

    expect(element).toHaveTextContent('Hello World');
    expect(element).toHaveClass('is-open');
  });

  it('should open collapse', () => {
    const RenderCollapse = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button type="button" data-testid="toggle-button" onClick={() => setIsOpen(!isOpen)}>
            Toggle Collapse
          </Button>
          <Collapse id="collapse" isOpen={isOpen} data-testid="collapse-element">
            Hello World
          </Collapse>
        </>
      );
    };

    render(<RenderCollapse />);

    const toggleButton = screen.getByTestId('toggle-button');
    const collapseElement = screen.getByTestId('collapse-element');

    expect(collapseElement).not.toHaveClass('is-open');

    fireEvent.click(toggleButton);

    expect(collapseElement).toHaveClass('is-open');
  });

  it('should respect transitionDuration prop', async () => {
    jest.useFakeTimers();

    const RenderCollapse = ({ duration }: { duration: number }) => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button type="button" data-testid="toggle-button" onClick={() => setIsOpen(!isOpen)}>
            Toggle Collapse
          </Button>
          <Collapse id="collapse" isOpen={isOpen} transitionDuration={duration} data-testid="collapse-element">
            Hello World
          </Collapse>
        </>
      );
    };

    const transitionDuration = 250;

    render(<RenderCollapse duration={transitionDuration} />);

    const toggleButton = screen.getByTestId('toggle-button');
    const collapseElement = screen.getByTestId('collapse-element');

    expect(collapseElement).not.toHaveClass('is-open');

    fireEvent.click(toggleButton);

    act(() => {
      jest.advanceTimersByTime(transitionDuration - 1);
    });

    expect(collapseElement).toHaveClass('is-transitioning');

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(collapseElement).not.toHaveClass('is-transitioning');
    expect(collapseElement).toHaveClass('is-open');

    jest.useRealTimers();
  });

  describe('inline collapsing', () => {
    it('should render content inline when span element is open', () => {
      render(
        <div data-testid="container">
          <span>Before text </span>
          <Collapse id="collapse" isOpen elementType="span">
            Inline content
          </Collapse>
          <span> after text</span>
        </div>,
      );

      const container = screen.getByTestId('container');

      expect(container).toHaveTextContent('Before text Inline content after text');
    });

    it('should render content inside hidden span when closed', () => {
      render(
        <div>
          <span>Before text </span>
          <Collapse id="collapse" isOpen={false} elementType="span" data-testid="collapse-span">
            Hidden content
          </Collapse>
          <span> after text</span>
        </div>,
      );

      const collapseElement = screen.getByTestId('collapse-span');

      expect(collapseElement).toHaveTextContent('Hidden content');
      expect(collapseElement).not.toHaveClass('is-open');
    });

    it('should render content outside collapse element when span is open', () => {
      render(
        <div data-testid="container">
          <span>Before text </span>
          <Collapse id="collapse" isOpen elementType="span">
            <span data-testid="inner-content">Inline content</span>
          </Collapse>
          <span> after text</span>
        </div>,
      );

      const container = screen.getByTestId('container');
      const innerContent = screen.getByTestId('inner-content');

      expect(container).toContainElement(innerContent);
      expect(container).toHaveTextContent('Before text Inline content after text');
    });

    it('should render content inside collapse element when span is closed', () => {
      render(
        <div data-testid="container">
          <span>Before text </span>
          <Collapse id="collapse" isOpen={false} elementType="span" data-testid="collapse-span">
            <span data-testid="inner-content">Hidden content</span>
          </Collapse>
          <span> after text</span>
        </div>,
      );

      const collapseElement = screen.getByTestId('collapse-span');
      const innerContent = screen.getByTestId('inner-content');

      expect(collapseElement).toContainElement(innerContent);
    });

    it('should toggle between inline and hidden behavior for span elements', () => {
      const RenderCollapse = () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
          <div data-testid="container">
            <span>Before text </span>
            <button type="button" data-testid="toggle-button" onClick={() => setIsOpen(!isOpen)}>
              Toggle
            </button>
            <Collapse id="collapse" isOpen={isOpen} elementType="span" data-testid="collapse-span">
              Toggle content
            </Collapse>
            <span> after text</span>
          </div>
        );
      };

      render(<RenderCollapse />);

      const container = screen.getByTestId('container');
      const toggleButton = screen.getByTestId('toggle-button');
      const collapseElement = screen.getByTestId('collapse-span');

      expect(collapseElement).not.toHaveClass('is-open');

      fireEvent.click(toggleButton);

      expect(screen.queryByTestId('collapse-span')).not.toBeInTheDocument();
      expect(container).toHaveTextContent('Before text ToggleToggle content after text');
    });
  });

  describe('div element behavior (unchanged)', () => {
    it('should continue to work as before for div elements', () => {
      render(
        <div data-testid="container">
          <span>Before text </span>
          <Collapse id="collapse" isOpen elementType="div" data-testid="collapse-div">
            <span data-testid="inner-content">Block content</span>
          </Collapse>
          <span> after text</span>
        </div>,
      );

      const collapseElement = screen.getByTestId('collapse-div');
      const innerContent = screen.getByTestId('inner-content');

      expect(collapseElement).toContainElement(innerContent);
      expect(collapseElement).toHaveClass('is-open');
    });

    it('should use height-based transitions for div elements', () => {
      render(
        <Collapse id="collapse" isOpen elementType="div" data-testid="collapse-div">
          Block content
        </Collapse>,
      );

      const collapseElement = screen.getByTestId('collapse-div');

      expect(collapseElement).toHaveClass('is-open');
      expect(collapseElement.localName).toBe('div');
    });
  });

  describe('elementType prop validation', () => {
    it('should accept span as elementType when closed', () => {
      render(
        <Collapse id="collapse" isOpen={false} elementType="span" data-testid="collapse-span">
          Content
        </Collapse>,
      );

      const element = screen.getByTestId('collapse-span');

      expect(element.localName).toBe('span');
    });

    it('should default to div when elementType is not specified', () => {
      render(
        <Collapse id="collapse" isOpen data-testid="collapse-element">
          Content
        </Collapse>,
      );

      const element = screen.getByTestId('collapse-element');

      expect(element.localName).toBe('div');
    });
  });
});
