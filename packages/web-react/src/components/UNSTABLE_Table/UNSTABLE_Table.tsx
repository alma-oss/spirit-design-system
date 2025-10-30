'use client';

import classNames from 'classnames';
import React, { type ReactElement } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritTableProps } from './types';
import { useUnstableTableStyleProps } from './useUnstableTableStyleProps';

const UNSTABLE_Table = (props: SpiritTableProps): ReactElement => {
  const { children, ...restProps } = props;

  const { classProps, props: modifiedProps } = useUnstableTableStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);

  return (
    <table {...otherProps} className={classNames(classProps.root, styleProps.className)} style={styleProps.style}>
      {children}
    </table>
  );
};

UNSTABLE_Table.spiritComponent = 'UNSTABLE_Table';

export default UNSTABLE_Table;
