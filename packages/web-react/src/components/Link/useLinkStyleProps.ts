import classNames from 'classnames';
import { type ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type LinkProps, type SpiritLinkProps, UNDERLINED_OPTIONS } from '../../types';

export interface LinkStyles<E extends ElementType = 'p'> {
  /** className props */
  classProps: string | null;
  /** props to be passed to the input element */
  props: Partial<LinkProps<E>>;
}

export function useLinkStyleProps<E extends ElementType = 'a', T = void>(props: SpiritLinkProps<E, T>): LinkStyles<E> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, hasVisitedStyleAllowed, isDisabled, underlined, routerOptions, ...restProps } = props;

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
    props: restProps,
  };
}
