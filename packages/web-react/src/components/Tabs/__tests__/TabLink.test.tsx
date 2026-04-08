import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import TabLink from '../TabLink';

describe('TabLink', () => {
  stylePropsTest((props) => <TabLink href="#" itemProps={props} />);

  classNamePrefixProviderTest(TabLink, 'Tabs__item');

  validHtmlAttributesTest(TabLink);

  ariaAttributesTest(TabLink);

  elementTypePropsTest(TabLink);

  it('should render anchor tag', () => {
    const dom = render(<TabLink href="https://www.example.com" />);

    const element = dom.container.querySelector('a') as HTMLElement;

    expect(element).toHaveClass('Tabs__link');
  });

  it('should render button element', () => {
    const dom = render(
      <TabLink href="https://www.example.com" elementType="button">
        Hello World
      </TabLink>,
    );

    const element = dom.container.querySelector('button') as HTMLElement;

    expect(element.textContent).toBe('Hello World');
  });
});
