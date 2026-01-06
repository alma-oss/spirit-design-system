'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type AlertProps, type PolymorphicComponent, type SpiritAlertProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { Icon } from '../Icon';
import { useAlertIcon } from './useAlertIcon';
import { useAlertStyleProps } from './useAlertStyleProps';

const defaultProps = {
  color: 'success',
  isCentered: false,
  elementType: 'div',
};

const _Alert = <E extends ElementType = 'div', C = void>(props: SpiritAlertProps<E, C>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, color, iconName, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = useAlertStyleProps({ color, ...restProps });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });
  const alertIconName = useAlertIcon({ color, iconName, ...otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      <Icon name={alertIconName} />
      <div>{children}</div>
    </Component>
  );
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(_Alert) as unknown as PolymorphicComponent<'div', AlertProps>;

Alert.spiritComponent = 'Alert';
Alert.displayName = 'Alert';

export default Alert;
