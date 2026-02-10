import { type ElementType, type HTMLProps } from 'react';
import {
  type ChildrenProps,
  type ClickEvents,
  type RouterLinkProps,
  type SpacingProp,
  type SpiritPolymorphicElementPropsWithRef,
  type StyleProps,
  type TransferProps,
} from './shared';

export type TabId = string | number;

export type TabListProps = ChildrenProps & TransferProps;

export interface TabsOnSelectionChange {
  onSelectionChange?: (previousId: TabId, currentId?: TabId) => void;
}

export interface TabItemProps extends ChildrenProps, TransferProps, ClickEvents {
  forTabPane: TabId;
}

export interface SpiritTabsProps extends SpacingProp {
  /** Identification of selected tab */
  selectedId?: TabId;
  /** Identification of tab */
  id?: TabId;
  /** Identification of affected pane */
  forTabPane?: TabId;
}

export interface TabsProps extends ChildrenProps, SpacingProp, TransferProps, TabsOnSelectionChange {
  selectedTab: TabId;
  toggle: TabsToggler;
}

export type TabLinkItemProps = StyleProps & HTMLProps<HTMLLIElement>;

export interface TabLinkBaseProps extends ChildrenProps, StyleProps, TransferProps, RouterLinkProps {
  itemProps?: TabLinkItemProps;
}

export type TabLinkProps<E extends ElementType = 'a'> = {
  /**
   * The HTML element or React element used to render the Link, e.g. 'a'.
   *
   * @default 'a'
   */
  elementType?: E;
} & TabLinkBaseProps;

export type SpiritTabLinkProps<E extends ElementType = 'a'> = TabLinkProps<E> &
  SpiritPolymorphicElementPropsWithRef<E, TabLinkProps<E>>;

export type TabsToggler = (id: TabId) => void;

export interface TabsContextType extends SpacingProp, TabsOnSelectionChange {
  selectedId: TabId;
  selectTab: TabsToggler;
}

export interface TabPaneProps extends ChildrenProps, TransferProps {
  id: TabId;
}

export type TabContentProps = ChildrenProps & TransferProps;

export interface UncontrolledTabsProps extends ChildrenProps, SpacingProp, TransferProps, TabsOnSelectionChange {
  defaultSelectedTab: TabId;
}
