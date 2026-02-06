import { type ElementType, type HTMLProps } from 'react';
import {
  type ChildrenProps,
  type ClickEvents,
  type PolymorphicComponentProps,
  type SpacingProp,
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

/** ===== BASE API ===== */
export interface TabLinkBaseProps extends ChildrenProps, StyleProps, TransferProps {}

/** ===== STYLE API ===== */
export interface TabLinkStyleProps extends TabLinkBaseProps {
  itemProps?: TabLinkItemProps;
}

/** ===== INTERNAL API ===== */
export interface TabLinkProps extends TabLinkStyleProps {}

/** ===== PUBLIC API ===== */
export type SpiritTabLinkProps<E extends ElementType = 'a'> = PolymorphicComponentProps<E, TabLinkProps>;

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
