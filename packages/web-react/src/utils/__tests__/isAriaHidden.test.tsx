import React from 'react';
import { isAriaHidden } from '../isAriaHidden';

describe('isAriaHidden', () => {
  it.each([<span aria-hidden key="boolean" />, <span aria-hidden="true" key="string" />])(
    'should return true for %p',
    (element) => {
      expect(isAriaHidden(element)).toBe(true);
    },
  );

  it.each([
    <span key="without" />,
    <span aria-hidden={false} key="boolean" />,
    <span aria-hidden="false" key="string" />,
  ])('should return false for %p', (element) => {
    expect(isAriaHidden(element)).toBe(false);
  });
});
