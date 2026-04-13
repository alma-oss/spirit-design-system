import { renderHook } from '@testing-library/react';
import { useClick } from '../../../hooks';
import { useButtonProps } from '../useButtonProps';

jest.mock('../../../hooks', () => {
  const actual = jest.requireActual('../../../hooks');

  return {
    ...actual,
    useClick: jest.fn(),
  };
});

describe('useButtonProps', () => {
  const mockedUseClick = useClick as jest.MockedFunction<typeof useClick>;

  beforeEach(() => {
    mockedUseClick.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should keep type for button elementType', () => {
    const { result } = renderHook(() => useButtonProps({ elementType: 'button', type: 'submit' }));

    expect(result.current.buttonProps.type).toBe('submit');
  });

  it('should not set type for non-button elementType', () => {
    const { result } = renderHook(() => useButtonProps({ elementType: 'a', type: 'submit' }));

    expect(result.current.buttonProps.type).toBeUndefined();
  });
});
