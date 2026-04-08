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
import HeaderDialogText from '../HeaderDialogText';

describe('HeaderDialogText', () => {
  classNamePrefixProviderTest(HeaderDialogText, 'HeaderDialogText');

  stylePropsTest(
    (props) => <HeaderDialogText {...props} data-testid="header-dialog-text-test" />,
    'header-dialog-text-test',
  );

  restPropsTest((props) => <HeaderDialogText {...props} />, 'span');

  validHtmlAttributesTest(HeaderDialogText);

  ariaAttributesTest(HeaderDialogText);

  it('should render text children', () => {
    const dom = render(<HeaderDialogText id="test">Hello World</HeaderDialogText>);

    const element = dom.container.querySelector('span') as HTMLElement;

    expect(element.textContent).toBe('Hello World');
  });
});
