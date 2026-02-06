import { type ElementType, type ReactNode } from 'react';
import { type ChildrenProps, type PolymorphicComponentProps, type StyleProps } from './shared';

/** ===== BASE API ===== */
export type AccordionOpenStateType = string | string[] | undefined;

export interface AccordionState {
  open: AccordionOpenStateType;
  toggle: (id: string) => void;
}

export interface AccordionItemContextProps {
  id: string;
}

export interface AccordionStateProps {
  /** Initial open state */
  defaultOpen?: AccordionOpenStateType;
  /** Whether to allow multiple items open at once */
  stayOpen?: boolean;
}

export interface AccordionBaseProps extends ChildrenProps, StyleProps {}

/** ===== STYLE API ===== */
export interface AccordionStyleProps extends AccordionBaseProps, AccordionState {}

/** ===== INTERNAL API ===== */
export interface AccordionProps extends AccordionStyleProps {}
export interface AccordionHeaderProps extends AccordionBaseProps {
  slot?: ReactNode;
}
export interface AccordionItemProps extends AccordionBaseProps, AccordionItemContextProps {}
export interface AccordionContentProps extends AccordionBaseProps {}
/**
 * Props for UncontrolledAccordion component.
 * Similar structure to AccordionProps but uses uncontrolled-specific props instead of state props.
 * When you destructure and omit defaultOpen and stayOpen,
 * the remaining props are exactly what Accordion expects (base props + HTML attrs).
 */
export type UncontrolledAccordionProps = AccordionBaseProps & AccordionStateProps;

/** ===== PUBLIC API ===== */
export type SpiritAccordionProps<T extends ElementType = 'section'> = PolymorphicComponentProps<T, AccordionProps>;
export type SpiritAccordionHeaderProps<T extends ElementType = 'h3'> = PolymorphicComponentProps<
  T,
  AccordionHeaderProps
>;
export type SpiritAccordionItemProps<T extends ElementType = 'article'> = PolymorphicComponentProps<
  T,
  AccordionItemProps
>;
export type SpiritUncontrolledAccordionProps<T extends ElementType = 'section'> = PolymorphicComponentProps<
  T,
  UncontrolledAccordionProps
>;
