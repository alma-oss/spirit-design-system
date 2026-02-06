import classNames from 'classnames';
import { type CSSProperties } from 'react';
import { DirectionAxis } from '../../constants';
import {
  useAlignmentClass,
  useClassNamePrefix,
  useDeprecationMessage,
  useSpacingStyle,
  useWrapClass,
} from '../../hooks';
import { type FlexAlignmentXType, type FlexAlignmentYType, type FlexStyleProps, type SpacingType } from '../../types';
import { generateStylePropsClassNames, stringOrObjectKebabCaseToCamelCase } from '../../utils';

interface FlexCSSProperties extends CSSProperties {
  [key: string]: string | undefined | number;
}

export interface FlexStyle<T> {
  /** className props */
  classProps: string;
  /** Props for the flex element. */
  props: T;
  /** Style props for the element */
  styleProps: FlexCSSProperties;
}

export function useFlexStyleProps(props: FlexStyleProps): FlexStyle<FlexStyleProps> {
  const { alignmentX, alignmentY, direction, spacing, spacingX, spacingY, isWrapping, ...restProps } = props;

  // @see https://jira.almacareer.tech/browse/DS-1629
  useDeprecationMessage({
    method: 'custom',
    trigger: direction === 'row' || direction === 'column',
    componentName: 'Flex',
    customText:
      'Direction values `row` and `column` are deprecated and will be removed in the next major release. Use `horizontal` and `vertical` values instead.',
  });

  const flexClass = useClassNamePrefix('Flex');

  const flexStyle = {
    ...useSpacingStyle(spacing as SpacingType, 'flex', DirectionAxis.X),
    ...useSpacingStyle(spacing as SpacingType, 'flex', DirectionAxis.Y),
    ...useSpacingStyle(spacingX as SpacingType, 'flex', DirectionAxis.X),
    ...useSpacingStyle(spacingY as SpacingType, 'flex', DirectionAxis.Y),
  };

  const directionClass = generateStylePropsClassNames(flexClass, stringOrObjectKebabCaseToCamelCase(direction!));

  const classes = classNames(flexClass, useWrapClass(flexClass, isWrapping), {
    [useAlignmentClass(flexClass, alignmentX as FlexAlignmentXType, 'alignmentX')]: alignmentX,
    [useAlignmentClass(flexClass, alignmentY as FlexAlignmentYType, 'alignmentY')]: alignmentY,
    [directionClass]: direction,
  });

  return {
    classProps: classes,
    props: restProps,
    styleProps: flexStyle,
  };
}
