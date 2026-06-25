import { useI18n } from '../../hooks';
import { type CloseButtonProps } from '../../types';

export type UseCloseButtonProps = CloseButtonProps;
export type UseCloseButtonReturn = {
  closeButtonProps: Omit<CloseButtonProps, 'label'>;
  label: string;
};

export const useCloseButtonProps = (props: UseCloseButtonProps): UseCloseButtonReturn => {
  const { label, isSymmetrical = true, ...restProps } = props;
  const { t } = useI18n();
  const closeLabel = label ?? t('common.close');

  return {
    closeButtonProps: {
      ...restProps,
      isSymmetrical,
    },
    label: closeLabel,
  };
};
