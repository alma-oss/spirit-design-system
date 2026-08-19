/* eslint-disable react-refresh/only-export-components -- Test util exports a fixture and a render helper alongside a component */
import { type RenderOptions, type RenderResult, render } from '@testing-library/react';
import React, { type ReactElement, type ReactNode } from 'react';
import { IconsProvider } from '../../src/context';

// Resolves any icon name on demand, so consumers don't need to enumerate every
// literal icon name (e.g. 'check', 'edit', 'close', 'chevron-left') used across test files.
export const testIcons: Record<string, string> = new Proxy(
  {},
  {
    get: (_target, iconName: string) => `<path data-testid="test-icon" data-icon-name="${String(iconName)}"></path>`,
  },
);

export const TestIconsProvider = ({ children }: { children: ReactNode }): ReactElement => (
  <IconsProvider value={testIcons}>{children}</IconsProvider>
);

/**
 * Drop-in replacement for RTL's `render` that resolves icons via `testIcons` instead of requiring `jest.mock('.../hooks/useIcon')`.
 *
 * @param {ReactElement} ui - the element to render.
 * @param {Omit<RenderOptions, 'wrapper'>} options - RTL render options, forwarded as-is; `wrapper` is reserved for `TestIconsProvider`.
 */
export const renderWithIcons = (ui: ReactElement, options: Omit<RenderOptions, 'wrapper'> = {}): RenderResult =>
  render(ui, { ...options, wrapper: TestIconsProvider });
