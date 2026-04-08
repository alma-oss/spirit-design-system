import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import GridItem from '../GridItem';

describe('Grid', () => {
  classNamePrefixProviderTest(GridItem, 'GridItem');

  stylePropsTest(GridItem);

  restPropsTest(GridItem, 'div');

  validHtmlAttributesTest(GridItem);

  ariaAttributesTest(GridItem);

  elementTypePropsTest(GridItem);

  it('should render text children', () => {
    const dom = render(<GridItem>Hello World</GridItem>);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.textContent).toBe('Hello World');
  });

  it('should have start CSS variable', () => {
    const dom = render(<GridItem columnStart={4} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-start')).toBe('4');
  });

  it('should have start CSS variable for mobile', () => {
    const dom = render(<GridItem columnStart={{ mobile: 4 }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-start')).toBe('4');
  });

  it('should have start CSS variable for tablet', () => {
    const dom = render(<GridItem columnStart={{ tablet: 4 }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-start-tablet')).toBe('4');
  });

  it('should have start CSS variable for desktop', () => {
    const dom = render(<GridItem columnStart={{ desktop: 4 }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-start-desktop')).toBe('4');
  });

  it('should have end CSS variable', () => {
    const dom = render(<GridItem columnEnd={4} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-end')).toBe('4');
  });

  it('should have end CSS variable for mobile', () => {
    const dom = render(<GridItem columnEnd={{ mobile: 4 }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-end')).toBe('4');
  });

  it('should have end CSS variable for tablet', () => {
    const dom = render(<GridItem columnEnd={{ tablet: 4 }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-end-tablet')).toBe('4');
  });

  it('should have end CSS variable for desktop', () => {
    const dom = render(<GridItem columnEnd={{ desktop: 4 }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-end-desktop')).toBe('4');
  });

  it('should have end CSS variable with span', () => {
    const dom = render(<GridItem columnEnd="span 4" />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-end')).toBe('span 4');
  });

  it('should have end CSS variable for mobile with span', () => {
    const dom = render(<GridItem columnEnd={{ mobile: 'span 4' }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-end')).toBe('span 4');
  });

  it('should have end CSS variable for tablet with span', () => {
    const dom = render(<GridItem columnEnd={{ tablet: 'span 4' }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-end-tablet')).toBe('span 4');
  });

  it('should have end CSS variable for desktop with span', () => {
    const dom = render(<GridItem columnEnd={{ desktop: 'span 4' }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-end-desktop')).toBe('span 4');
  });

  it('should have all CSS variables', () => {
    const dom = render(<GridItem columnStart={1} columnEnd={2} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-start')).toBe('1');
    expect(element.style.getPropertyValue('--grid-item-column-end')).toBe('2');
  });

  it('should have mobile, tablet and desktop CSS variables', () => {
    const dom = render(
      <GridItem columnStart={{ mobile: 1, tablet: 2, desktop: 3 }} columnEnd={{ mobile: 4, tablet: 5, desktop: 6 }} />,
    );

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-start')).toBe('1');
    expect(element.style.getPropertyValue('--grid-item-column-start-tablet')).toBe('2');
    expect(element.style.getPropertyValue('--grid-item-column-start-desktop')).toBe('3');
    expect(element.style.getPropertyValue('--grid-item-column-end')).toBe('4');
    expect(element.style.getPropertyValue('--grid-item-column-end-tablet')).toBe('5');
    expect(element.style.getPropertyValue('--grid-item-column-end-desktop')).toBe('6');
  });

  it('should have start CSS variable for row', () => {
    const dom = render(<GridItem rowStart={4} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-start')).toBe('4');
  });

  it('should have start CSS variable for mobile row', () => {
    const dom = render(<GridItem rowStart={{ mobile: 4 }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-start')).toBe('4');
  });

  it('should have start CSS variable for tablet row', () => {
    const dom = render(<GridItem rowStart={{ tablet: 4 }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-start-tablet')).toBe('4');
  });

  it('should have start CSS variable for desktop row', () => {
    const dom = render(<GridItem rowStart={{ desktop: 4 }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-start-desktop')).toBe('4');
  });

  it('should have end CSS variable for row', () => {
    const dom = render(<GridItem rowEnd={4} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-end')).toBe('4');
  });

  it('should have end CSS variable for mobile row', () => {
    const dom = render(<GridItem rowEnd={{ mobile: 4 }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-end')).toBe('4');
  });

  it('should have end CSS variable for tablet row', () => {
    const dom = render(<GridItem rowEnd={{ tablet: 4 }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-end-tablet')).toBe('4');
  });

  it('should have end CSS variable for desktop row', () => {
    const dom = render(<GridItem rowEnd={{ desktop: 4 }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-end-desktop')).toBe('4');
  });

  it('should have end CSS variable with span for row', () => {
    const dom = render(<GridItem rowEnd="span 4" />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-end')).toBe('span 4');
  });

  it('should have end CSS variable for mobile with span for row', () => {
    const dom = render(<GridItem rowEnd={{ mobile: 'span 4' }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-end')).toBe('span 4');
  });

  it('should have end CSS variable for tablet with span for row', () => {
    const dom = render(<GridItem rowEnd={{ tablet: 'span 4' }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-end-tablet')).toBe('span 4');
  });

  it('should have end CSS variable for desktop with span for row', () => {
    const dom = render(<GridItem rowEnd={{ desktop: 'span 4' }} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-end-desktop')).toBe('span 4');
  });

  it('should have all CSS variables for row', () => {
    const dom = render(<GridItem rowStart={1} rowEnd={2} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-start')).toBe('1');
    expect(element.style.getPropertyValue('--grid-item-row-end')).toBe('2');
  });

  it('should have mobile, tablet and desktop CSS variables for row', () => {
    const dom = render(
      <GridItem rowStart={{ mobile: 1, tablet: 2, desktop: 3 }} rowEnd={{ mobile: 4, tablet: 5, desktop: 6 }} />,
    );

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-row-start')).toBe('1');
    expect(element.style.getPropertyValue('--grid-item-row-start-tablet')).toBe('2');
    expect(element.style.getPropertyValue('--grid-item-row-start-desktop')).toBe('3');
    expect(element.style.getPropertyValue('--grid-item-row-end')).toBe('4');
    expect(element.style.getPropertyValue('--grid-item-row-end-tablet')).toBe('5');
    expect(element.style.getPropertyValue('--grid-item-row-end-desktop')).toBe('6');
  });

  it('should have all CSS variables for row and column', () => {
    const dom = render(<GridItem columnStart={1} columnEnd={2} rowStart={1} rowEnd={2} />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.style.getPropertyValue('--grid-item-column-start')).toBe('1');
    expect(element.style.getPropertyValue('--grid-item-column-end')).toBe('2');
    expect(element.style.getPropertyValue('--grid-item-row-start')).toBe('1');
    expect(element.style.getPropertyValue('--grid-item-row-end')).toBe('2');
  });
});
