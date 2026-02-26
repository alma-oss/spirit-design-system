import classNames from 'classnames';
import { CLASS_NAME_OPEN } from '../../constants';
import { type AlignmentPropertyType, useAlignmentClass, useClassNamePrefix } from '../../hooks';
import { type DropdownStyleProps } from '../../types';
import { getPlacementClassName } from '../../utils';

export interface UseDropdownStylePropsReturn {
  classProps: {
    root: string;
    trigger: string;
    popover: string;
  };
  props: DropdownStyleProps;
}

export const useDropdownStyleProps = (props: DropdownStyleProps = { isOpen: false }): UseDropdownStylePropsReturn => {
  const { alignmentX, alignmentY, isOpen, placement, ...modifiedProps } = props;

  const dropdownRootClass = useClassNamePrefix('Dropdown');
  const dropdownPopoverClass = `${dropdownRootClass}Popover`;
  const expandedClass = isOpen ? 'is-expanded' : '';
  const openClass = isOpen ? CLASS_NAME_OPEN : '';
  const placementClassName = getPlacementClassName(placement, { isControlled: false });

  const rootClass = classNames(dropdownRootClass, {
    [useAlignmentClass(dropdownRootClass, alignmentX as AlignmentPropertyType, 'alignmentX')]: alignmentX,
    [useAlignmentClass(dropdownRootClass, alignmentY as AlignmentPropertyType, 'alignmentY')]: alignmentY,
  });

  const popoverClass = classNames(dropdownPopoverClass, placementClassName, openClass);
  const triggerClass = classNames(expandedClass);

  return {
    classProps: {
      root: rootClass,
      trigger: triggerClass,
      popover: popoverClass,
    },
    props: modifiedProps,
  };
};
