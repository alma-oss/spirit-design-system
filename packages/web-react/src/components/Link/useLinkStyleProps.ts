import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type LinkProps, type LinkStyleProps, UNDERLINED_OPTIONS } from '../../types';

export function useLinkStyleProps<C = void>(props: Omit<LinkStyleProps<C>, 'routerOptions'>) {
  const { color, hasVisitedStyleAllowed, isDisabled, isStretched, underlined, ...restProps } = props;

  const linkClass = useClassNamePrefix('link');
  const linkColorClass = `${linkClass}-${color}`;
  const linkDisabledClass = `${linkClass}-disabled`;
  const linkUnderlinedClass = `${linkClass}-underlined`;
  const linkNotUnderlinedClass = `${linkClass}-not-underlined`;
  const linkStretchedClass = `${linkClass}-stretched`;
  const linkVisitedStyleAllowedClass = `${linkClass}-allow-visited-style`;

  const className = classNames(linkColorClass, {
    [linkDisabledClass]: isDisabled,
    [linkUnderlinedClass]: underlined === UNDERLINED_OPTIONS.ALWAYS,
    [linkNotUnderlinedClass]: underlined === UNDERLINED_OPTIONS.NEVER,
    [linkStretchedClass]: isStretched,
    [linkVisitedStyleAllowedClass]: hasVisitedStyleAllowed,
  });

  return {
    classProps: className,
    props: restProps as Partial<LinkProps<C>>,
  };
}
