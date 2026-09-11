'use client';

import classNames from 'classnames';
import React, { type CSSProperties, type ComponentPropsWithRef, type ForwardedRef, forwardRef } from 'react';
import { type ForwardRefComponent } from '../../types';

type ProgressProps = ComponentPropsWithRef<'progress'> & {
  /** Consumer style props merged onto the native element when it is the outermost node. */
  styleProps?: {
    className?: string;
    style?: CSSProperties;
  };
};

const _Progress = (props: ProgressProps, ref: ForwardedRef<HTMLProgressElement>) => {
  const { className, style, styleProps, ...restProps } = props;

  return (
    <progress
      {...restProps}
      className={classNames(className, styleProps?.className)}
      ref={ref}
      style={{
        ...style,
        ...styleProps?.style,
      }}
    />
  );
};

const Progress = forwardRef<HTMLProgressElement, ProgressProps>(_Progress) as ForwardRefComponent<
  HTMLProgressElement,
  ProgressProps
>;

Progress.displayName = 'Progress';

export default Progress;
