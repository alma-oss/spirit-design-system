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
import HeaderDialogLink from '../HeaderDialogLink';

describe('HeaderDialogLink', () => {
  classNamePrefixProviderTest(HeaderDialogLink, 'HeaderDialogLink');

  stylePropsTest(
    (props) => <HeaderDialogLink {...props} data-testid="header-dialog-link-test" />,
    'header-dialog-link-test',
  );

  restPropsTest((props) => <HeaderDialogLink {...props} />, 'a');

  validHtmlAttributesTest(HeaderDialogLink);

  ariaAttributesTest(HeaderDialogLink);

  elementTypePropsTest(HeaderDialogLink);

  it('should render text children', () => {
    const dom = render(<HeaderDialogLink id="test">Hello World</HeaderDialogLink>);

    const element = dom.container.querySelector('a') as HTMLElement;

    expect(element.textContent).toBe('Hello World');
  });
});
