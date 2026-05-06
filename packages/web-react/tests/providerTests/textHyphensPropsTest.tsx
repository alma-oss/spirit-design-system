import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import { TextHyphens, type TextHyphensType } from '../../src';
import getElement from '../testUtils/getElement';

export const textHyphensPropsTest = (Component: ComponentType<any>, testId?: string) => {
  it.each([Object.values(TextHyphens)])('should render text hyphens %s', async (textHyphen) => {
    const dom = render(<Component textHyphens={textHyphen as TextHyphensType} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(`text-hyphens-${textHyphen}`);
    });
  });
};
