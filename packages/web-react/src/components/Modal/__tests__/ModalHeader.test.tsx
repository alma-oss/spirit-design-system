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
import ModalHeader from '../ModalHeader';

jest.mock('../../../hooks/useIcon');

describe('ModalHeader', () => {
  classNamePrefixProviderTest(ModalHeader, 'ModalHeader');

  stylePropsTest(ModalHeader);

  restPropsTest(ModalHeader, 'header');

  validHtmlAttributesTest(ModalHeader);

  ariaAttributesTest(ModalHeader);

  it('should have close button', () => {
    render(<ModalHeader>Modal Title</ModalHeader>);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should pass the close label override to CloseButton', () => {
    render(<ModalHeader strings={{ ariaLabel: { close: 'Dismiss modal' } }}>Modal Title</ModalHeader>);

    expect(screen.getByRole('button', { name: 'Dismiss modal' })).toBeInTheDocument();
  });

  it('should not have close button', () => {
    render(<ModalHeader hasCloseButton={false}>Modal Title</ModalHeader>);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
