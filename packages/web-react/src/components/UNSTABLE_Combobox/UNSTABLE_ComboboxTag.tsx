'use client';

import React, { useMemo } from 'react';
import { useI18n } from '../../hooks';
import { replaceTranslationParams } from '../../translations';
import { CloseButton } from '../CloseButton';
import { Tag } from '../Tag';
import { useComboboxContext } from './ComboboxContext';
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
  const { tagDescriptionId } = useComboboxContext();

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
      elementType="div"
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
          label={removeButtonAriaLabel}
          isDisabled={isDisabled}
          onClick={onRemove}
          {...(tagKeyboardProps && { tabIndex: tagKeyboardProps.removeButtonTabIndex })}
        />
      </div>
    </Tag>
  );
};

UNSTABLE_ComboboxTag.spiritComponent = 'UNSTABLE_ComboboxTag';
UNSTABLE_ComboboxTag.displayName = 'UNSTABLE_ComboboxTag';

export default UNSTABLE_ComboboxTag;
