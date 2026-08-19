import '@testing-library/jest-dom';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  colorSchemeSubtleTest,
  elementTypePropsTest,
  emotionColorPropsTest,
  iconNamePropTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { renderWithIcons as render } from '@local/tests/testUtils/testIcons';
import { EmotionColors } from '../../../constants';
import { getColorSchemeClassName } from '../../../utils';
import Alert from '../Alert';

describe('Alert', () => {
  classNamePrefixProviderTest(Alert, 'Alert');

  colorSchemeSubtleTest(Alert, Object.values(EmotionColors));

  stylePropsTest(Alert);

  emotionColorPropsTest(Alert, 'Alert--');

  restPropsTest(Alert, 'div');

  validHtmlAttributesTest(Alert);

  ariaAttributesTest(Alert);

  elementTypePropsTest(Alert);

  iconNamePropTest(Alert);

  it('should have default classname', () => {
    const dom = render(<Alert />);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element).toHaveClass('Alert--success', getColorSchemeClassName({ color: 'success', isSubtle: true }));
  });

  it('should render text children', () => {
    const dom = render(<Alert>Hello World</Alert>);

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.textContent).toBe('Hello World');
  });

  it('should have icon', () => {
    const dom = render(<Alert>Hello World</Alert>);

    const element = dom.container.querySelector('svg') as SVGSVGElement;

    expect(element).toBeInTheDocument();
  });
});
