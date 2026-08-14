import classNames from 'classnames';
import { Emphasis, FontWeight } from '../../constants';
import { useClassNamePrefix, useDeprecationMessage } from '../../hooks';
import { type HeadingProps } from '../../types';
import { DEFAULT_FONT_WEIGHT } from './constants';

export function useHeadingStyleProps<S = void, Emph = void, C = void, FW = void>(props: HeadingProps<S, Emph, C, FW>) {
  const { emphasis, fontWeight, isItalic, size, textColor, ...restProps } = props;
  const isItalicEmphasis = emphasis === Emphasis.ITALIC;

  // @see https://jira.almacareer.tech/browse/DS-2738
  useDeprecationMessage({
    method: 'custom',
    trigger: emphasis !== undefined,
    componentName: 'Heading',
    customText:
      'The "emphasis" property is deprecated and will be removed in the next major version. Use the "fontWeight" and "isItalic" properties instead.',
  });

  const shouldApplyItalic = Boolean(isItalic) || isItalicEmphasis;
  const emphasisFontWeight = isItalicEmphasis ? FontWeight.REGULAR : emphasis;
  const resolvedFontWeight = fontWeight ?? emphasisFontWeight ?? DEFAULT_FONT_WEIGHT;

  const headingClass = useClassNamePrefix('typography-heading');
  const italicClass = useClassNamePrefix(shouldApplyItalic ? 'text-italic' : '');
  const headingTextColorClass = useClassNamePrefix(textColor ? `text-${textColor}` : '');
  const className = classNames(`${headingClass}-${size}-${resolvedFontWeight}`, {
    [italicClass]: shouldApplyItalic,
    [headingTextColorClass]: !!textColor,
  });

  return {
    classProps: className,
    props: restProps,
  };
}
