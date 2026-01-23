import { render } from '@testing-library/react';
import React, { type FC, useEffect } from 'react';
import '@testing-library/jest-dom';
import useAriaIds from '../useAriaIds';

describe('useAriaIds', () => {
  it('should initialize with an empty array of ids', () => {
    const TestComponent: FC = () => {
      const [ids, register] = useAriaIds();

      useEffect(() => {
        register({ add: 'test-id' });
      }, [register]);

      return <div data-testid="ids-container">{ids.join(' ')}</div>;
    };

    const { getByTestId } = render(<TestComponent />);
    const idsElement = getByTestId('ids-container');

    expect(idsElement).toHaveTextContent('test-id');
  });
});
