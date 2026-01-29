import { type ElementType, type ReactNode } from 'react';
import {
  type ChildrenProps,
  type PolymorphicComponentProps,
  type PolymorphicRef,
  type StyleProps,
} from './shared';

export type AccordionOpenStateType = string | string[] | undefined;

export interface AccordionHandlingProps {
  open: AccordionOpenStateType;
  toggle: (id: string) => void;
}

export interface AccordionItemContextProps {
  id: string;
}

export interface BaseAccordionProps extends ChildrenProps, StyleProps {}

export interface AccordionBaseProps extends BaseAccordionProps, AccordionHandlingProps {}

export type AccordionProps<T extends ElementType = 'section'> = PolymorphicComponentProps<T, AccordionBaseProps>;

/** @deprecated Use AccordionProps instead */
export type SpiritAccordionProps<T extends ElementType = 'section'> = AccordionProps<T>;

/**
 * @internal
 * Helper type to get the correct ref type for an Accordion component
 */
export type AccordionRef<T extends ElementType = 'section'> = PolymorphicRef<T>;

export type AccordionHeaderProps<T extends ElementType = 'h3'> = PolymorphicComponentProps<
  T,
  BaseAccordionProps & {
    slot?: ReactNode;
  }
>;

/** @deprecated Use AccordionHeaderProps instead */
export type SpiritAccordionHeaderProps<T extends ElementType = 'h3'> = AccordionHeaderProps<T>;

/**
 * @internal
 * Helper type to get the correct ref type for an AccordionHeader component
 */
export type AccordionHeaderRef<T extends ElementType = 'h3'> = PolymorphicRef<T>;

export interface AccordionItemBaseProps extends BaseAccordionProps, AccordionItemContextProps {}

export type AccordionItemProps<T extends ElementType = 'article'> = PolymorphicComponentProps<T, AccordionItemBaseProps>;

/** @deprecated Use AccordionItemProps instead */
export type SpiritAccordionItemProps<T extends ElementType = 'article'> = AccordionItemProps<T>;

/**
 * @internal
 * Helper type to get the correct ref type for an AccordionItem component
 */
export type AccordionItemRef<T extends ElementType = 'article'> = PolymorphicRef<T>;

export interface AccordionContentProps extends BaseAccordionProps {}

export interface UncontrolledAccordionBaseProps extends BaseAccordionProps {
  defaultOpen?: AccordionOpenStateType;
  stayOpen?: boolean;
}

export type UncontrolledAccordionProps<T extends ElementType = 'section'> = PolymorphicComponentProps<
  T,
  UncontrolledAccordionBaseProps
>;

/** @deprecated Use UncontrolledAccordionProps instead */
export type SpiritUncontrolledAccordionProps<T extends ElementType = 'section'> = UncontrolledAccordionProps<T>;
