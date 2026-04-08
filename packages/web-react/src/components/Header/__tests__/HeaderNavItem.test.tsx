import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import HeaderNavItem from '../HeaderNavItem';

describe('HeaderNavItem', () => {
  classNamePrefixProviderTest(HeaderNavItem, 'HeaderNavItem');

  stylePropsTest((props) => <HeaderNavItem {...props} data-testid="header-nav-item-test" />, 'header-nav-item-test');

  restPropsTest((props) => <HeaderNavItem {...props} />, 'li');

  validHtmlAttributesTest(HeaderNavItem);

  ariaAttributesTest(HeaderNavItem);

  it('should render text children', () => {
    const dom = render(<HeaderNavItem id="test">Hello World</HeaderNavItem>);

    const element = dom.container.querySelector('li') as HTMLElement;

    expect(element.textContent).toBe('Hello World');
  });
});
