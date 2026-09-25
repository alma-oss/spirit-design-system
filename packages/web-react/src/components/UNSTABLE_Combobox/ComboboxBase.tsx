'use client';

import classNames from 'classnames';
import React, {
  Children,
  type ForwardedRef,
  type RefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { ContextPropsProvider, FormFieldsContext, UniversalProvider } from '../../context';
import { useAriaDescribedBy, useDeprecationMessage, useI18n, useSelectionAria, useStyleProps } from '../../hooks';
import { resolveComponentString, resolveComponentStrings } from '../../translations';
import { Dropdown } from '../Dropdown';
import { HelperText } from '../HelperText';
import { Label } from '../Label';
import { Stack } from '../Stack';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { ComboboxContext } from './ComboboxContext';
import ComboboxInput from './ComboboxInput';
import ComboboxPopoverContent from './ComboboxPopoverContent';
import {
  COMBOBOX_INPUT_MIN_WIDTH_CSS_VAR,
  COMBOBOX_NESTED_CONTROL_BUTTON_SIZE_MAP,
  COMBOBOX_NESTED_SIZE_MAP,
  DEFAULT_OPTIONS_ROLE,
  DEFAULT_POPOVER_PROPS,
  DEFAULT_SIZE,
} from './constants';
import type { SpiritUnstableComboboxRef, UnstableComboboxBaseProps } from './types';
import { useComboboxId } from './useComboboxId';
import { useComboboxInteractions } from './useComboboxInteractions';
import { useComboboxItems } from './useComboboxItems';
import { type ComboboxState } from './useComboboxState';
import { useComboboxStyleProps } from './useComboboxStyleProps';
import { areAllOptionsSelected, getComboboxOptionDomId } from './utils';

export interface ComboboxBaseProps extends UnstableComboboxBaseProps {
  forwardedRef: ForwardedRef<SpiritUnstableComboboxRef>;
  inputRef: RefObject<HTMLInputElement>;
  state: ComboboxState;
}

/**
 * Shared Combobox rendering layer for controlled and uncontrolled entry points.
 *
 * @param props Base props including normalized Combobox state
 * @param props.forwardedRef Imperative Combobox ref
 * @param props.inputRef Filter input element ref shared with state
 * @param props.state Normalized Combobox state
 */
const ComboboxBase = (props: ComboboxBaseProps) => {
  const { t } = useI18n();

  const {
    'aria-describedby': ariaDescribedBy = '',
    addMoreLabel,
    addMoreDescriptionText,
    children,
    auxiliaryContent,
    emptySelectionLabel,
    emptyStateLabel,
    forwardedRef,
    hasClearButton = false,
    hasEmptyState = false,
    hasValidationIcon,
    helperText,
    id,
    inputRef,
    isDisabled = false,
    isLabelHidden = false,
    isLoading = false,
    isRequired = false,
    dropdownProps,
    label,
    labelProps,
    loadingLabel,
    optionKeys,
    optionsRole = DEFAULT_OPTIONS_ROLE,
    popoverProps = DEFAULT_POPOVER_PROPS,
    tagProps,
    removeAllLabel,
    removeItemLabel,
    renderTags,
    selectionAriaLabel,
    selectionCountLabel,
    selectionCountLabelSingular,
    size = DEFAULT_SIZE,
    state,
    strings,
    tagDescriptionText,
    validationState,
    validationText,
    variant,
    ...restProps
  } = props;

  const {
    addMoreDescriptionText: resolvedAddMoreDescriptionText,
    addMoreLabel: resolvedAddMoreLabel,
    removeAllLabel: resolvedRemoveAllLabel,
    selectionAriaLabel: resolvedSelectionAriaLabel,
    selectionCountLabel: resolvedSelectionCountLabel,
    selectionCountLabelSingular: resolvedSelectionCountLabelSingular,
    tagDescriptionText: resolvedTagDescriptionText,
  } = resolveComponentStrings(
    {
      addMoreDescriptionText: {
        value: strings?.ariaLabel?.addMoreDescription ?? addMoreDescriptionText,
        key: 'combobox.addMoreDescription',
        params: { label },
      },
      addMoreLabel: { value: strings?.label?.addMore ?? addMoreLabel, key: 'combobox.addMore' },
      removeAllLabel: { value: strings?.ariaLabel?.removeAll ?? removeAllLabel, key: 'combobox.removeAll' },
      selectionAriaLabel: {
        value: strings?.ariaLabel?.selection ?? selectionAriaLabel,
        key: 'combobox.selectionAriaLabel',
        params: { label },
      },
      selectionCountLabel: {
        value: strings?.ariaLabel?.selectionCount ?? selectionCountLabel,
        key: 'combobox.selectionCountLabel',
      },
      selectionCountLabelSingular: {
        value: strings?.ariaLabel?.selectionCountSingular ?? selectionCountLabelSingular,
        key: 'combobox.selectionCountLabelSingular',
      },
      tagDescriptionText: {
        value: strings?.ariaLabel?.tagDescription ?? tagDescriptionText,
        key: 'combobox.tagDescriptionText',
      },
    },
    t,
  );
  const resolvedEmptyStateLabel = emptyStateLabel ?? t('combobox.emptyState');
  const resolvedLoadingLabel = loadingLabel ?? t('combobox.loading');
  const resolvedRemoveItemLabel = strings?.ariaLabel?.removeItem ?? removeItemLabel;
  const emptySelectionValue = strings?.label?.emptySelection ?? emptySelectionLabel;

  useDeprecationMessage({
    method: 'custom',
    trigger:
      addMoreLabel != null ||
      addMoreDescriptionText != null ||
      emptySelectionLabel != null ||
      removeAllLabel != null ||
      removeItemLabel != null ||
      selectionAriaLabel != null ||
      selectionCountLabel != null ||
      selectionCountLabelSingular != null ||
      tagDescriptionText != null,
    componentName: 'UNSTABLE_Combobox',
    customText:
      'The flat translation properties are deprecated and will be removed in the next major version. Use "strings" instead.',
  });

  const {
    activeDescendantId,
    close,
    focusInput,
    handleDropdownToggle,
    inputValue,
    isOpen,
    onInputChange,
    open,
    removeAll,
    removeItem,
    selectedKeys,
    selectedKeysSet,
    setActiveDescendantId,
    toggleOption,
  } = state;

  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });
  const { classProps } = useComboboxStyleProps({ isDisabled });
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const { addMoreHelperId, comboboxId, inputId, labelId, listboxId, popoverId, selectionId, tagDescriptionId } =
    useComboboxId(id);

  const rootRef = useRef<HTMLDivElement>(null);
  const selectionGridRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const { getOptionRowEl, getVisibleOptionRows, resolvedOptionKeys, selectedItems, warmItemLabel } = useComboboxItems({
    children,
    listboxRef,
    optionKeys,
    selectedKeys,
  });

  const { getKeyboardGridRowProps, removeTagAtIndex, focusTagAtIndex } = useSelectionAria({
    isDisabled,
    isPopoverOpen: isOpen,
    focusAfterRemove: 'input',
    onFocusInput: focusInput,
    onRemoveAtIndex: (index) => {
      const key = selectedItems[index]?.value;

      if (key) {
        removeItem(key);
      }
    },
    selectionRef: selectionGridRef,
    tagCount: selectedItems.length,
  });

  const canFocusLastTag = inputValue === '' && selectedItems.length > 0;

  const onFocusLastTag = useCallback(() => {
    focusTagAtIndex(selectedItems.length - 1);
  }, [focusTagAtIndex, selectedItems.length]);

  const {
    handleGroupClick,
    handleInputChange,
    handleListboxFocusCapture,
    handleListboxMouseDown,
    onInputKeyDown,
    activeNestedControlIndex,
    clearActiveNestedControl,
  } = useComboboxInteractions({
    activeDescendantId,
    canFocusLastTag,
    close,
    focusInput,
    getOptionRowEl,
    getVisibleOptionRows,
    inputRef,
    isDisabled,
    isOpen,
    listboxRef,
    onInputChange,
    onFocusLastTag,
    open,
    setActiveDescendantId,
    toggleOption,
    warmItemLabel,
  });

  const activateOption = useCallback(
    (optionId: string | null) => {
      clearActiveNestedControl();
      setActiveDescendantId(optionId ? getComboboxOptionDomId(comboboxId, optionId) : undefined);
      focusInput();
    },
    [clearActiveNestedControl, comboboxId, focusInput, setActiveDescendantId],
  );

  const popoverContextValue = useMemo(
    () => ({
      id: comboboxId,
      activeDescendantId,
      activeNestedControlIndex,
      isDisabled,
      optionsRole: optionsRole ?? DEFAULT_OPTIONS_ROLE,
      selectedKeysSet,
    }),
    [activeDescendantId, activeNestedControlIndex, comboboxId, isDisabled, optionsRole, selectedKeysSet],
  );

  const allSelected = areAllOptionsSelected(selectedKeysSet, resolvedOptionKeys);
  const showAddMore = selectedKeys.length > 0 && !allSelected;

  useImperativeHandle(
    forwardedRef,
    () => ({
      activateOption,
      close,
      focus: focusInput,
      selectedKeys,
    }),
    [activateOption, close, focusInput, selectedKeys],
  );

  const emptyPlaceholder = emptySelectionValue ? resolveComponentString(emptySelectionValue, t, { label }) : label;

  const inputPlaceholder = (() => {
    if (selectedKeys.length === 0) {
      return emptyPlaceholder;
    }

    if (allSelected) {
      return '';
    }

    return resolvedAddMoreLabel;
  })();

  const hasConsumerInputMinWidth =
    styleProps.style != null &&
    Object.prototype.hasOwnProperty.call(styleProps.style, COMBOBOX_INPUT_MIN_WIDTH_CSS_VAR);
  const inputMinWidthStyle =
    !hasConsumerInputMinWidth && inputPlaceholder.length > 0
      ? { [COMBOBOX_INPUT_MIN_WIDTH_CSS_VAR]: `${inputPlaceholder.length}ch` }
      : undefined;

  const inputAriaLabel =
    selectedKeys.length === 0
      ? undefined
      : resolveComponentString(
          selectedKeys.length === 1 ? resolvedSelectionCountLabelSingular : resolvedSelectionCountLabel,
          t,
          {
            label,
            count: String(selectedKeys.length),
          },
        );

  const describedByIds = [ariaDescribedByProp['aria-describedby'], showAddMore ? addMoreHelperId : undefined]
    .filter(Boolean)
    .join(' ');

  const hasOptionChildren = Children.toArray(children).length > 0;
  const showEmptyState = !isLoading && hasEmptyState && !hasOptionChildren;
  const shouldRenderOptions = optionsRole != null && (hasOptionChildren || hasEmptyState);

  return (
    <ContextPropsProvider
      value={{
        isDisabled,
        isRequired,
        validationState,
        label: { isLabelHidden },
        inputContainer: { variant },
        tag: {
          color: 'selected',
          size: COMBOBOX_NESTED_SIZE_MAP[size],
        },
        splitTag: {
          color: 'selected',
          size: COMBOBOX_NESTED_SIZE_MAP[size],
        },
        controlButton: {
          size: COMBOBOX_NESTED_CONTROL_BUTTON_SIZE_MAP[size],
        },
      }}
    >
      <UniversalProvider
        values={[
          [FormFieldsContext, { size }],
          [ComboboxContext, { size, tagDescriptionId, isOpen, onToggle: handleDropdownToggle, isDisabled }],
        ]}
      >
        <div
          ref={rootRef}
          {...styleProps}
          className={classNames(classProps.root, styleProps.className)}
          style={{ ...styleProps.style, ...inputMinWidthStyle }}
          {...transferProps}
        >
          <Stack spacing="space-400">
            <Label {...labelProps} id={labelId} htmlFor={inputId}>
              {label}
            </Label>
            <Dropdown
              {...dropdownProps}
              id={popoverId}
              isOpen={isOpen}
              onToggle={handleDropdownToggle}
              triggerRef={inputRef}
              enableAutoClose
            >
              <ComboboxInput
                activeDescendantId={activeDescendantId}
                addMoreDescriptionText={resolvedAddMoreDescriptionText}
                addMoreHelperId={addMoreHelperId}
                describedByIds={describedByIds}
                getKeyboardGridRowProps={getKeyboardGridRowProps}
                handleGroupClick={handleGroupClick}
                handleInputChange={handleInputChange}
                hasClearButton={hasClearButton}
                inputAriaLabel={inputAriaLabel}
                inputClassName={classProps.input}
                inputId={inputId}
                inputPlaceholder={inputPlaceholder}
                inputRef={inputRef}
                inputValue={inputValue}
                isDisabled={isDisabled}
                isOpen={isOpen}
                isRequired={isRequired}
                label={label}
                labelId={labelId}
                listboxId={listboxId}
                onInputKeyDown={onInputKeyDown}
                open={open}
                optionsRole={optionsRole}
                removeAll={removeAll}
                removeAllLabel={resolvedRemoveAllLabel}
                removeItem={removeItem}
                removeItemLabel={resolvedRemoveItemLabel}
                removeTagAtIndex={removeTagAtIndex}
                renderTags={renderTags}
                selectedItems={selectedItems}
                selectedKeysCount={selectedKeys.length}
                selectionAriaLabel={resolvedSelectionAriaLabel}
                selectionGridRef={selectionGridRef}
                selectionId={selectionId}
                shouldRenderOptions={shouldRenderOptions}
                showAddMore={showAddMore}
                size={size}
                tagProps={tagProps}
              />
              <ComboboxPopoverContent
                auxiliaryContent={auxiliaryContent}
                emptyStateClassName={classProps.emptyState}
                emptyStateLabel={resolvedEmptyStateLabel}
                handleListboxFocusCapture={handleListboxFocusCapture}
                handleListboxMouseDown={handleListboxMouseDown}
                hasEmptyState={hasEmptyState}
                isLoading={isLoading}
                labelId={labelId}
                listboxId={listboxId}
                listboxRef={listboxRef}
                loadingClassName={classProps.loading}
                loadingLabel={resolvedLoadingLabel}
                optionsRole={optionsRole}
                popoverContextValue={popoverContextValue}
                popoverProps={popoverProps}
                shouldRenderOptions={shouldRenderOptions}
                showEmptyState={showEmptyState}
              >
                {children}
              </ComboboxPopoverContent>
            </Dropdown>
            <HelperText id={`${comboboxId}-helper-text`} registerAria={register} helperText={helperText} />
            {validationState && (
              <ValidationText
                id={`${comboboxId}-validation-text`}
                {...(hasValidationIcon && { validationStateIcon: validationState })}
                validationText={validationText}
                registerAria={register}
                role={validationTextRole}
              />
            )}
          </Stack>
          <span id={tagDescriptionId} hidden>
            {resolvedTagDescriptionText}
          </span>
        </div>
      </UniversalProvider>
    </ContextPropsProvider>
  );
};

export default ComboboxBase;
