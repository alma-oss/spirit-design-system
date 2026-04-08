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
import { HEADER_MENU_TOGGLE_LABEL_DEFAULT } from '../constants';
import HeaderMobileActions from '../HeaderMobileActions';

jest.mock('../../../hooks/useIcon');

describe('HeaderMobileActions', () => {
  classNamePrefixProviderTest(HeaderMobileActions, 'HeaderMobileActions');

  stylePropsTest(
    (props) => <HeaderMobileActions {...props} data-testid="header-mobile-actions-test" />,
    'header-mobile-actions-test',
  );

  restPropsTest((props) => <HeaderMobileActions {...props} />, 'div');

  validHtmlAttributesTest(HeaderMobileActions);

  ariaAttributesTest(HeaderMobileActions);

  it('should render text children', () => {
    const dom = render(
      <HeaderMobileActions id="test" dialogId="dialog-id" isOpen={false} onOpen={() => null}>
        Hello World
      </HeaderMobileActions>,
    );

    const element = dom.container.querySelector('div') as HTMLElement;

    expect(element.textContent).toBe(`Hello World${HEADER_MENU_TOGGLE_LABEL_DEFAULT}`);
  });
});
