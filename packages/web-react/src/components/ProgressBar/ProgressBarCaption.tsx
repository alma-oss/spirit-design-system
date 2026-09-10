'use client';

import classNames from 'classnames';
import React, { type CSSProperties, type ReactNode } from 'react';
import { useContextProps } from '../../context';
import { CaptionText } from '../CaptionText';
import { Flex } from '../Flex';
import { PROGRESS_BAR_VALUE_LABEL_TEXT_COLOR, PROGRESS_BAR_VALUE_PLACEMENT_FLEX_PROPS } from './constants';
import { type ProgressBarValuePlacement } from './types';

type ProgressBarCaptionProps = {
  children: ReactNode;
  classProps: {
    value: string;
    valueLabel: string;
  };
  isAriaHidden?: boolean;
  styleProps?: {
    className?: string;
    style?: CSSProperties;
  };
  valueLabel: ReactNode;
  valueLabelId?: string;
  valuePlacement?: ProgressBarValuePlacement;
};

const ProgressBarCaption = (props: ProgressBarCaptionProps) => {
  const { children, classProps, isAriaHidden, styleProps, valueLabel, valueLabelId, valuePlacement = 'right' } = props;
  const { isDisabled } = useContextProps<{ isDisabled?: boolean }>({}, 'progressBar');

  return (
    <Flex
      {...PROGRESS_BAR_VALUE_PLACEMENT_FLEX_PROPS[valuePlacement]}
      UNSAFE_className={classNames(styleProps?.className, classProps.value) || undefined}
      UNSAFE_style={styleProps?.style}
    >
      {children}
      <CaptionText
        aria-hidden={isAriaHidden ? true : undefined}
        id={valueLabelId}
        textColor={isDisabled ? undefined : PROGRESS_BAR_VALUE_LABEL_TEXT_COLOR}
        UNSAFE_className={classProps.valueLabel || undefined}
      >
        {valueLabel}
      </CaptionText>
    </Flex>
  );
};

ProgressBarCaption.displayName = 'ProgressBarCaption';

export default ProgressBarCaption;
