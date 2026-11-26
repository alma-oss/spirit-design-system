'use client';

import classNames from 'classnames';
import React from 'react';
import { useStyleProps } from '../../hooks';
import { type TabPaneProps } from '../../types';
import { useTabContext } from './TabContext';
import { useTabsStyleProps } from './useTabsStyleProps';

const TabPane = ({ children, id, ...restProps }: TabPaneProps): React.JSX.Element | null => {
  const { selectedId } = useTabContext();
  const { classProps } = useTabsStyleProps({ id, selectedId });
  const { styleProps, props: transferProps } = useStyleProps(restProps);

  return selectedId === id ? (
    <div
      {...transferProps}
      {...styleProps}
      id={id.toString()}
      className={classNames(classProps.pane, styleProps.className)}
      role="tabpanel"
      aria-labelledby={`${id}-tab`}
    >
      {children}
    </div>
  ) : null;
};

TabPane.spiritComponent = 'TabPane';

export default TabPane;
