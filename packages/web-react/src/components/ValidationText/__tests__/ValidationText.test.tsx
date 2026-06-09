import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React, { type ElementType } from 'react';
import {
  elementTypePropsTest,
  formFieldContextPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import { PropsProvider } from '../../../context';
import { type SpiritValidationTextProps } from '../../../types';
import { A11Y_ALERT_ROLE } from '../constants';
import ValidationText from '../ValidationText';

jest.mock('../../../hooks/useIcon');

const renderValidationText = <E extends ElementType = 'div'>(props: Partial<SpiritValidationTextProps<E>>) =>
  render(<ValidationText {...props} />);

describe('ValidationText', () => {
  validHtmlAttributesTest(ValidationText);

  stylePropsTest((props) => <ValidationText {...props} validationText="validation text" />);

  restPropsTest((props) => <ValidationText {...props} validationText="validation text" />, 'div');

  elementTypePropsTest((props) => <ValidationText {...props} validationText="validation text" />, 'span');

  formFieldContextPropsTest({
    renderComponent: (props) => <ValidationText {...props} validationText="validation text" />,
    text: 'validation text',
    includeInlineMode: false,
    includeItemMode: false,
    classNamePrefix: 'ValidationText',
  });

  it('should use context elementType when no direct prop', () => {
    render(
      <PropsProvider value={{ elementType: 'span' }}>
        <ValidationText validationText="validation text" />
      </PropsProvider>,
    );

    expect(screen.getByText('validation text').localName).toBe('span');
  });

  it('should use direct elementType over context', () => {
    render(
      <PropsProvider value={{ elementType: 'span' }}>
        <ValidationText elementType="p" validationText="validation text" />
      </PropsProvider>,
    );

    expect(screen.getByText('validation text').localName).toBe('p');
  });

  it('should render single validation text', () => {
    renderValidationText({ validationText: 'validation text' });

    const element = screen.getByText('validation text');

    expect(element).toHaveClass('ValidationText');
    expect(element).not.toHaveAttribute('role', A11Y_ALERT_ROLE);
  });

  it('should not render without validation text', () => {
    const { container } = renderValidationText({});

    expect(container).toBeEmptyDOMElement();
  });

  it('should render single validation text without alert role', () => {
    renderValidationText({ validationText: 'validation text' });

    expect(screen.getByText('validation text')).not.toHaveAttribute('role', A11Y_ALERT_ROLE);
  });

  it('should render single validation text with alert role', () => {
    renderValidationText({
      validationText: 'validation text',
      role: A11Y_ALERT_ROLE,
    });

    expect(screen.getByText('validation text')).toHaveAttribute('role', A11Y_ALERT_ROLE);
  });

  it('should render validation state icon and class when validationStateIcon is set', () => {
    renderValidationText({
      validationText: 'validation text',
      validationStateIcon: 'danger',
    });

    const element = screen.getByText('validation text').parentElement as HTMLElement;

    expect(element).toHaveClass('ValidationText', 'ValidationText--danger');
    expect(element.querySelector('svg')).toHaveClass('Icon');
    expect(element.querySelector('svg')).toHaveAttribute('width', '20');
  });

  it('should use context validation state for styles without rendering icon', () => {
    render(
      <PropsProvider value={{ validationState: 'warning' }}>
        <ValidationText validationText="validation text" />
      </PropsProvider>,
    );

    const element = screen.getByText('validation text');

    expect(element).toHaveClass('ValidationText--warning');
    expect(element.querySelector('svg')).not.toBeInTheDocument();
  });

  it('should use direct validation state icon over context validation state for styles', () => {
    render(
      <PropsProvider value={{ validationState: 'warning' }}>
        <ValidationText validationText="validation text" validationStateIcon="success" />
      </PropsProvider>,
    );

    const element = screen.getByText('validation text').parentElement as HTMLElement;

    expect(element).toHaveClass('ValidationText--success');
    expect(element).not.toHaveClass('ValidationText--warning');
    expect(element.querySelector('svg')).toHaveClass('Icon');
  });

  it('should render multiple validation texts without alert role', () => {
    renderValidationText({
      validationText: ['validation text', 'another validation text'],
    });

    expect(screen.getByRole('list').parentElement).not.toHaveAttribute('role', A11Y_ALERT_ROLE);
  });

  it('should render multiple validation texts with alert role', () => {
    renderValidationText({
      validationText: ['validation text', 'another validation text'],
      role: A11Y_ALERT_ROLE,
    });

    expect(screen.getByRole('list').parentElement).toHaveClass('ValidationText');
    expect(screen.getByRole('list').parentElement).toHaveAttribute('role', A11Y_ALERT_ROLE);
  });

  it('should render as span element', () => {
    renderValidationText({
      validationText: ['validation text', 'another validation text'],
      elementType: 'span',
    });

    expect(screen.getByRole('list').parentElement).toContainHTML('span');
  });

  it('should render as default div element when elementType is undefined', () => {
    renderValidationText({
      validationText: 'validation text',
      elementType: undefined,
    });

    expect(screen.getByText('validation text').tagName).toBe('DIV');
  });

  it('should render with html tags', () => {
    render(
      <ValidationText
        id="validation-text-html"
        validationText={
          <>
            validation <b>text</b>
          </>
        }
      />,
    );

    const element = screen.getByText('text').parentElement as HTMLElement;

    expect(element).toHaveTextContent('validation text');
    expect(element.innerHTML).toBe('validation <b>text</b>');
  });

  it('should render with id and registerAria for aria-describedby', () => {
    const id = 'validation-text-aria-describedby';
    const register = jest.fn();

    const { unmount } = renderValidationText({
      id,
      registerAria: register,
      validationText: 'validation text',
    });

    const element = screen.getByText('validation text');

    expect(element).toHaveAttribute('id', id);
    expect(register).toHaveBeenCalledWith({ add: id });

    unmount();

    expect(register).toHaveBeenCalledWith({ remove: id });
  });

  it('should register aria when validation text appears after initial render', () => {
    const id = 'validation-text-lazy-aria-describedby';
    const register = jest.fn();

    const { rerender } = renderValidationText({ id, registerAria: register });

    expect(register).not.toHaveBeenCalled();

    rerender(<ValidationText id={id} registerAria={register} validationText="validation text" />);

    expect(register).toHaveBeenCalledWith({ add: id });
  });

  describe('when rendering multiple validation texts', () => {
    beforeEach(() => {
      renderValidationText({
        validationText: ['validation text', 'another validation text'],
      });
    });

    it('should render list wrapper with the correct class', () => {
      expect(screen.getByRole('list').parentElement).toHaveClass('ValidationText');
    });

    it('should render correct validation texts for list items', () => {
      const listItems = screen.getAllByRole('listitem');

      expect(listItems[0]).toHaveTextContent('validation text');
      expect(listItems[1]).toHaveTextContent('another validation text');
    });
  });

  describe('when updating initial validation text and role', () => {
    it('should update validation text when the prop changes', () => {
      const { container, rerender } = renderValidationText({
        validationText: 'initial validation text',
      });

      expect(container.textContent).toBe('initial validation text');
      expect(screen.queryByRole('list')).not.toBeInTheDocument();

      rerender(<ValidationText validationText={['updated validation text', 'new validation text']} />);

      expect(screen.queryByRole('list')).toBeInTheDocument();

      const listItems = screen.getAllByRole('listitem');

      expect(listItems[0]).toHaveTextContent('updated validation text');
      expect(listItems[1]).toHaveTextContent('new validation text');
    });
  });
});
