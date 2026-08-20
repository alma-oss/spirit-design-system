'use client';

import React, { useMemo } from 'react';
import { Sizes } from '../../constants';
import { useI18n } from '../../hooks';
import { replaceTranslationParams } from '../../translations';
import { CloseButton } from '../CloseButton';
import { Tag } from '../Tag';
import { PICKER_NESTED_CLOSE_BUTTON_SIZE_MAP, PICKER_NESTED_SIZE_MAP } from './constants';
import { usePickerContext } from './PickerContext';
import type { SpiritUnstablePickerTagProps } from './types';
import { getNodeText } from './utils';

const UNSTABLE_PickerTag = ({
  children,
  tagKeyboardProps,
  isDisabled,
  label,
  onRemove,
  removeLabel,
  ...restProps
}: SpiritUnstablePickerTagProps) => {
  const { t } = useI18n();
  const { size = Sizes.MEDIUM, tagDescriptionId } = usePickerContext();

  const removeButtonLabel =
    removeLabel ??
    replaceTranslationParams(t('picker.removeItemLabel'), {
      itemLabel: getNodeText(label),
    });

  const tagKeyboardEventProps = useMemo(() => {
    if (isDisabled || !tagKeyboardProps) {
      return {};
    }

    return {
      onBlurCapture: tagKeyboardProps.onBlurCapture,
      onFocusCapture: tagKeyboardProps.onFocusCapture,
      onKeyDown: tagKeyboardProps.onKeyDown,
    };
  }, [isDisabled, tagKeyboardProps]);

  return (
    <Tag
      {...restProps}
      color="selected"
      elementType="div"
      size={PICKER_NESTED_SIZE_MAP[size]}
      isDisabled={isDisabled}
      role="row"
      tabIndex={isDisabled ? -1 : (tagKeyboardProps?.tabIndex ?? 0)}
      aria-label={getNodeText(label)}
      {...tagKeyboardEventProps}
      {...(tagDescriptionId ? { 'aria-describedby': tagDescriptionId } : {})}
    >
      <div role="gridcell" aria-colindex={1} className="d-contents">
        {children ?? <span>{label}</span>}
        <CloseButton
          isDisabled={isDisabled}
          label={removeButtonLabel}
          onClick={onRemove}
          size={PICKER_NESTED_CLOSE_BUTTON_SIZE_MAP[size]}
          {...(tagKeyboardProps && { tabIndex: tagKeyboardProps.secondaryControlTabIndex })}
        />
      </div>
    </Tag>
  );
};

UNSTABLE_PickerTag.spiritComponent = 'UNSTABLE_PickerTag';

export default UNSTABLE_PickerTag;
