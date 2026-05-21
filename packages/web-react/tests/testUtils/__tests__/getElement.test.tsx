import { render } from '@testing-library/react';
import React from 'react';
import getElement from '../getElement';

describe('getElement', () => {
  it('returns container first child when target is not provided', () => {
    const dom = render(<div data-testid="first-child" />);

    expect(getElement(dom)).toBe(dom.container.firstChild);
  });

  it('returns element by test id when target is a string', () => {
    const dom = render(<div data-testid="target" />);
    const expectedElement = dom.getByTestId('target');

    expect(getElement(dom, 'target')).toBe(expectedElement);
  });

  it('returns element by role when target is an object', () => {
    const dom = render(<button type="button">Action</button>);
    const expectedElement = dom.getByRole('button');

    expect(getElement(dom, { getByRole: 'button' })).toBe(expectedElement);
  });
});
