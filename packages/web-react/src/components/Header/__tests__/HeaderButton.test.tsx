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
import HeaderButton from '../HeaderButton';

describe('HeaderButton', () => {
  classNamePrefixProviderTest(HeaderButton, 'HeaderLink');

  stylePropsTest((props) => <HeaderButton {...props} data-testid="header-button-test" />, 'header-button-test');

  restPropsTest((props) => <HeaderButton {...props} />, 'button');

  validHtmlAttributesTest(HeaderButton);

  ariaAttributesTest(HeaderButton);

  it('should render text children', () => {
    const dom = render(<HeaderButton id="test">Hello World</HeaderButton>);

    const element = dom.container.querySelector('button') as HTMLElement;

    expect(element.textContent).toBe('Hello World');
  });
});
