import classNames from 'classnames';
import { Emphasis, FontWeight } from '../../constants';
import { useClassNamePrefix, useDeprecationMessage } from '../../hooks';
import { type TextProps } from '../../types';
import { DEFAULT_FONT_WEIGHT } from './constants';

export function useTextStyleProps<S = void, Emph = void, C = void, FW = void>(props: TextProps<S, Emph, C, FW>) {
  const { emphasis, fontWeight, isItalic, size, textColor, ...restProps } = props;
  const isItalicEmphasis = emphasis === Emphasis.ITALIC;

  // @see https://jira.almacareer.tech/browse/DS-2738
  useDeprecationMessage({
    method: 'custom',
    trigger: emphasis !== undefined,
    componentName: 'Text',
    customText:
      'The "emphasis" property is deprecated and will be removed in the next major version. Use the "fontWeight" and "isItalic" properties instead.',
  });

  const shouldApplyItalic = Boolean(isItalic) || isItalicEmphasis;
  const emphasisFontWeight = isItalicEmphasis ? FontWeight.REGULAR : emphasis;
  const resolvedFontWeight = fontWeight ?? emphasisFontWeight ?? DEFAULT_FONT_WEIGHT;

  const textClass = useClassNamePrefix('typography-body');
  const italicClass = useClassNamePrefix(shouldApplyItalic ? 'text-italic' : '');
  const textColorClass = useClassNamePrefix(textColor ? `text-${textColor}` : '');
  const className = classNames(`${textClass}-${size}-${resolvedFontWeight}`, {
    [italicClass]: shouldApplyItalic,
    [textColorClass]: !!textColor,
  });

  return {
    classProps: className,
    props: restProps,
  };
}
