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
import VisuallyHidden from '../VisuallyHidden';

describe('Visually Hidden', () => {
  classNamePrefixProviderTest(VisuallyHidden, 'accessibility-hidden');

  stylePropsTest(VisuallyHidden);

  restPropsTest(VisuallyHidden, 'span');

  validHtmlAttributesTest(VisuallyHidden);

  ariaAttributesTest(VisuallyHidden);

  elementTypePropsTest(VisuallyHidden, 'div');

  it('should render `Label`', () => {
    const dom = render(<VisuallyHidden>Label</VisuallyHidden>);

    const element = dom.container.querySelector('span') as HTMLElement;

    expect(element.className).toBe('accessibility-hidden');
    expect(element.textContent).toBe('Label');
  });
});
