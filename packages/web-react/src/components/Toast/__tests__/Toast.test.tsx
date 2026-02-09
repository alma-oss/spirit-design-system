import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import Toast from '../Toast';

describe('Toast', () => {
  classNamePrefixProviderTest(Toast, 'Toast');

  stylePropsTest(Toast);

  restPropsTest(Toast, 'div');

  validHtmlAttributesTest(Toast);

  ariaAttributesTest(Toast);

  it('should render with default alignments', () => {
    render(<Toast />);

    expect(screen.getByRole('log')).toHaveClass('Toast Toast--center Toast--bottom');
  });

  it('should render with custom alignments', () => {
    render(<Toast alignmentX="left" alignmentY="top" />);

    expect(screen.getByRole('log')).toHaveClass('Toast Toast--left Toast--top');
  });

  it('should render with responsive alignments', () => {
    render(
      <Toast
        alignmentX={{ mobile: 'right', tablet: 'center', desktop: 'left' }}
        alignmentY={{ mobile: 'top', tablet: 'bottom', desktop: 'top' }}
      />,
    );

    expect(screen.getByRole('log')).toHaveClass(
      'Toast Toast--desktop--left Toast--tablet--center Toast--right Toast--desktop--top Toast--tablet--bottom Toast--top',
    );
  });
});
