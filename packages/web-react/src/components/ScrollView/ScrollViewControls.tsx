'use client';

import React from 'react';
import { isDirectionHorizontal } from '../../constants';
import { useStyleProps } from '../../hooks';
import { type SpiritScrollViewControlsProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { ControlButton } from '../ControlButton';
import { Icon } from '../Icon';
import { useScrollCallback } from './useScrollCallback';
import { useScrollViewControls } from './useScrollViewControls';
import { useScrollViewStyleProps } from './useScrollViewStyleProps';

const ScrollViewControls = (props: SpiritScrollViewControlsProps) => {
  const { ariaLabelControls, direction, scrollStep, viewportRef, ...restProps } = props;
  const { classProps } = useScrollViewStyleProps({
    direction,
  });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps('button', { classProps: classProps.controls, styleProps });
  const isHorizontal = isDirectionHorizontal(direction);
  const { controls } = useScrollViewControls(isHorizontal, ariaLabelControls, scrollStep);
  const { handleScroll } = useScrollCallback({ viewportRef, direction });

  return (
    <div {...otherProps} {...mergedStyleProps}>
      {controls.map(({ icon, label, step }) => (
        <ControlButton key={icon} aria-label={label} onClick={() => handleScroll(step)} isSymmetrical>
          <Icon name={icon} />
        </ControlButton>
      ))}
    </div>
  );
};

ScrollViewControls.spiritComponent = 'ScrollViewControls';

export default ScrollViewControls;
