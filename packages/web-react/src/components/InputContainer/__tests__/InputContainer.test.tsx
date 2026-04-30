import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { PropsProvider } from '../../../context';
import InputContainer from '../InputContainer';

describe('InputContainer', () => {
  it('should apply size class from prop', () => {
    render(
      <InputContainer size="small">
        <span>Content</span>
      </InputContainer>,
    );

    expect(screen.getByText('Content').parentElement).toHaveClass('InputContainer', 'InputContainer--small');
  });

  it('should apply size class from context when prop is not provided', () => {
    render(
      <PropsProvider value={{ size: 'large' }}>
        <InputContainer>
          <span>Content</span>
        </InputContainer>
      </PropsProvider>,
    );

    expect(screen.getByText('Content').parentElement).toHaveClass('InputContainer', 'InputContainer--large');
  });

  it('should prefer direct size prop over context size', () => {
    render(
      <PropsProvider value={{ size: 'large' }}>
        <InputContainer size="medium">
          <span>Content</span>
        </InputContainer>
      </PropsProvider>,
    );

    expect(screen.getByText('Content').parentElement).toHaveClass('InputContainer', 'InputContainer--medium');
    expect(screen.getByText('Content').parentElement).not.toHaveClass('InputContainer--large');
  });

  it('should apply disabled class from prop', () => {
    render(
      <InputContainer isDisabled>
        <span>Content</span>
      </InputContainer>,
    );

    expect(screen.getByText('Content').parentElement).toHaveClass('InputContainer', 'InputContainer--disabled');
  });

  it('should apply disabled class from context when prop is not provided', () => {
    render(
      <PropsProvider value={{ isDisabled: true }}>
        <InputContainer>
          <span>Content</span>
        </InputContainer>
      </PropsProvider>,
    );

    expect(screen.getByText('Content').parentElement).toHaveClass('InputContainer', 'InputContainer--disabled');
  });

  it('should prefer direct isDisabled prop over context', () => {
    render(
      <PropsProvider value={{ isDisabled: true }}>
        <InputContainer isDisabled={false}>
          <span>Content</span>
        </InputContainer>
      </PropsProvider>,
    );

    expect(screen.getByText('Content').parentElement).not.toHaveClass('InputContainer--disabled');
  });

  it('should apply validation state class from prop', () => {
    render(
      <InputContainer validationState="warning">
        <span>Content</span>
      </InputContainer>,
    );

    expect(screen.getByText('Content').parentElement).toHaveClass('InputContainer', 'InputContainer--warning');
  });

  it('should apply validation state class from context when prop is not provided', () => {
    render(
      <PropsProvider value={{ validationState: 'danger' }}>
        <InputContainer>
          <span>Content</span>
        </InputContainer>
      </PropsProvider>,
    );

    expect(screen.getByText('Content').parentElement).toHaveClass('InputContainer', 'InputContainer--danger');
  });

  it('should prefer direct validationState prop over context', () => {
    render(
      <PropsProvider value={{ validationState: 'danger' }}>
        <InputContainer validationState="warning">
          <span>Content</span>
        </InputContainer>
      </PropsProvider>,
    );

    expect(screen.getByText('Content').parentElement).toHaveClass('InputContainer--warning');
    expect(screen.getByText('Content').parentElement).not.toHaveClass('InputContainer--danger');
  });
});
