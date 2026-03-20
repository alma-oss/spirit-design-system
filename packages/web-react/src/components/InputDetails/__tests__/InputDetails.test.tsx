import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import InputDetails from '../InputDetails';

describe('InputDetails', () => {
  it('should render children content', () => {
    render(<InputDetails>See full terms</InputDetails>);

    expect(screen.getByText('See full terms')).toBeInTheDocument();
  });

  it('should have InputDetails className', () => {
    render(<InputDetails>Content</InputDetails>);

    expect(screen.getByText('Content')).toHaveClass('InputDetails');
  });

  it('should render with custom element type', () => {
    render(<InputDetails elementType="span">Content</InputDetails>);

    expect(screen.getByText('Content').tagName).toBe('SPAN');
  });

  it('should call registerAriaDetails on mount and unmount', () => {
    const registerMock = jest.fn();
    const { unmount } = render(
      <InputDetails id="test-details" registerAriaDetails={registerMock}>
        Content
      </InputDetails>,
    );

    expect(registerMock).toHaveBeenCalledWith({ add: 'test-details' });

    unmount();

    expect(registerMock).toHaveBeenCalledWith({ remove: 'test-details' });
  });
});
