import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import { type TextAlignmentType, TextAlignments } from '../../src';
import getElement from '../testUtils/getElement';

export const textAlignmentPropsTest = (Component: ComponentType<any>, testId?: string) => {
  it.each([Object.values(TextAlignments)])('should render text alignment %s', async (textAlignment) => {
    const dom = render(<Component textAlignment={textAlignment as TextAlignmentType} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(`text-${textAlignment}`);
    });
  });
};
