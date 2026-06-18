'use client';

import classNames from 'classnames';
import React, { useRef } from 'react';
import { AlignmentX, AlignmentY } from '../../constants';
import { useIsomorphicLayoutEffect, useStyleProps } from '../../hooks';
import { type SpiritToastProps } from '../../types';
import { showToastPopover } from './showToastPopover';
import { useToastStyleProps } from './useToastStyleProps';

const defaultProps: SpiritToastProps = {
  alignmentX: AlignmentX.CENTER,
  alignmentY: AlignmentY.BOTTOM,
  isCollapsible: true,
};

const Toast = (props: SpiritToastProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, alignmentX, alignmentY, ...restProps } = propsWithDefaults;
  const { classProps, props: modifiedProps } = useToastStyleProps({ ...restProps, alignmentX, alignmentY });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const toastRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    showToastPopover(toastRef.current);
  }, []);

  return (
    <div
      ref={toastRef}
      {...otherProps}
      {...styleProps}
      className={classNames(classProps.root, styleProps.className)}
      // TODO: Remove @ts-expect-error when @types/react is upgraded to 19.x — `popover` is typed in HTMLAttributes.
      // @ts-expect-error -- `popover` is missing from @types/react 18
      popover="manual"
      role="log"
    >
      <div className={classProps.queue}>{children}</div>
    </div>
  );
};

Toast.spiritComponent = 'Toast';

export default Toast;
