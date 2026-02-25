import { render } from '@testing-library/react';
import { htmlElementAttributes } from 'html-element-attributes';
import React, { type ComponentType } from 'react';
import { getComponentName } from '../testUtils/getComponentName';

const globalAttributes = [...htmlElementAttributes['*'], 'role'];

// Custom attributes for specific tags which are not present in html-element-attributes library
const customTagAttributes: Record<string, string[]> = {
  svg: ['viewBox', 'fill', 'xmlns', 'xmlns:xlink', 'width', 'height'],
};

const validateHTMLAttributes = (element: HTMLElement) => {
  const tagName = element.localName;

  const tagAttributes = htmlElementAttributes[tagName] || [];
  const validAttributes = [...globalAttributes, ...tagAttributes, ...(customTagAttributes[tagName] || [])];

  Array.from(element.attributes).forEach((attribute) => {
    if (
      !validAttributes.includes(attribute.name) &&
      !attribute.name.startsWith('data-') &&
      !attribute.name.startsWith('aria-')
    ) {
      throw new Error(`Invalid attribute '${attribute.name}' on <${tagName}> element`);
    }
  });
};

const validateHTMLForComponent = (container: HTMLElement) => {
  const elements = container.querySelectorAll('*') as NodeListOf<HTMLElement>;

  elements.forEach((element) => validateHTMLAttributes(element));
};

export const validHtmlAttributesTest = (Component: ComponentType<any>, props: object = {}) => {
  const componentName = getComponentName(Component);

  test(`should render valid HTML for ${componentName}`, () => {
    const { container } = render(<Component {...props} />);
    validateHTMLForComponent(container);
  });
};
