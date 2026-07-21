import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';

export interface UnstableComboboxStyleProps {
  isDisabled?: boolean;
}

export interface UnstableComboboxStyle {
  /** className props */
  classProps: {
    root: string;
    selection: string;
    input: string;
    emptyState: string;
    loading: string;
  };
}

export const useComboboxStyleProps = ({ isDisabled }: UnstableComboboxStyleProps = {}): UnstableComboboxStyle => {
  const comboboxClass = useClassNamePrefix('UNSTABLE_Combobox');
  const comboboxDisabledClass = `${comboboxClass}--disabled`;
  const comboboxSelectionClass = `${comboboxClass}Selection`;
  const comboboxInputClass = `${comboboxClass}__input`;
  const comboboxEmptyStateClass = `${comboboxClass}__emptyState`;
  const comboboxLoadingClass = `${comboboxClass}__loading`;

  return {
    classProps: {
      root: classNames(comboboxClass, { [comboboxDisabledClass]: isDisabled }),
      selection: comboboxSelectionClass,
      input: comboboxInputClass,
      emptyState: comboboxEmptyStateClass,
      loading: comboboxLoadingClass,
    },
  };
};
