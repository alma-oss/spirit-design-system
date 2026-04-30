import { type ByRoleMatcher, type RenderResult } from '@testing-library/react';

/** Use `{ getByRole }` when the class-under-test is not on `container.firstChild` (e.g. range inputs). */
export type GetElementTarget = string | { getByRole: ByRoleMatcher };

const getElement = (dom: RenderResult, target?: GetElementTarget) => {
  if (!target) {
    return dom.container.firstChild as HTMLElement;
  }

  if (typeof target === 'string') {
    return dom.getByTestId(target) as HTMLElement;
  }

  return dom.getByRole(target.getByRole) as HTMLElement;
};

export default getElement;
