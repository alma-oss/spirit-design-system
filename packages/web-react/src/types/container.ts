import type {
  ChildrenProps,
  ContainerSizesType,
  DataAttributeProps,
  SpiritDivElementProps,
  StyleProps,
  TextAlignmentType,
} from './shared';

export interface ContainerProps
  extends ChildrenProps, ContainerTextStyleProps, DataAttributeProps, StyleProps, SpiritDivElementProps {}

export type ContainerSize<C> = ContainerSizesType | C;

export interface ContainerTextStyleProps {
  textAlignment?: TextAlignmentType;
}

export interface SpiritContainerProps<C = void> extends ContainerProps {
  isFluid?: boolean;
  size?: ContainerSize<C>;
}
