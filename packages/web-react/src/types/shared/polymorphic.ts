import {
  type ComponentPropsWithRef,
  type ElementType,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';

/**
 * Polymorphic component props type
 *
 * Creates a type that combines:
 * - Component-specific props (Props)
 * - All props from the element type (E)
 * - An optional `elementType` prop to change the rendered element
 *
 * This is a simplified approach inspired by Chakra UI and other modern React libraries.
 *
 * @example
 * ```tsx
 * interface ButtonBaseProps {
 *   color?: 'primary' | 'secondary';
 *   size?: 'small' | 'medium' | 'large';
 * }
 *
 * type ButtonProps<E extends ElementType = 'button'> =
 *   PolymorphicComponentProps<E, ButtonBaseProps>;
 *
 * // Usage
 * <Button color="primary" size="medium" /> // renders <button>
 * <Button elementType="a" href="/link" color="primary" /> // renders <a>
 * ```
 */
export type PolymorphicComponentProps<E extends ElementType, Props = object> = Props &
  Omit<ComponentPropsWithRef<E>, keyof Props | 'elementType'> & {
    /**
     * The HTML element or React component to render.
     * When changed, the component will render as the specified element
     * while preserving all component-specific behavior.
     */
    elementType?: E;
  };

/**
 * Static properties that all Spirit components should have
 * Used by both PolymorphicComponent and ForwardRefComponent
 */
export type ComponentStaticProps = {
  spiritComponent: string;
  displayName: string;
};

/**
 * Type for polymorphic component with React component metadata
 *
 * Note: E extends ElementType (not E extends T) because we want to allow
 * ANY element type, not just subtypes of T. The T parameter is only used
 * as the default element type.
 *
 * Example: Accordion has T='section' as default, but users should be able
 * to pass elementType="article" or elementType="div" etc.
 */
export type PolymorphicComponent<E extends ElementType, Props> = (<T extends ElementType = E>(
  props: PolymorphicComponentProps<T, Props> & { ref?: PolymorphicRef<T> },
) => JSX.Element) &
  ComponentStaticProps;

/**
 * Extract the correct ref type for a polymorphic component
 *
 * This helper ensures that refs are properly typed based on the element type.
 * For example, when `elementType="a"`, the ref will be typed as `HTMLAnchorElement`.
 *
 * @example
 * ```tsx
 * const ButtonInner = <E extends ElementType = 'button'>(
 *   props: ButtonProps<E>,
 *   ref: PolymorphicRef<E>
 * ) => {
 *   // ref is correctly typed as Ref<HTMLButtonElement> by default
 *   // or Ref<HTMLAnchorElement> when T is 'a'
 * };
 * ```
 */
export type PolymorphicRef<E extends ElementType> = ComponentPropsWithRef<E>['ref'];

/**
 * Type for non-polymorphic Spirit component with forward ref and static properties
 *
 * Use this type for components that:
 * - Use forwardRef but do NOT support elementType/polymorphism
 * - Need spiritComponent and displayName static properties
 * - Render a fixed HTML element type (e.g., always <input>, <textarea>, <a>)
 *
 * @template E - The HTML element type (e.g., HTMLInputElement, HTMLTextAreaElement)
 * @template Props - The component's props interface
 *
 * @example
 * ```tsx
 * const Checkbox: ForwardRefComponent<HTMLInputElement, SpiritCheckboxProps> =
 *   forwardRef<HTMLInputElement, SpiritCheckboxProps>(_Checkbox) as ForwardRefComponent<HTMLInputElement, SpiritCheckboxProps>;
 * Checkbox.spiritComponent = 'Checkbox';
 * Checkbox.displayName = 'Checkbox';
 * ```
 */
export type ForwardRefComponent<E, Props> = ForwardRefExoticComponent<Props & RefAttributes<E>> & ComponentStaticProps;
