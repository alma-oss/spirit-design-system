'use client';

import React, { type ElementType, useEffect } from 'react';
import { useStyleProps } from '../../hooks';
import { mergeStyleProps } from '../../utils';
import { type HelperTextProps } from './types';

const defaultProps: Partial<HelperTextProps> = {
  elementType: 'div',
  id: undefined,
  registerAria: undefined,
};

const HelperText = <E extends ElementType = 'div'>(props: HelperTextProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { helperText, elementType, id, registerAria, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { styleProps, transferProps });

  useEffect(() => {
    helperText && registerAria?.({ add: id });

    return () => {
      registerAria?.({ remove: id });
    };
  }, [helperText, id, registerAria]);

  if (helperText) {
    return (
      <Component {...transferProps} {...mergedStyleProps} id={id}>
        {helperText}
      </Component>
    );
  }

  return null;
};

HelperText.spiritComponent = 'HelperText';
HelperText.displayName = 'HelperText';

export default HelperText;
