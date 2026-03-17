import { useIconName } from '../../hooks';
import { type SpiritValidationTextProps } from '../../types';

export function useValidationIcon({
  hasValidationStateIcon,
}: Pick<SpiritValidationTextProps, 'hasValidationStateIcon'>) {
  const iconNameValue = useIconName(hasValidationStateIcon as string, {
    success: 'check-plain',
    warning: 'warning',
    danger: 'danger',
  });

  return iconNameValue;
}
