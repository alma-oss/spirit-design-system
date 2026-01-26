import { type ElementType } from 'react';
import { type ContainerProps } from './container';
import {
  type BackgroundColorsDictionaryType,
  type ChildrenProps,
  type PolymorphicComponentProps,
  type SingleOrResponsive,
  type SizeExtendedDictionaryType,
  type SpaceToken,
  type StyleProps,
  type TextAlignmentType,
} from './shared';

/** ===== BASE API ===== */
export interface SectionBaseProps extends ChildrenProps, StyleProps {}

/** ===== STYLE API ===== */
export interface SectionStyleProps<S = void> extends SectionBaseProps {
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

/** ===== INTERNAL API ===== */
export interface SectionProps<S = void> extends SectionStyleProps<S> {}

/** ===== PUBLIC API ===== */
export type SpiritSectionProps<E extends ElementType = 'section', S = void> = PolymorphicComponentProps<
  E,
  SectionProps<S>
>;
