'use client';

import classNames from 'classnames';
import React, { type ElementType, forwardRef } from 'react';
import { BorderWidths, EmotionColors, SizesExtended } from '../../constants';
import { useStyleProps } from '../../hooks';
import type { IconBoxProps, PolymorphicComponent, PolymorphicRef, SpiritIconBoxProps } from '../../types';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { IconBoxShapes } from './constants';
import { useIconBoxColors } from './useIconBoxColors';
import { useIconBoxStyleProps } from './useIconBoxStyleProps';

const defaultProps = {
  shape: IconBoxShapes.ROUNDED,
  color: EmotionColors.INFORMATIVE,
  elementType: 'div',
  hasBorder: true,
  isSubtle: true,
  size: SizesExtended.MEDIUM,
};

const _IconBox = <E extends ElementType = 'div'>(props: SpiritIconBoxProps<E>, ref: PolymorphicRef<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, shape, color, iconName, isSubtle, hasBorder, size, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Polymorphic elementType needs type assertion
      elementType={Component as any}
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

const IconBox = forwardRef(_IconBox) as unknown as PolymorphicComponent<'div', IconBoxProps>;

IconBox.spiritComponent = 'IconBox';
IconBox.displayName = 'IconBox';

export default IconBox;
