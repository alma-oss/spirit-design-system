import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import { type TextWordBreakType, TextWordBreaks } from '../../src';
import getElement from '../testUtils/getElement';

export const textWordBreakPropsTest = (Component: ComponentType<any>, testId?: string) => {
  it.each([Object.values(TextWordBreaks)])('should render text word breaks %s', async (textWordBreak) => {
    const dom = render(<Component textWordBreak={textWordBreak as TextWordBreakType} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(`text-word-break-${textWordBreak}`);
    });
  });
};
