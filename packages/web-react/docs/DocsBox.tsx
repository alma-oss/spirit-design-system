'use client';

import classNames from 'classnames';
import React, { type ReactNode } from 'react';
import { type SizesDictionaryType, type StyleProps, useClassNamePrefix, useStyleProps } from '../src';

interface DocsBoxProps extends StyleProps {
  children: ReactNode;
  isMultiline?: boolean;
  size?: SizesDictionaryType;
}

const defaultProps: Partial<DocsBoxProps> = {
  size: 'medium',
};

const DocsBox = (props: DocsBoxProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, isMultiline, size, ...restProps } = propsWithDefaults;
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const docsBoxClass = useClassNamePrefix('docs-Box');
  const sizeClass = `${docsBoxClass}--${size}`;
  const multilineClass = `${docsBoxClass}--multiline`;

  const classProps = classNames(docsBoxClass, {
    [sizeClass]: size,
    [multilineClass]: isMultiline,
  });

  return (
    <div {...styleProps} {...transferProps} className={classNames(classProps, styleProps.className)}>
      {children}
    </div>
  );
};

export default DocsBox;
