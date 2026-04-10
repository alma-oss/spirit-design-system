import { type ElementType } from 'react';
import { useClick } from '../../hooks';
import { type ButtonType, type SpiritButtonProps } from '../../types';

export type UseButtonProps<E extends ElementType = ElementType, C = unknown, S = unknown> = Pick<
  Partial<SpiritButtonProps<E, C, S>>,
  'elementType' | 'isDisabled' | 'isLoading' | 'onClick' | 'type'
>;

type ButtonDomProps = {
  disabled?: boolean;
  onClick: ReturnType<typeof useClick>;
  type?: ButtonType;
};

export type UseButtonReturn = {
  buttonProps: ButtonDomProps;
};

export const useButtonProps = <E extends ElementType = ElementType, C = unknown, S = unknown>(
  props: UseButtonProps<E, C, S>,
): UseButtonReturn => {
  const { elementType, isDisabled, isLoading, onClick, type = 'button' as ButtonType } = props;
  const handleClick = useClick(isDisabled, onClick);

  const additionalProps = {
    type: elementType === 'button' ? type : undefined,
    disabled: isDisabled || isLoading,
  };

  return {
    buttonProps: {
      ...additionalProps,
      onClick: handleClick,
    },
  };
};
