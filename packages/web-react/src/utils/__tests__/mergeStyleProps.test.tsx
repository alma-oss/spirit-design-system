import React, { type CSSProperties, type HTMLAttributes } from 'react';
import { Button } from '../../components';
import { type ElementTypeProp } from '../../types';
import { mergeStyleProps } from '../mergeStyleProps';

describe('mergeStyleProps', () => {
  const testProps = {
    testUnsafeClass: 'unsafe-test-class',
    testClass: 'test-class',
    testUnsafeStyle: { UNSAFE_style: { backgroundColor: 'blue' } } as CSSProperties,
    testStyle: { style: { color: 'red' } } as CSSProperties,
    testCustomVar: { '--custom-var': '10px' } as CSSProperties,
  };

  const CustomComponent = (props: HTMLAttributes<HTMLDivElement>) => <div {...props} />;

  const testCases = [
    { component: Button, label: 'a Spirit component', expectedKey: 'UNSAFE_' },
    { component: CustomComponent, label: 'a custom component', expectedKey: '' },
    { component: 'div' as ElementTypeProp, label: 'an HTML component', expectedKey: '' },
  ];

  testCases.forEach(({ component, label, expectedKey }) => {
    const classNameKey = `${expectedKey}className`;
    const styleKey = `${expectedKey}style`;

    it(`should merge class names and styles for ${label}`, () => {
      const result = mergeStyleProps(component, testProps);
      expect(result).toEqual({
        [classNameKey]: 'unsafe-test-class test-class',
        [styleKey]: { color: 'red', backgroundColor: 'blue', '--custom-var': '10px' },
      });
    });

    it(`should handle missing class names and styles for ${label}`, () => {
      const result = mergeStyleProps(component, {
        testUnsafeClass: '',
        testClass: '',
        testUnsafeStyle: {},
        testStyle: {},
        testCustomVar: {},
      });
      expect(result).toEqual({
        [classNameKey]: '',
        [styleKey]: {},
      });
    });

    it(`should handle only class names for ${label}`, () => {
      const result = mergeStyleProps(component, {
        testUnsafeClass: testProps.testUnsafeClass,
        testClass: testProps.testClass,
      });
      expect(result).toEqual({
        [classNameKey]: 'unsafe-test-class test-class',
        [styleKey]: {},
      });
    });

    it(`should handle only styles and CSS variables for ${label}`, () => {
      const result = mergeStyleProps(component, {
        testUnsafeStyle: testProps.testUnsafeStyle,
        testStyle: testProps.testStyle,
        testCustomVar: testProps.testCustomVar,
      });
      expect(result).toEqual({
        [classNameKey]: '',
        [styleKey]: { color: 'red', backgroundColor: 'blue', '--custom-var': '10px' },
      });
    });
  });
});
