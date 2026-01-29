'use client';

import classNames from 'classnames';
import React, { forwardRef, type ElementType } from 'react';
import { BorderWidths, EmotionColors, SizesExtended } from '../../constants';
import { useStyleProps } from '../../hooks';
import type { IconBoxProps, PolymorphicRef, SpiritComponentStaticProps } from '../../types';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { IconBoxShapes } from './constants';
import { useIconBoxColors } from './useIconBoxColors';
import { useIconBoxStyleProps } from './useIconBoxStyleProps';

const defaultProps = {
  shape: IconBoxShapes.ROUNDED,
  color: EmotionColors.INFORMATIVE,
  elementType: 'div' as const,
  hasBorder: true,
  isSubtle: true,
  size: SizesExtended.MEDIUM,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_IconBox'] }] */
const _IconBox = <T extends ElementType = 'div'>(
  props: IconBoxProps<T>,
  ref: PolymorphicRef<T>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, shape, color, iconName, isSubtle, hasBorder, size, ...restProps } = propsWithDefaults;

  const Component = elementType as React.ElementType;

  const { colors } = useIconBoxColors(color, isSubtle);
  const {
    iconBoxStyles: iconBoxStyleProps,
    props: modifiedProps,
    shapesProps,
    sizeProps: { padding, iconSize },
  } = useIconBoxStyleProps({
    size,
    shape,
    ...restProps,
  });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);

  return (
    <Box
      {...otherProps}
      backgroundColor={colors.background}
      elementType={elementType}
      borderColor={hasBorder ? colors.border : undefined}
      borderRadius={shapesProps}
      borderWidth={hasBorder ? BorderWidths['100'] : undefined}
      padding={padding}
      textColor={colors.text}
      UNSAFE_className={classNames(styleProps.className, 'd-inline-flex')}
      UNSAFE_style={{
        ...styleProps.style,
        ...iconBoxStyleProps,
      }}
      ref={ref}
    >
      <Icon aria-hidden="true" boxSize={iconSize} name={iconName} />
    </Box>
  );
};

const IconBox = forwardRef(_IconBox) as unknown as (<T extends ElementType = 'div'>(
  props: IconBoxProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

IconBox.spiritComponent = 'IconBox';
IconBox.displayName = 'IconBox';

export default IconBox;
