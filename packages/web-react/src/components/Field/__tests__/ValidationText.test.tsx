import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React, { type ElementType } from 'react';
import { validHtmlAttributesTest } from '@local/tests';
import { A11Y_ALERT_ROLE } from '../constants';
import { type ValidationTextProps } from '../types';
import ValidationText from '../ValidationText';

const renderValidationText = <E extends ElementType = 'div'>(props: Partial<ValidationTextProps<E>>) =>
  render(<ValidationText UNSAFE_className="ValidationText__validationText" {...props} />);

describe('ValidationText', () => {
  validHtmlAttributesTest(ValidationText);

  it('should render single validation text', () => {
    renderValidationText({ validationText: 'validation text' });

    const element = screen.getByText('validation text');

    expect(element).toHaveClass('ValidationText__validationText');
    expect(element).not.toHaveAttribute('role', A11Y_ALERT_ROLE);
  });

  it('should render single validation text without alert role', () => {
    renderValidationText({ validationText: 'validation text' });

    expect(screen.getByText('validation text')).not.toHaveAttribute('role', A11Y_ALERT_ROLE);
  });

  it('should render single validation text with alert role', () => {
    renderValidationText({ validationText: 'validation text', role: A11Y_ALERT_ROLE });

    expect(screen.getByText('validation text')).toHaveAttribute('role', A11Y_ALERT_ROLE);
  });

  it('should render multiple validation texts without alert role', () => {
    renderValidationText({ validationText: ['validation text', 'another validation text'] });

    expect(screen.getByRole('list').parentElement).not.toHaveAttribute('role', A11Y_ALERT_ROLE);
  });

  it('should render multiple validation texts with alert role', () => {
    renderValidationText({ validationText: ['validation text', 'another validation text'], role: A11Y_ALERT_ROLE });

    expect(screen.getByRole('list').parentElement).toHaveClass('ValidationText__validationText');
  });

  it('should render as span element', () => {
    renderValidationText<'span'>({
      validationText: ['validation text', 'another validation text'],
      elementType: 'span',
    });

    expect(screen.getByRole('list').parentElement).toContainHTML('span');
  });

  it('should render with html tags', () => {
    render(
      <ValidationText
        id="test"
        validationText={
          <>
            validation <b>text</b>
          </>
        }
      />,
    );

    const element = document.querySelector('#test') as HTMLElement;

    expect(element).toHaveTextContent('validation text');
    expect(element.innerHTML).toBe('validation <b>text</b>');
  });

  describe('when rendering multiple validation texts', () => {
    beforeEach(() => {
      renderValidationText({ validationText: ['validation text', 'another validation text'] });
    });

    it('should render list wrapper with the correct class', () => {
      expect(screen.getByRole('list').parentElement).toHaveClass('ValidationText__validationText');
    });

    it('should render correct validation texts for list items', () => {
      const listItems = screen.getAllByRole('listitem');

      expect(listItems[0]).toHaveTextContent('validation text');
      expect(listItems[1]).toHaveTextContent('another validation text');
    });
  });

  describe('when updating initial validation text and role', () => {
    it('should update validation text when the prop changes', () => {
      const { container, rerender } = renderValidationText({ validationText: 'initial validation text' });

      expect(container.textContent).toBe('initial validation text');
      expect(screen.queryByRole('list')).not.toBeInTheDocument();

      rerender(
        <ValidationText
          UNSAFE_className="ValidationText__validationText"
          validationText={['updated validation text', 'new validation text']}
        />,
      );

      expect(screen.queryByRole('list')).toBeInTheDocument();

      const listItems = screen.getAllByRole('listitem');
      expect(listItems[0]).toHaveTextContent('updated validation text');
      expect(listItems[1]).toHaveTextContent('new validation text');
    });
  });
});
