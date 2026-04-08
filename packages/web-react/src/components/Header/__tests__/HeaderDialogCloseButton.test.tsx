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
import HeaderDialogCloseButton from '../HeaderDialogCloseButton';

jest.mock('../../../hooks/useIcon');

describe('HeaderDialogCloseButton', () => {
  classNamePrefixProviderTest(HeaderDialogCloseButton, 'HeaderDialogCloseButton');

  stylePropsTest(
    (props) => <HeaderDialogCloseButton {...props} data-testid="header-desktop-close-button-test" />,
    'header-desktop-close-button-test',
  );

  restPropsTest((props) => <HeaderDialogCloseButton {...props} />, 'button');

  validHtmlAttributesTest(HeaderDialogCloseButton);

  ariaAttributesTest(HeaderDialogCloseButton);

  it('should render text label', () => {
    const dom = render(<HeaderDialogCloseButton id="test" label="Hello World" />);

    const element = dom.container.querySelector('button') as HTMLElement;

    expect(element.textContent).toBe('Hello World');
  });
});
