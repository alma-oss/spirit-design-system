import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ariaAttributesTest, restPropsTest, stylePropsTest, validHtmlAttributesTest } from '@local/tests';
import { toBeInDocumentProviderTest } from '@local/tests/providerTests/toBeInDocumentProviderTest';
import { type SpiritIconProps } from '../../../types';
import Icon from '../Icon';
import { iconColors } from '../utils';

jest.mock('../../../hooks/useIcon');

describe('Icon', () => {
  const AddIcon = (props: SpiritIconProps) => <Icon {...props} name="add" title="Icon Title" data-testid="test-icon" />;

  stylePropsTest(AddIcon, 'test-icon');

  restPropsTest((props: SpiritIconProps) => <Icon {...props} name="add" />, 'svg');

  toBeInDocumentProviderTest(AddIcon, 'svg');

  toBeInDocumentProviderTest(AddIcon, 'title');

  validHtmlAttributesTest(AddIcon);

  ariaAttributesTest(AddIcon);

  describe('default props', () => {
    beforeEach(() => {
      render(<Icon name="add" data-testid="test-icon" />);
    });

    it('should have width', () => {
      expect(screen.getByTestId('test-icon')).toHaveAttribute('width', '24');
    });

    it('should have height', () => {
      expect(screen.getByTestId('test-icon')).toHaveAttribute('height', '24');
    });

    it('should have aria', () => {
      expect(screen.getByTestId('test-icon')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('custom width and height', () => {
    const boxSize = 33;

    beforeEach(() => {
      render(<Icon name="add" boxSize={boxSize} data-testid="test-icon" />);
    });

    it('should have width', () => {
      expect(screen.getByTestId('test-icon')).toHaveAttribute('width', boxSize.toString());
    });

    it('should have height', () => {
      expect(screen.getByTestId('test-icon')).toHaveAttribute('height', boxSize.toString());
    });
  });

  it('should have title', () => {
    render(<Icon name="add" data-testid="test-icon" title="Icon Title" />);
    const titleElement = screen.getByTestId('test-icon').querySelector('title');

    expect(titleElement).toHaveTextContent('Icon Title');
  });

  describe('responsive width and height', () => {
    const boxSize = { mobile: 20, tablet: 40, desktop: 60 };

    beforeEach(() => {
      render(<Icon name="add" boxSize={boxSize} data-testid="test-icon" />);
    });

    it('should have height', () => {
      expect(screen.getByTestId('test-icon')).toHaveAttribute('height', boxSize.mobile.toString());
    });

    it('should have width', () => {
      expect(screen.getByTestId('test-icon')).toHaveAttribute('width', boxSize.mobile.toString());
    });
  });

  it('should have custom styles', () => {
    const boxSize = { desktop: 60 };
    render(<Icon name="add" boxSize={boxSize} data-testid="test-icon" />);

    expect(screen.getByTestId('test-icon')).toHaveStyle({
      '--spirit-icon-size-desktop': '3.75rem',
    });
  });

  it('should not have default color class', () => {
    render(<Icon name="add" data-testid="test-icon" />);

    expect(screen.getByTestId('test-icon')).not.toHaveClass('Icon--primary');
  });

  it.each(iconColors)('should have %c class when color is defined', (color) => {
    render(<Icon name="add" data-testid="test-icon" color={color} />);

    expect(screen.getByTestId('test-icon')).toHaveClass(`Icon--${color}`);
  });
});
