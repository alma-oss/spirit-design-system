import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  colorSchemePropsTest,
  elementTypePropsTest,
  emotionColorPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { EmotionColors } from '../../../constants';
import { PillColorsExtended } from '../constants';
import Pill from '../Pill';

describe('Pill', () => {
  classNamePrefixProviderTest(Pill, 'Pill');

  emotionColorPropsTest(Pill, 'Pill--');

  colorSchemePropsTest(Pill, [...Object.values(PillColorsExtended), ...Object.values(EmotionColors)]);

  colorSchemePropsTest(Pill, [...Object.values(PillColorsExtended), ...Object.values(EmotionColors)], {
    isSubtle: true,
  });

  stylePropsTest(Pill);

  restPropsTest(Pill, 'span');

  validHtmlAttributesTest(Pill);

  ariaAttributesTest(Pill);

  elementTypePropsTest(Pill, 'div');

  it('should have default classname', () => {
    render(<Pill data-testid="pill" />);

    expect(screen.getByTestId('pill')).toHaveClass('Pill--selected');
    expect(screen.getByTestId('pill')).toHaveClass('color-scheme-on-selected-basic');
  });

  it('should render text children', () => {
    render(<Pill>3</Pill>);

    expect(screen.getByText(3)).toBeInTheDocument();
  });

  it('should merge custom class with generated color scheme helper class', () => {
    render(<Pill data-testid="pill" UNSAFE_className="custom-pill-class" />);

    expect(screen.getByTestId('pill')).toHaveClass('Pill--selected');
    expect(screen.getByTestId('pill')).toHaveClass('color-scheme-on-selected-basic');
    expect(screen.getByTestId('pill')).toHaveClass('custom-pill-class');
  });

  it.each([['selected'], ['neutral'], ['danger'], ['informative'], ['success'], ['warning']])(
    'should render color modifier %s',
    (color) => {
      render(<Pill color={color}>333</Pill>);

      expect(screen.getByText(333)).toHaveClass(`Pill--${color}`);
    },
  );

  it('should render subtle variant', () => {
    render(
      <Pill color="success" isSubtle>
        3
      </Pill>,
    );

    expect(screen.getByText(3)).toHaveClass('Pill--success');
    expect(screen.getByText(3)).toHaveClass('Pill--subtle');
  });
});
