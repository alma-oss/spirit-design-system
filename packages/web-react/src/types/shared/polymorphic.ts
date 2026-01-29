import { type ComponentPropsWithRef, type ElementType } from 'react';

/**
 * Static properties that all Spirit components should have
 */
export interface SpiritComponentStaticProps {
  spiritComponent: string;
  displayName: string;
}

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
 * type ButtonProps<T extends ElementType = 'button'> =
 *   PolymorphicComponentProps<T, ButtonBaseProps>;
 *
 * // Usage
 * <Button color="primary" size="medium" /> // renders <button>
 * <Button elementType="a" href="/link" color="primary" /> // renders <a>
 * ```
 */
export type PolymorphicComponentProps<
  E extends ElementType,
  Props = object,
> = Props &
  Omit<ComponentPropsWithRef<E>, keyof Props | 'elementType'> & {
    /**
     * The HTML element or React component to render.
     * When changed, the component will render as the specified element
     * while preserving all component-specific behavior.
     */
    elementType?: E;
  };

/**
 * Extract the correct ref type for a polymorphic component
 *
 * This helper ensures that refs are properly typed based on the element type.
 * For example, when `elementType="a"`, the ref will be typed as `HTMLAnchorElement`.
 *
 * @example
 * ```tsx
 * const ButtonInner = <T extends ElementType = 'button'>(
 *   props: ButtonProps<T>,
 *   ref: PolymorphicRef<T>
 * ) => {
 *   // ref is correctly typed as Ref<HTMLButtonElement> by default
 *   // or Ref<HTMLAnchorElement> when T is 'a'
 * };
 * ```
 */
export type PolymorphicRef<E extends ElementType> = ComponentPropsWithRef<E>['ref'];
