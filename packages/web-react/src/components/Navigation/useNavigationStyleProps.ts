import classNames from 'classnames';
import { AlignmentYExtended, Direction, ShapeVariants } from '../../constants';
import { type AlignmentPropertyType, useAlignmentClass, useClassNamePrefix } from '../../hooks';
import {
  type DirectionDictionaryType,
  type NavigationActionVariantsType,
  type SpiritNavigationActionProps,
  type SpiritNavigationItemAlignmentYType,
  type SpiritNavigationItemProps,
} from '../../types';

export interface UseNavigationStyleProps {
  alignmentY?: SpiritNavigationItemAlignmentYType;
  direction?: DirectionDictionaryType;
  isDisabled?: boolean;
  isSelected?: boolean;
  isSquare?: boolean;
  variant?: NavigationActionVariantsType;
}

export interface UseNavigationStyleReturn {
  classProps: {
    root: string;
    action: string;
    avatar: string;
    item: string;
    slot: string;
  };
  props: SpiritNavigationItemProps | SpiritNavigationActionProps;
}

export const useNavigationStyleProps = ({
  isDisabled = false,
  isSelected = false,
  isSquare = false,
  alignmentY = AlignmentYExtended.CENTER,
  direction = Direction.HORIZONTAL,
  variant = ShapeVariants.BOX,
  ...restProps
}: UseNavigationStyleProps): UseNavigationStyleReturn => {
  const navigationClass = useClassNamePrefix('Navigation');
  const navigationActionClass = `${navigationClass}Action`;
  const navigationAvatarClass = `${navigationClass}Avatar`;
  const navigationItemClass = `${navigationClass}Item`;

  const navigationDirectionClass = `${navigationClass}--${direction}`;
  const navigationActionDisabledClass = `${navigationActionClass}--disabled`;
  const navigationActionSelectedClass = `${navigationActionClass}--selected`;
  const navigationActionVariantClass = `${navigationActionClass}--${variant}`;

  const navigationAvatarSquareClass = `${navigationAvatarClass}--square`;
  const navigationActionSlotClass = `${navigationActionClass}__slot`;

  const navigationItemClasses = classNames(navigationItemClass, {
    [useAlignmentClass(navigationItemClass, alignmentY as AlignmentPropertyType, 'alignmentY')]: alignmentY,
  });

  const classProps = {
    root: classNames(navigationClass, navigationDirectionClass),
    action: classNames(navigationActionClass, navigationActionVariantClass, {
      [navigationActionDisabledClass]: isDisabled,
      [navigationActionSelectedClass]: isSelected,
    }),
    avatar: classNames(navigationAvatarClass, {
      [navigationAvatarSquareClass]: isSquare,
    }),
    item: navigationItemClasses,
    slot: navigationActionSlotClass,
  };

  return {
    classProps,
    props: restProps,
  };
};
