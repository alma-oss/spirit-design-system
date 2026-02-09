import { type ElementType } from 'react';
import { useClick } from '../../hooks';
import { type SpiritButtonLinkProps } from '../../types';

export const useButtonLinkProps = <E extends ElementType = 'a', C = void, S = void>(
  props: SpiritButtonLinkProps<E, C, S>,
) => {
  const { elementType, isDisabled, isLoading, onClick, href, target, rel } = props;
  const handleClick = useClick(isDisabled, onClick);

  const additionalProps = {
    role: 'button',
    href: elementType === 'a' && isDisabled ? undefined : href,
    target: elementType === 'a' ? target : undefined,
    disabled: isDisabled || isLoading,
    rel: elementType === 'a' ? rel : undefined,
  };

  return {
    buttonLinkProps: {
      ...additionalProps,
      onClick: handleClick,
    },
  };
};
