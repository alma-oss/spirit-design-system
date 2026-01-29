import { type ElementType } from 'react';
import { type ContainerProps } from './container';
import {
  type BackgroundColorsDictionaryType,
  type ChildrenProps,
  type PolymorphicComponentProps,
  type PolymorphicRef,
  type SingleOrResponsive,
  type SizeExtendedDictionaryType,
  type SpaceToken,
  type StyleProps,
  type TextAlignmentType,
} from './shared';

export interface SectionCustomProps<S = void> {
  /** Container props to pass to the container component. */
  containerProps?: ContainerProps;
  /** Whether the section should have a container. */
  hasContainer?: boolean;
  /** The background color of the section. */
  backgroundColor?: BackgroundColorsDictionaryType;
  /** Vertical padding of the section. */
  paddingY?: SingleOrResponsive<SpaceToken>;
  /** Padding top of the section. */
  paddingTop?: SingleOrResponsive<SpaceToken>;
  /** Padding bottom of the section. */
  paddingBottom?: SingleOrResponsive<SpaceToken>;
  /** Size of the section. */
  size?: SizeExtendedDictionaryType | S;
  /** Text alignment of the section */
  textAlignment?: TextAlignmentType;
}

export interface SectionBaseProps<S = void> extends ChildrenProps, StyleProps, SectionCustomProps<S> {}

export type SectionProps<E extends ElementType = 'section', S = void> = PolymorphicComponentProps<E, SectionBaseProps<S>>;

/** @deprecated Use SectionProps instead */
export type SpiritSectionProps<E extends ElementType = 'section', S = void> = SectionProps<E, S>;

/**
 * @internal
 * Helper type to get the correct ref type for a Section component
 */
export type SectionRef<E extends ElementType = 'section'> = PolymorphicRef<E>;
