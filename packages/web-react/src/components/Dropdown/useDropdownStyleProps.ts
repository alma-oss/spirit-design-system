import classNames from 'classnames';
import { CLASS_NAME_OPEN } from '../../constants';
import { type AlignmentPropertyType, useAlignmentClass, useClassNamePrefix } from '../../hooks';
import { type DropdownStyleProps } from '../../types';

export interface UseDropdownStylePropsReturn {
  classProps: {
    root: string;
    trigger: string;
    popover: string;
  };
  props: DropdownStyleProps;
}

export const useDropdownStyleProps = (props: DropdownStyleProps = { isOpen: false }): UseDropdownStylePropsReturn => {
  const { alignmentX, alignmentY, isOpen, ...modifiedProps } = props;

  const dropdownClass = useClassNamePrefix('Dropdown');
  const dropdownPopoverClass = `${dropdownClass}Popover`;
  const expandedClass = isOpen ? 'is-expanded' : '';
  const openClass = isOpen ? CLASS_NAME_OPEN : '';

  return {
    classProps: {
      root: classNames(dropdownClass, {
        [useAlignmentClass(dropdownClass, alignmentX as AlignmentPropertyType, 'alignmentX')]: alignmentX,
        [useAlignmentClass(dropdownClass, alignmentY as AlignmentPropertyType, 'alignmentY')]: alignmentY,
      }),
      trigger: expandedClass,
      popover: classNames(dropdownPopoverClass, openClass),
    },
    props: modifiedProps,
  };
};
