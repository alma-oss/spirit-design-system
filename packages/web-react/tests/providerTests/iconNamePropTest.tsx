import { waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import { TestIconsProvider, renderWithIcons } from '../testUtils/testIcons';

const FIRST_ICON = 'icon-name-prop-test-first';
const SECOND_ICON = 'icon-name-prop-test-second';

/**
 * Tests that a component with an icon-name prop renders the requested icon,
 * and that changing the prop's value changes which icon is rendered.
 *
 * @param {ComponentType<any>} Component - the React component under test.
 * @param {string} propName - default 'iconName'; the prop that selects the icon.
 * @param {Record<string, unknown>} requiredProps - extra props needed to make the icon
 *   actually render (e.g. conditionally-rendered icons).
 */
export const iconNamePropTest = (
  Component: ComponentType<any>,
  propName: string = 'iconName',
  requiredProps: Record<string, unknown> = {},
) => {
  it(`should change the rendered icon when the "${propName}" prop changes`, async () => {
    const dom = renderWithIcons(<Component {...requiredProps} {...{ [propName]: FIRST_ICON }} />);

    await waitFor(() => {
      expect(dom.container.querySelector(`[data-icon-name="${FIRST_ICON}"]`)).toBeInTheDocument();
    });

    dom.rerender(
      <TestIconsProvider>
        <Component {...requiredProps} {...{ [propName]: SECOND_ICON }} />
      </TestIconsProvider>,
    );

    await waitFor(() => {
      expect(dom.container.querySelector(`[data-icon-name="${SECOND_ICON}"]`)).toBeInTheDocument();
      expect(dom.container.querySelector(`[data-icon-name="${FIRST_ICON}"]`)).not.toBeInTheDocument();
    });
  });
};
