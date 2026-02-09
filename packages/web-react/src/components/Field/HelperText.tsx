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
  const {
    helperText,
    elementType: ElementTag = defaultProps.elementType as ElementType,
    id,
    registerAria,
    ...restProps
  } = propsWithDefaults;
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { styleProps, transferProps });

  useEffect(() => {
    helperText && registerAria?.({ add: id });

    return () => {
      registerAria?.({ remove: id });
    };
  }, [helperText, id, registerAria]);

  if (helperText) {
    return (
      <ElementTag {...transferProps} {...mergedStyleProps} id={id}>
        {helperText}
      </ElementTag>
    );
  }

  return null;
};

HelperText.spiritComponent = 'HelperText';

export default HelperText;
