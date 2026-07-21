'use client';

import React, { useMemo } from 'react';
import { Sizes } from '../../constants';
import { useI18n } from '../../hooks';
import { replaceTranslationParams } from '../../translations';
import { ControlButton } from '../ControlButton';
import { Icon } from '../Icon';
import { Tag } from '../Tag';
import { useComboboxContext } from './ComboboxContext';
import { COMBOBOX_NESTED_CONTROL_BUTTON_SIZE_MAP, COMBOBOX_NESTED_SIZE_MAP } from './constants';
import type { SpiritUnstableComboboxTagProps } from './types';
import { getNodeText } from './utils';

const UNSTABLE_ComboboxTag = ({
  children,
  tagKeyboardProps,
  isDisabled,
  label,
  onRemove,
  removeLabel,
  ...restProps
}: SpiritUnstableComboboxTagProps) => {
  const { t } = useI18n();
  const { size = Sizes.MEDIUM, tagDescriptionId } = useComboboxContext();

  const removeButtonAriaLabel =
    removeLabel ??
    replaceTranslationParams(t('combobox.removeItemLabel'), {
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
      size={COMBOBOX_NESTED_SIZE_MAP[size]}
      isDisabled={isDisabled}
      role="row"
      tabIndex={isDisabled ? -1 : (tagKeyboardProps?.tabIndex ?? 0)}
      aria-label={getNodeText(label)}
      {...tagKeyboardEventProps}
      {...(tagDescriptionId ? { 'aria-describedby': tagDescriptionId } : {})}
    >
      <div role="gridcell" aria-colindex={1} className="d-contents">
        {children ?? <span>{label}</span>}
        <ControlButton
          aria-label={removeButtonAriaLabel}
          isDisabled={isDisabled}
          isSymmetrical
          onClick={onRemove}
          size={COMBOBOX_NESTED_CONTROL_BUTTON_SIZE_MAP[size]}
          {...(tagKeyboardProps && { tabIndex: tagKeyboardProps.removeButtonTabIndex })}
        >
          <Icon name="close" />
        </ControlButton>
      </div>
    </Tag>
  );
};

UNSTABLE_ComboboxTag.spiritComponent = 'UNSTABLE_ComboboxTag';
UNSTABLE_ComboboxTag.displayName = 'UNSTABLE_ComboboxTag';

export default UNSTABLE_ComboboxTag;
