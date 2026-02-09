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
export type SpiritAccordionProps<E extends ElementType = 'section'> = PolymorphicComponentProps<E, AccordionProps>;
export type SpiritAccordionHeaderProps<E extends ElementType = 'h3'> = PolymorphicComponentProps<
  E,
  AccordionHeaderProps
>;
export type SpiritAccordionItemProps<E extends ElementType = 'article'> = PolymorphicComponentProps<
  E,
  AccordionItemProps
>;
export type SpiritUncontrolledAccordionProps<E extends ElementType = 'section'> = PolymorphicComponentProps<
  E,
  UncontrolledAccordionProps
>;
