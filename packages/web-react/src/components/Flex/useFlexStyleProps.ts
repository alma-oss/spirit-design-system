import classNames from 'classnames';
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

export function useFlexStyleProps(props: FlexStyleProps) {
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
