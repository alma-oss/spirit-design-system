'use client';

import React, { type ElementType, type ForwardedRef, forwardRef } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useStyleProps } from '../../hooks';
import { type ClickEvent, type SpiritButtonLinkProps } from '../../types';
import { handleLinkClick, mergeStyleProps } from '../../utils';
import { Spinner } from '../Spinner';
import { useButtonLinkProps } from './useButtonLinkProps';
import { useButtonLinkStyleProps } from './useButtonLinkStyleProps';

const defaultProps: Partial<SpiritButtonLinkProps> = {
  color: 'primary',
  elementType: 'a',
  /**
   * @deprecated "isBlock" property will be removed in the next major version. Please read component's README for more information.
   * @see https://jira.almacareer.tech/browse/DS-1897
   */
  isBlock: false,
  isDisabled: false,
  isLoading: false,
  isSymmetrical: false,
  size: 'medium',
};

const _ButtonLink = <T extends ElementType = 'a', C = void, S = void>(
  props: SpiritButtonLinkProps<T, C, S>,
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType: ElementTag = defaultProps.elementType as ElementType,
    children,
    ...restProps
  } = propsWithDefaults;
  const { href, target, isDisabled, routerOptions, onClick } = restProps;
  const router = useRouter();

  const { buttonLinkProps } = useButtonLinkProps(propsWithDefaults);
  const { classProps, props: modifiedProps } = useButtonLinkStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps, styleProps, otherProps });

  const handleClick = handleLinkClick({
    router,
    href,
    isDisabled,
    target,
    routerOptions,
    onClick: onClick as ((event: ClickEvent) => void) | undefined,
  });

  return (
    <ElementTag {...otherProps} {...buttonLinkProps} {...mergedStyleProps} href={href} onClick={handleClick} ref={ref}>
      {children}
      {restProps.isLoading && <Spinner />}
    </ElementTag>
  );
};

const ButtonLink = forwardRef<HTMLAnchorElement, SpiritButtonLinkProps<ElementType>>(_ButtonLink);

ButtonLink.spiritComponent = 'ButtonLink';

export default ButtonLink;
