'use client';

import React, { type ForwardedRef, type RefObject, forwardRef, useRef } from 'react';
import { type SpiritTextAreaProps } from '../../types';
import { TextFieldBase } from '../TextFieldBase';
import { useAdjustHeight } from './useAdjustHeight';

const _TextArea = (props: SpiritTextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
  const { onInput, isAutoResizing, autoResizingMaxHeight = 400, ...restProps } = props;
  const elementReference = useRef(ref);
  const { adjustHeightOnAutoresize, onInput: onInputHandler } = useAdjustHeight({
    elementReference,
    onInput,
    isAutoResizing,
    maxHeight: autoResizingMaxHeight,
  });

  return (
    <TextFieldBase
      isMultiline
      ref={elementReference as RefObject<HTMLTextAreaElement>}
      onInput={onInputHandler}
      onFocus={adjustHeightOnAutoresize}
      {...restProps}
    />
  );
};

const TextArea = forwardRef<HTMLTextAreaElement, SpiritTextAreaProps>(_TextArea);

TextArea.spiritComponent = 'TextArea';

export default TextArea;
