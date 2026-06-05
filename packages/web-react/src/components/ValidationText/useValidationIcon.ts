import { useIconName } from '../../hooks';
import { type SpiritValidationTextProps } from '../../types';

export function useValidationIcon({ validationStateIcon }: Pick<SpiritValidationTextProps, 'validationStateIcon'>) {
  const iconNameValue = useIconName(validationStateIcon, {
    success: 'success',
    warning: 'warning',
    danger: 'danger',
  });

  return iconNameValue;
}
