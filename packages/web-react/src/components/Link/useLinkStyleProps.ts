import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type LinkProps, type LinkStyleProps, UNDERLINED_OPTIONS } from '../../types';

export function useLinkStyleProps<C = void>(props: LinkStyleProps<C>) {
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
    props: restProps as Partial<LinkProps<C>>,
  };
}
