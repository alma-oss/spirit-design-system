'use client';

import classNames from 'classnames';
import React, { type ReactNode } from 'react';
import { type StyleProps, useStyleProps } from '../src';

interface DocsStackProps extends StyleProps {
  children: ReactNode;
  stackAlignment?: 'start' | 'center' | 'end' | 'stretch';
}

const defaultProps: Partial<DocsStackProps> = {
  stackAlignment: undefined,
};

const DocsStack = (props: DocsStackProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, stackAlignment, ...restProps } = propsWithDefaults;
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const alignmentClass = stackAlignment ? `docs-Stack--${stackAlignment}` : '';

  return (
    <div {...styleProps} {...transferProps} className={classNames('docs-Stack', alignmentClass, styleProps.className)}>
      {children}
    </div>
  );
};

export default DocsStack;
