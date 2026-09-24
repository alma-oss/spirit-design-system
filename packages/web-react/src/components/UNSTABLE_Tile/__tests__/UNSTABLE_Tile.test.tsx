import { render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import '@testing-library/jest-dom';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  staticPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { BackgroundColors } from '../../../constants';
import UNSTABLE_Tile from '../UNSTABLE_Tile';

const paddingProvider = [
  { prop: 'padding', className: 'p-800' },
  { prop: 'paddingX', className: 'px-800' },
  { prop: 'paddingY', className: 'py-800' },
  { prop: 'paddingTop', className: 'pt-800' },
  { prop: 'paddingRight', className: 'pr-800' },
  { prop: 'paddingBottom', className: 'pb-800' },
  { prop: 'paddingLeft', className: 'pl-800' },
] as const;

describe('UNSTABLE_Tile', () => {
  classNamePrefixProviderTest(UNSTABLE_Tile, 'UNSTABLE_Tile');

  stylePropsTest(UNSTABLE_Tile);

  restPropsTest(UNSTABLE_Tile, 'div');

  validHtmlAttributesTest(UNSTABLE_Tile);

  ariaAttributesTest(UNSTABLE_Tile);

  elementTypePropsTest(UNSTABLE_Tile);

  staticPropsTest(UNSTABLE_Tile, 'UNSTABLE_Tile');

  it('should render children', () => {
    render(<UNSTABLE_Tile>Tile content</UNSTABLE_Tile>);

    expect(screen.getByText('Tile content')).toBeInTheDocument();
  });

  it('should render div element by default', () => {
    render(<UNSTABLE_Tile>Tile content</UNSTABLE_Tile>);

    expect(screen.getByText('Tile content').tagName).toBe('DIV');
  });

  it.each(paddingProvider)('should render $className for $prop', ({ prop, className }) => {
    render(<UNSTABLE_Tile {...{ [prop]: 'space-800' }}>Tile content</UNSTABLE_Tile>);

    expect(screen.getByText('Tile content')).toHaveClass('UNSTABLE_Tile', className);
  });

  it('should render responsive padding classes', () => {
    render(
      <UNSTABLE_Tile padding={{ mobile: 'space-600', tablet: 'space-1000', desktop: 'space-1200' }}>
        Tile content
      </UNSTABLE_Tile>,
    );

    expect(screen.getByText('Tile content')).toHaveClass('p-600', 'p-tablet-1000', 'p-desktop-1200');
  });

  it('should not render the shadow modifier by default', () => {
    render(<UNSTABLE_Tile>Tile content</UNSTABLE_Tile>);

    expect(screen.getByText('Tile content')).not.toHaveClass('UNSTABLE_Tile--shadow');
  });

  it.each([Object.values(BackgroundColors)])('should render the background color %s', (backgroundColor) => {
    render(<UNSTABLE_Tile backgroundColor={backgroundColor}>Tile content</UNSTABLE_Tile>);

    expect(screen.getByText('Tile content')).toHaveClass(`bg-${backgroundColor}`);
  });

  it('should render the shadow modifier when hasShadow is set', () => {
    render(<UNSTABLE_Tile hasShadow>Tile content</UNSTABLE_Tile>);

    expect(screen.getByText('Tile content')).toHaveClass('UNSTABLE_Tile', 'UNSTABLE_Tile--shadow');
  });

  it('should render a named region when asked for one', () => {
    render(
      <UNSTABLE_Tile elementType="section" aria-labelledby="tile-heading">
        <h3 id="tile-heading">Personal details</h3>
      </UNSTABLE_Tile>,
    );

    expect(screen.getByRole('region', { name: 'Personal details' })).toBeInTheDocument();
  });

  it('should forward ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UNSTABLE_Tile ref={ref}>Tile content</UNSTABLE_Tile>);

    expect(ref.current).toBe(screen.getByText('Tile content'));
  });
});
