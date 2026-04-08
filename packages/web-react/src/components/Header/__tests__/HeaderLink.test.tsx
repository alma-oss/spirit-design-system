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
import HeaderLink from '../HeaderLink';

describe('HeaderLink', () => {
  classNamePrefixProviderTest(HeaderLink, 'HeaderLink');

  stylePropsTest((props) => <HeaderLink {...props} data-testid="header-link-test" />, 'header-link-test');

  restPropsTest((props) => <HeaderLink {...props} />, 'a');

  validHtmlAttributesTest(HeaderLink);

  ariaAttributesTest(HeaderLink);

  elementTypePropsTest(HeaderLink);

  it('should render text children', () => {
    const dom = render(<HeaderLink id="test">Hello World</HeaderLink>);

    const element = dom.container.querySelector('a') as HTMLElement;

    expect(element.textContent).toBe('Hello World');
  });
});
