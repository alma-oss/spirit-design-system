'use client';

import classNames from 'classnames';
import React from 'react';
import { useStyleProps } from '../../hooks';
import { type ClickEvent, type TabItemProps } from '../../types';
import { useTabContext } from './TabContext';
import { useTabsStyleProps } from './useTabsStyleProps';

const TabItem = ({ children, forTabPane, onClick, ...restProps }: TabItemProps): React.JSX.Element => {
  const { selectTab, selectedId, onSelectionChange } = useTabContext();
  const { classProps } = useTabsStyleProps({ forTabPane, selectedId });
  const { styleProps, props: transferProps } = useStyleProps(restProps);

  const handleClick = (event: ClickEvent) => {
    selectTab(forTabPane);

    if (onClick) {
      onClick(event);
    }

    if (onSelectionChange) {
      onSelectionChange(selectedId, forTabPane);
    }
  };

  return (
    <li className={classProps.item} role="presentation">
      <button
        {...transferProps}
        {...styleProps}
        type="button"
        className={classNames(classProps.link, styleProps.className)}
        role="tab"
        aria-selected={selectedId === forTabPane}
        id={`${forTabPane}-tab`}
        aria-controls={forTabPane.toString()}
        onClick={handleClick}
      >
        {children}
      </button>
    </li>
  );
};

TabItem.spiritComponent = 'TabItem';

export default TabItem;
