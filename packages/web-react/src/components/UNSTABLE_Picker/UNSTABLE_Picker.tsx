'use client';

import classNames from 'classnames';
import React, { type ForwardedRef, forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { MULTIPLE_SELECTION_MODE } from '../../constants';
import { PropsProvider } from '../../context';
import {
  getSelectedKeys,
  isSingleSelectionMode,
  useAriaDescribedBy,
  useI18n,
  useOpenOnArrowDown,
  useStyleProps,
} from '../../hooks';
import { replaceTranslationParams } from '../../translations';
import { type ForwardRefComponent } from '../../types';
import { Dropdown, DropdownPopover } from '../Dropdown';
import { HelperText } from '../HelperText';
import { Icon } from '../Icon';
import { InputContainer } from '../InputContainer';
import { Label } from '../Label';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { VisuallyHidden } from '../VisuallyHidden';
import { DEFAULT_POPOVER_PROPS, DEFAULT_SIZE } from './constants';
import { PickerContextProvider } from './PickerContext';
import { PickerPopoverContextProvider } from './PickerPopoverContext';
import type { SpiritUnstablePickerProps, SpiritUnstablePickerRef } from './types';
import UNSTABLE_PickerSelection from './UNSTABLE_PickerSelection';
import UNSTABLE_PickerTag from './UNSTABLE_PickerTag';
import UNSTABLE_PickerTrigger from './UNSTABLE_PickerTrigger';
import { usePickerId } from './usePickerId';
import { usePickerSelectionGridKeyboard } from './usePickerSelectionGridKeyboard';
import { usePickerStyleProps } from './usePickerStyleProps';
import {
  collectPickerItems,
  getAggregatedTagLabel,
  getPickerItemLabelMap,
  getPickerSelectionGridKeyboardRowCount,
  getSelectedItems,
} from './utils';

// eslint-disable-next-line camelcase
const _UNSTABLE_Picker = (props: SpiritUnstablePickerProps, ref: ForwardedRef<SpiritUnstablePickerRef>) => {
  const { t } = useI18n();

  const {
    'aria-describedby': ariaDescribedBy = '',
    addButtonLabel = t('picker.add'),
    children,
    closeButtonLabel = t('common.close'),
    emptySelectionLabel,
    hasValidationIcon,
    helperText,
    id,
    isAggregated = false,
    isDisabled = false,
    isLabelHidden = false,
    isOpen,
    isRequired = false,
    dropdownProps,
    label,
    labelProps,
    onSelectionChange,
    onToggle,
    popoverProps = DEFAULT_POPOVER_PROPS,
    removeAllLabel = t('picker.removeAll'),
    renderTags,
    selectedKeys,
    selectionAriaLabel = t('picker.selectionAriaLabel'),
    selectionMode = MULTIPLE_SELECTION_MODE,
    size = DEFAULT_SIZE,
    tagDescriptionText = t('picker.tagDescriptionText'),
    validationState,
    validationText,
    variant,
    ...restProps
  } = props;

  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });
  const { classProps } = usePickerStyleProps();
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const { labelId, pickerId, popoverId, selectionId, tagDescriptionId } = usePickerId(id);

  const pickerItems = useMemo(() => collectPickerItems(children), [children]);

  const pickerItemLabels = useMemo(() => getPickerItemLabelMap(pickerItems), [pickerItems]);

  const selectedPickerKeys = useMemo(() => getSelectedKeys(selectedKeys, selectionMode), [selectedKeys, selectionMode]);

  const selectedPickerItems = useMemo(
    () => getSelectedItems(selectedPickerKeys, pickerItemLabels),
    [selectedPickerKeys, pickerItemLabels],
  );

  const removeItem = (key: string) =>
    isSingleSelectionMode(selectionMode)
      ? onSelectionChange([])
      : onSelectionChange(selectedKeys.filter((selectedKey) => selectedKey !== key));

  const removeAll = () => onSelectionChange([]);

  const selectionGridRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    if (!isOpen) {
      return;
    }

    onToggle();

    Promise.resolve().then(() => {
      triggerRef.current?.focus();
    });
  }, [isOpen, onToggle]);
  const handleTriggerKeyDown = useOpenOnArrowDown({
    isOpen,
    onToggle,
  });

  const selectionGridKeyboardRowCount = getPickerSelectionGridKeyboardRowCount(selectedPickerItems.length, {
    isAggregated,
  });

  const { getKeyboardGridRowProps, removeTagAtIndex } = usePickerSelectionGridKeyboard({
    isDisabled,
    isPopoverOpen: isOpen,
    onRemoveAtIndex: (index) => {
      if (isAggregated) {
        removeAll();
      } else {
        removeItem(selectedPickerItems[index]!.value);
      }
    },
    selectionRef: selectionGridRef,
    tagCount: selectionGridKeyboardRowCount,
  });

  const emptyLabel = emptySelectionLabel ? replaceTranslationParams(emptySelectionLabel, { label }) : label;
  const aggregatedTagLabel = getAggregatedTagLabel(label, selectedPickerItems);

  const selectionContent = (() => {
    if (!selectedPickerItems.length) {
      return (
        <span aria-hidden="true" className={classProps.selectionEmpty}>
          {emptyLabel}
        </span>
      );
    }

    if (renderTags) {
      return renderTags({
        getKeyboardGridRowProps,
        onRemove: removeItem,
        removeTagAtIndex,
      });
    }

    if (isAggregated) {
      return (
        <UNSTABLE_PickerTag
          tagKeyboardProps={getKeyboardGridRowProps(0)}
          isDisabled={isDisabled}
          label={aggregatedTagLabel}
          onRemove={() => removeTagAtIndex(0)}
          removeLabel={removeAllLabel}
        />
      );
    }

    return selectedPickerItems.map((item, index) => (
      <UNSTABLE_PickerTag
        key={item.value}
        tagKeyboardProps={getKeyboardGridRowProps(index)}
        isDisabled={isDisabled}
        label={item.label}
        onRemove={() => removeTagAtIndex(index)}
      />
    ));
  })();

  const popoverContextValue = useMemo(
    () => ({
      id: pickerId,
      isDisabled,
      onSelectionChange,
      selectedKeys: selectedPickerKeys,
      selectionMode,
    }),
    [selectedPickerKeys, isDisabled, onSelectionChange, pickerId, selectionMode],
  );

  useImperativeHandle(
    ref,
    () => ({
      close,
      selectedKeys,
    }),
    [close, selectedKeys],
  );

  return (
    <PropsProvider
      value={{
        isDisabled,
        isRequired,
        label: { isLabelHidden },
        inputContainer: { size, variant, validationState },
        validationText: { validationState },
      }}
    >
      <PickerContextProvider value={{ size, tagDescriptionId }}>
        <div {...styleProps} className={classNames(classProps.root, styleProps.className)} {...transferProps}>
          <Label {...labelProps} id={labelId} elementType="span">
            {label}
          </Label>
          <Dropdown {...dropdownProps} id={popoverId} isOpen={isOpen} onToggle={onToggle} triggerRef={triggerRef}>
            <InputContainer role="group" aria-label={label}>
              <UNSTABLE_PickerSelection
                ref={selectionGridRef}
                {...ariaDescribedByProp}
                id={selectionId}
                isDisabled={isDisabled}
                role={selectedPickerItems.length ? 'grid' : 'group'}
                aria-label={replaceTranslationParams(selectionAriaLabel, { label })}
                aria-live="off"
                aria-atomic={false}
                aria-relevant="additions"
              >
                {selectionContent}
              </UNSTABLE_PickerSelection>
              <UNSTABLE_PickerTrigger
                ref={triggerRef}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls={popoverId}
                onClick={onToggle}
                onKeyDown={handleTriggerKeyDown}
                disabled={isDisabled}
              >
                <VisuallyHidden>{isOpen ? closeButtonLabel : addButtonLabel}</VisuallyHidden>
                <Icon name={`chevron-${isOpen ? 'up' : 'down'}`} boxSize={20} />
              </UNSTABLE_PickerTrigger>
            </InputContainer>
            <DropdownPopover {...popoverProps} aria-labelledby={labelId}>
              <PickerPopoverContextProvider value={popoverContextValue}>{children}</PickerPopoverContextProvider>
            </DropdownPopover>
          </Dropdown>
          <HelperText id={`${pickerId}-helper-text`} registerAria={register} helperText={helperText} />
          {validationState && (
            <ValidationText
              id={`${pickerId}-validation-text`}
              {...(hasValidationIcon && { validationStateIcon: validationState })}
              validationText={validationText}
              registerAria={register}
              role={validationTextRole}
            />
          )}
          <span id={tagDescriptionId} hidden>
            {tagDescriptionText}
          </span>
        </div>
      </PickerContextProvider>
    </PropsProvider>
  );
};

const UNSTABLE_Picker = forwardRef<SpiritUnstablePickerRef, SpiritUnstablePickerProps>(
  _UNSTABLE_Picker,
) as ForwardRefComponent<SpiritUnstablePickerRef, SpiritUnstablePickerProps>;

UNSTABLE_Picker.spiritComponent = 'UNSTABLE_Picker';
UNSTABLE_Picker.displayName = 'UNSTABLE_Picker';

export default UNSTABLE_Picker;
