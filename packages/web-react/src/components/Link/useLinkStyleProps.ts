import classNames from 'classnames';
import { type ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type LinkProps, type SpiritLinkProps, UNDERLINED_OPTIONS } from '../../types';

export function useLinkStyleProps<E extends ElementType = 'a', T = void>(props: SpiritLinkProps<E, T>) {
  const { color, hasVisitedStyleAllowed, isDisabled, underlined, ...restProps } = props;

  const linkClass = useClassNamePrefix('link');
  const linkColorClass = `${linkClass}-${color}`;
  const linkDisabledClass = `${linkClass}-disabled`;
  const linkUnderlinedClass = `${linkClass}-underlined`;
  const linkNotUnderlinedClass = `${linkClass}-not-underlined`;
  const linkVisitedStyleAllowedClass = `${linkClass}-allow-visited-style`;

  const className = classNames(linkColorClass, {
    [linkDisabledClass]: isDisabled,
    [linkUnderlinedClass]: underlined === UNDERLINED_OPTIONS.ALWAYS,
    [linkNotUnderlinedClass]: underlined === UNDERLINED_OPTIONS.NEVER,
    [linkVisitedStyleAllowedClass]: hasVisitedStyleAllowed,
  });

  return {
    classProps: className,
    props: restProps as Partial<LinkProps<E>>,
  };
}
