import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { PropsProvider, useContextProps } from '../PropsContext';

type ContextValue = Record<string, unknown>;

const createWrapper =
  (...values: ContextValue[]) =>
  ({ children }: { children: ReactNode }) =>
    values.reduceRight<ReactNode>((acc, value) => <PropsProvider value={value}>{acc}</PropsProvider>, children);

describe('useContextProps', () => {
  it('should return the passed props when no context is provided', () => {
    const { result } = renderHook(() => useContextProps({ color: 'primary' }, 'button'));

    expect(result.current).toEqual({ color: 'primary' });
  });

  it('should merge namespace props with the passed props', () => {
    const { result } = renderHook(() => useContextProps<ContextValue>({ size: 'small' }, 'button'), {
      wrapper: createWrapper({ button: { color: 'primary' } }),
    });

    expect(result.current).toEqual({ color: 'primary', size: 'small' });
  });

  it('should not consume props from a different namespace', () => {
    const { result } = renderHook(() => useContextProps<ContextValue>({}, 'button'), {
      wrapper: createWrapper({ label: { isLabelHidden: true } }),
    });

    expect(result.current).toEqual({});
  });

  it('should apply global props regardless of the namespace', () => {
    const { result } = renderHook(() => useContextProps<ContextValue>({}, 'label'), {
      wrapper: createWrapper({
        isDisabled: true,
        isRequired: true,
        validationState: 'danger',
        button: { color: 'primary' },
      }),
    });

    expect(result.current).toEqual({ isDisabled: true, isRequired: true, validationState: 'danger' });
  });

  it('should not treat non-allowlisted top-level props as global', () => {
    const { result } = renderHook(() => useContextProps<ContextValue>({}, 'label'), {
      wrapper: createWrapper({ size: 'medium' }),
    });

    expect(result.current).toEqual({});
  });

  describe('namespace groups', () => {
    it('should apply a group prop to a member namespace', () => {
      const { result } = renderHook(() => useContextProps<ContextValue>({}, 'label'), {
        wrapper: createWrapper({ inlineElements: { elementType: 'span' } }),
      });

      expect(result.current).toEqual({ elementType: 'span' });
    });

    it('should not apply a group prop to a non-member namespace', () => {
      const { result } = renderHook(() => useContextProps<ContextValue>({}, 'button'), {
        wrapper: createWrapper({ inlineElements: { elementType: 'span' } }),
      });

      expect(result.current).toEqual({});
    });

    it('should prefer namespace props over group props', () => {
      const { result } = renderHook(() => useContextProps<ContextValue>({}, 'label'), {
        wrapper: createWrapper({ inlineElements: { elementType: 'span' }, label: { elementType: 'strong' } }),
      });

      expect(result.current).toEqual({ elementType: 'strong' });
    });

    it('should prefer group props over global props', () => {
      const { result } = renderHook(() => useContextProps<ContextValue>({}, 'inputContainer'), {
        wrapper: createWrapper({ isDisabled: true, formFields: { isDisabled: false } }),
      });

      expect(result.current).toEqual({ isDisabled: false });
    });

    it('should prefer direct props over group props', () => {
      const { result } = renderHook(() => useContextProps<ContextValue>({ elementType: 'p' }, 'validationText'), {
        wrapper: createWrapper({ inlineElements: { elementType: 'span' } }),
      });

      expect(result.current).toEqual({ elementType: 'p' });
    });
  });

  describe('precedence (direct props > namespace props > global props)', () => {
    it('should prefer namespace props over global props', () => {
      const { result } = renderHook(() => useContextProps<ContextValue>({}, 'button'), {
        wrapper: createWrapper({ isDisabled: true, button: { isDisabled: false } }),
      });

      expect(result.current).toEqual({ isDisabled: false });
    });

    it('should prefer direct props over namespace and global props', () => {
      const { result } = renderHook(() => useContextProps<ContextValue>({ isDisabled: false }, 'button'), {
        wrapper: createWrapper({ isDisabled: true, button: { isDisabled: true } }),
      });

      expect(result.current).toEqual({ isDisabled: false });
    });

    it('should prefer namespace props over the global validationState', () => {
      const { result } = renderHook(() => useContextProps<ContextValue>({}, 'validationText'), {
        wrapper: createWrapper({ validationState: 'danger', validationText: { validationState: 'warning' } }),
      });

      expect(result.current).toEqual({ validationState: 'warning' });
    });

    it('should prefer direct validationState over namespace and global props', () => {
      const { result } = renderHook(
        () => useContextProps<ContextValue>({ validationState: 'success' }, 'validationText'),
        {
          wrapper: createWrapper({ validationState: 'danger', validationText: { validationState: 'warning' } }),
        },
      );

      expect(result.current).toEqual({ validationState: 'success' });
    });
  });

  describe('namespace resolution', () => {
    it('should fall back to the default namespace when no propsContext prop is passed', () => {
      const { result } = renderHook(() => useContextProps<ContextValue>({}, 'button'), {
        wrapper: createWrapper({ button: { color: 'primary' } }),
      });

      expect(result.current).toEqual({ color: 'primary' });
    });

    it('should override the default namespace with the propsContext prop', () => {
      const { result } = renderHook(() => useContextProps<ContextValue>({ propsContext: 'header' }, 'button'), {
        wrapper: createWrapper({ button: { color: 'primary' }, header: { color: 'secondary' } }),
      });

      expect(result.current).toEqual({ color: 'secondary' });
    });

    it('should strip the propsContext addressing prop from the result', () => {
      const { result } = renderHook(() => useContextProps<ContextValue>({ propsContext: 'button' }), {
        wrapper: createWrapper({ button: { color: 'primary' } }),
      });

      expect(result.current).not.toHaveProperty('propsContext');
      expect(result.current).toEqual({ color: 'primary' });
    });
  });

  it('should strip nullish values so component defaults can apply', () => {
    const { result } = renderHook(() => useContextProps<ContextValue>({ color: undefined }, 'button'), {
      wrapper: createWrapper({ button: { size: null } }),
    });

    expect(result.current).toEqual({});
  });
});

describe('PropsProvider', () => {
  it('should deep-merge namespace props from nested providers', () => {
    const { result } = renderHook(() => useContextProps<ContextValue>({}, 'button'), {
      wrapper: createWrapper({ button: { size: 'large' } }, { button: { color: 'primary' } }),
    });

    expect(result.current).toEqual({ size: 'large', color: 'primary' });
  });

  it('should let a nested provider override an inherited namespace prop', () => {
    const { result } = renderHook(() => useContextProps<ContextValue>({}, 'button'), {
      wrapper: createWrapper({ button: { size: 'large' } }, { button: { size: 'small' } }),
    });

    expect(result.current).toEqual({ size: 'small' });
  });

  it('should delete an inherited global prop when a nested provider sets it to null', () => {
    const { result } = renderHook(() => useContextProps<ContextValue>({}, 'label'), {
      wrapper: createWrapper({ isDisabled: true }, { isDisabled: null }),
    });

    expect(result.current).toEqual({});
  });

  it('should clear an inherited namespace prop when a nested provider nulls it (StackItem pattern)', () => {
    const { result } = renderHook(() => useContextProps<ContextValue>({}, 'stackItem'), {
      wrapper: createWrapper({ stackItem: { elementType: 'li' } }, { stackItem: { elementType: null } }),
    });

    expect(result.current).toEqual({});
  });
});
