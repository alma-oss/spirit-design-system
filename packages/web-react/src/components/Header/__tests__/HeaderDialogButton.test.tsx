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
import HeaderDialogButton from '../HeaderDialogButton';

describe('HeaderDialogButton', () => {
  classNamePrefixProviderTest(HeaderDialogButton, 'HeaderDialogLink');

  stylePropsTest(
    (props) => <HeaderDialogButton {...props} data-testid="header-dialog-button-test" />,
    'header-dialog-button-test',
  );

  restPropsTest((props) => <HeaderDialogButton {...props} />, 'button');

  validHtmlAttributesTest(HeaderDialogButton);

  ariaAttributesTest(HeaderDialogButton);

  it('should render text children', () => {
    const dom = render(<HeaderDialogButton id="test">Hello World</HeaderDialogButton>);

    const element = dom.container.querySelector('button') as HTMLElement;

    expect(element.textContent).toBe('Hello World');
  });
});
