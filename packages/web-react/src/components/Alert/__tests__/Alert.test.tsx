import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
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
import { getColorSchemeClassName } from '../../../utils';
import Alert from '../Alert';

jest.mock('../../../hooks/useIcon');

describe('Alert', () => {
  classNamePrefixProviderTest(Alert, 'Alert');

  stylePropsTest(Alert);

  emotionColorPropsTest(Alert, 'Alert--');

  colorSchemePropsTest(Alert, Object.values(EmotionColors), {
    isSubtle: true,
    hasSubtleProp: false,
  });

  restPropsTest(Alert, 'div');

  validHtmlAttributesTest(Alert);

  ariaAttributesTest(Alert);

  elementTypePropsTest(Alert);

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
