import {
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  type DetailedHTMLProps,
  type ElementType,
  type HTMLAttributes,
  type HTMLProps,
  type PropsWithChildren,
} from 'react';
import { type PolymorphicRef } from './polymorphic';
import { type OverloadStyleProps } from './style';

type ElementTypeProp<E extends ElementType> = {
  elementType?: E;
};

// DistributiveOmit distributes over union types, which helps with component type inference
type DistributiveOmit<T, U> = T extends unknown ? Pick<T, Exclude<keyof T, U>> : never;

/**
 * Extracts props from an element type, handling both HTML elements and React components.
 * For components with a spiritDefaultElement marker:
 * - If spiritDefaultProps is available, use that (component's props constrained to default element)
 * - Otherwise, use default element props intersected with component props
 * This allows component-specific props like backgroundColor while rejecting invalid element props like method.
 */
type PropsOf<E extends ElementType> = E extends { spiritDefaultElement: infer D; spiritDefaultProps: infer P }
  ? D extends ElementType
    ? P extends ComponentPropsWithRef<ElementType>
      ? // Use the component's props when constrained to default element (includes backgroundColor, excludes method)
        P & ComponentPropsWithRef<D>
      : // Fallback: use default element props intersected with component props
        ComponentPropsWithRef<D> & ComponentPropsWithRef<E>
    : ComponentPropsWithRef<E>
  : E extends { spiritDefaultElement: infer D }
    ? D extends ElementType
      ? // No default props marker, use intersection
        ComponentPropsWithRef<D> & ComponentPropsWithRef<E>
      : ComponentPropsWithRef<E>
    : ComponentPropsWithRef<E>;

export type SpiritPolymorphicComponentProp<E extends ElementType, P> = PropsWithChildren<
  ElementTypeProp<E> & P & DistributiveOmit<PropsOf<E>, keyof P | keyof ElementTypeProp<E> | 'ref'>
>;

export type SpiritPolymorphicComponentPropWithRef<E extends ElementType, P> = SpiritPolymorphicComponentProp<E, P> & {
  ref?: PolymorphicRef<E>;
};

/** Returns all relevant attributes and their types from a given HTML Element */
export type SpiritDetailedHTMLProps<E> = DetailedHTMLProps<HTMLAttributes<E>, E>;
/** Returns all relevant attributes and their types, combined basic and detailed, from a given HTML Element */
export type SpiritCombinedHTMLProps<E> = DetailedHTMLProps<HTMLAttributes<E>, E> & HTMLProps<E>;
/** Returns the appropriate elementary props based on the element's polymorphic type and excludes any duplicates from it */
export type SpiritPolymorphicElementPropsWithRef<E extends ElementType, P> = Omit<ComponentPropsWithRef<E>, keyof P>;
/** Returns the appropriate elementary props based on the element's polymorphic type and excludes any duplicates from it */
export type SpiritPolymorphicElementPropsWithoutRef<E extends ElementType, P> = Omit<
  ComponentPropsWithoutRef<E>,
  keyof P
>;

export type SpiritElementBaseProps = SpiritDetailedHTMLProps<HTMLElement>;
export type SpiritAnchorElementBaseProps = SpiritCombinedHTMLProps<HTMLButtonElement>;
export type SpiritButtonElementBaseProps = SpiritCombinedHTMLProps<HTMLButtonElement>;
export type SpiritDialogElementBaseProps = SpiritDetailedHTMLProps<HTMLDialogElement>;
export type SpiritDivElementBaseProps = SpiritDetailedHTMLProps<HTMLDivElement>;
export type SpiritInputElementBaseProps = SpiritCombinedHTMLProps<HTMLInputElement>;
export type SpiritLItemElementBaseProps = SpiritDetailedHTMLProps<HTMLLIElement>;
export type SpiritSelectElementBaseProps = SpiritCombinedHTMLProps<HTMLSelectElement>;
export type SpiritSpanElementBaseProps = SpiritDetailedHTMLProps<HTMLSpanElement>;
export type SpiritTextAreaElementBaseProps = SpiritCombinedHTMLProps<HTMLTextAreaElement>;
export type SpiritUListElementBaseProps = SpiritDetailedHTMLProps<HTMLUListElement>;
export type SpiritFieldGroupElementBaseProps = SpiritDetailedHTMLProps<HTMLFieldSetElement>;

export type SpiritElementProps = OverloadStyleProps<SpiritElementBaseProps>;
export type SpiritAnchorElementProps = OverloadStyleProps<SpiritAnchorElementBaseProps>;
export type SpiritButtonElementProps = OverloadStyleProps<SpiritButtonElementBaseProps>;
export type SpiritDialogElementProps = OverloadStyleProps<SpiritDialogElementBaseProps>;
export type SpiritDivElementProps = OverloadStyleProps<SpiritDivElementBaseProps>;
export type SpiritInputElementProps = Omit<
  OverloadStyleProps<SpiritInputElementBaseProps>,
  'required' | 'disabled' | 'type'
>;
export type SpiritLItemElementProps = OverloadStyleProps<SpiritLItemElementBaseProps>;
export type SpiritSelectElementProps = Omit<OverloadStyleProps<SpiritSelectElementBaseProps>, 'required' | 'disabled'>;
export type SpiritSpanElementProps = OverloadStyleProps<SpiritSpanElementBaseProps>;
export type SpiritTextAreaElementProps = Omit<
  OverloadStyleProps<SpiritTextAreaElementBaseProps>,
  'required' | 'disabled'
>;
export type SpiritUListElementProps = OverloadStyleProps<SpiritUListElementBaseProps>;
export type SpiritFieldGroupElementProps = OverloadStyleProps<SpiritFieldGroupElementBaseProps>;

export type SpiritInputElementPropsWithRef = Omit<
  SpiritInputElementProps & ComponentPropsWithRef<'input'>,
  'id' | 'label'
>;
export type SpiritSelectElementPropsWithRef = Omit<
  SpiritSelectElementProps & ComponentPropsWithRef<'select'>,
  'id' | 'label'
>;
export type SpiritTextAreaElementPropsWithRef = Omit<
  SpiritTextAreaElementProps & ComponentPropsWithRef<'textarea'>,
  'id' | 'label'
>;
export type SpiritDialogElementPropsWithRef = Omit<
  SpiritDialogElementProps & ComponentPropsWithRef<'dialog'>,
  'onClose'
>;
export type SpiritFieldGroupElementPropsWithRef = Omit<
  SpiritFieldGroupElementProps & ComponentPropsWithRef<'fieldset'>,
  'id'
>;
