'use client';

import classNames from 'classnames';
import React, {
  Children,
  type FocusEvent,
  type ForwardedRef,
  type MouseEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { MULTIPLE_SELECTION_MODE } from '../../constants';
import { PropsProvider } from '../../context';
import {
  getToggledSelectedKeys,
  useAriaDescribedBy,
  useI18n,
  useSelectionGridKeyboard,
  useStyleProps,
} from '../../hooks';
import { replaceTranslationParams } from '../../translations';
import { type ForwardRefComponent } from '../../types';
import { ControlButton } from '../ControlButton';
import { Dropdown, DropdownPopover } from '../Dropdown';
import { HelperText } from '../HelperText';
import { Icon } from '../Icon';
import { InputAddon } from '../InputAddon';
import { InputContainer } from '../InputContainer';
import { Label } from '../Label';
import { Stack } from '../Stack';
import { ValidationText, useValidationTextRole } from '../ValidationText';
import { VisuallyHidden } from '../VisuallyHidden';
import { ComboboxContextProvider } from './ComboboxContext';
import { ComboboxPopoverContextProvider } from './ComboboxPopoverContext';
import { COMBOBOX_CLEAR_CONTROL_BUTTON_SIZE_MAP, DEFAULT_POPOVER_PROPS, DEFAULT_SIZE } from './constants';
import type { SpiritUnstableComboboxProps, SpiritUnstableComboboxRef } from './types';
import UNSTABLE_ComboboxSelection from './UNSTABLE_ComboboxSelection';
import UNSTABLE_ComboboxTag from './UNSTABLE_ComboboxTag';
import { useComboboxId } from './useComboboxId';
import { useComboboxOpenState } from './useComboboxOpenState';
import { useComboboxOptionGridKeyboard } from './useComboboxOptionGridKeyboard';
import { useComboboxOptionLabels } from './useComboboxOptionLabels';
import { useComboboxStyleProps } from './useComboboxStyleProps';
import { areAllOptionsSelected, collectComboboxOptionKeys, getOptionValueFromRow } from './utils';

// eslint-disable-next-line camelcase
const _UNSTABLE_Combobox = (props: SpiritUnstableComboboxProps, ref: ForwardedRef<SpiritUnstableComboboxRef>) => {
  const { t } = useI18n();

  const {
    'aria-describedby': ariaDescribedBy = '',
    addMoreLabel = t('combobox.addMore'),
    addMoreDescriptionText = t('combobox.addMoreDescription'),
    children,
    auxiliaryContent,
    emptySelectionLabel,
    emptyStateLabel = t('combobox.emptyState'),
    hasClearButton = false,
    hasEmptyState = false,
    hasValidationIcon,
    helperText,
    id,
    inputValue,
    isDisabled = false,
    isLabelHidden = false,
    isLoading = false,
    isOpen,
    isRequired = false,
    dropdownProps,
    label,
    labelProps,
    loadingLabel = t('combobox.loading'),
    onInputChange,
    onSelectionChange,
    onToggle,
    optionKeys,
    popoverProps = DEFAULT_POPOVER_PROPS,
    tagProps,
    removeAllLabel = t('combobox.removeAll'),
    removeItemLabel,
    renderTags,
    selectedKeys,
    selectionAriaLabel = t('combobox.selectionAriaLabel'),
    selectionCountLabel = t('combobox.selectionCountLabel'),
    selectionCountLabelSingular = t('combobox.selectionCountLabelSingular'),
    size = DEFAULT_SIZE,
    tagDescriptionText = t('combobox.tagDescriptionText'),
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
  const { classProps } = useComboboxStyleProps({ isDisabled });
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const { addMoreHelperId, comboboxId, inputId, labelId, listboxId, popoverId, selectionId, tagDescriptionId } =
    useComboboxId(id);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectionGridRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const { activeDescendantId, close, focusInput, handleDropdownToggle, open, setActiveDescendantId } =
    useComboboxOpenState({
      inputRef,
      isDisabled,
      isOpen,
      onToggle,
    });

  const { getOptionLabel, getOptionRowEl, selectedItems } = useComboboxOptionLabels({
    children,
    listboxRef,
    selectedKeys,
  });

  const popoverContextValue = useMemo(
    () => ({
      id: comboboxId,
      isDisabled,
      selectedKeys,
    }),
    [comboboxId, isDisabled, selectedKeys],
  );

  const resolvedOptionKeys = useMemo(() => optionKeys ?? collectComboboxOptionKeys(children), [children, optionKeys]);

  const allSelected = areAllOptionsSelected(selectedKeys, resolvedOptionKeys);
  const showAddMore = selectedKeys.length > 0 && !allSelected;

  const toggleOption = useCallback(
    (optionId: string) => {
      const rowEl = getOptionRowEl(optionId);

      if (rowEl?.getAttribute('aria-disabled') === 'true') {
        return;
      }

      // Warm the label cache before selection changes (row may leave the filtered DOM later).
      getOptionLabel(optionId);

      onSelectionChange(getToggledSelectedKeys(selectedKeys, optionId, MULTIPLE_SELECTION_MODE));
      onInputChange('');
    },
    [getOptionLabel, getOptionRowEl, onInputChange, onSelectionChange, selectedKeys],
  );

  const removeItem = useCallback(
    (key: string) => {
      onSelectionChange(selectedKeys.filter((selectedKey) => selectedKey !== key));
    },
    [onSelectionChange, selectedKeys],
  );

  const removeAll = useCallback(() => {
    onSelectionChange([]);
    focusInput();
  }, [focusInput, onSelectionChange]);

  const { getKeyboardGridRowProps, removeTagAtIndex } = useSelectionGridKeyboard({
    isDisabled,
    isPopoverOpen: isOpen,
    onRemoveAtIndex: (index) => {
      const key = selectedItems[index]?.value;

      if (key) {
        removeItem(key);
      }
    },
    selectionRef: selectionGridRef,
    tagCount: selectedItems.length,
  });

  const { onInputKeyDown, onListboxKeyDown } = useComboboxOptionGridKeyboard({
    listboxRef,
    inputRef,
    isOpen,
    isDisabled,
    inputValue,
    onInputChange,
    onOpen: open,
    onClose: close,
    onToggleOption: toggleOption,
    setActiveDescendantId,
  });

  const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }

    const related = event.relatedTarget;

    if (related instanceof Node && rootRef.current?.contains(related)) {
      return;
    }

    open();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.currentTarget.value);
    open();
  };

  const handleGroupClick = (event: MouseEvent<HTMLElement>) => {
    if (isDisabled) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest('[role="row"]')) {
      return;
    }

    focusInput();
  };

  const handleListboxMouseDown = (event: MouseEvent<HTMLElement>) => {
    const row = (event.target as HTMLElement).closest<HTMLElement>('[role="row"]');

    if (!row || !listboxRef.current?.contains(row)) {
      return;
    }

    event.preventDefault();

    const optionValue = getOptionValueFromRow(row);

    if (row.getAttribute('aria-disabled') === 'true' || !optionValue) {
      return;
    }

    toggleOption(optionValue);
  };

  useImperativeHandle(
    ref,
    () => ({
      close,
      focus: focusInput,
      selectedKeys,
    }),
    [close, focusInput, selectedKeys],
  );

  const emptyPlaceholder = emptySelectionLabel ? replaceTranslationParams(emptySelectionLabel, { label }) : label;

  const inputPlaceholder = (() => {
    if (selectedKeys.length === 0) {
      return emptyPlaceholder;
    }

    if (allSelected) {
      return '';
    }

    return addMoreLabel;
  })();

  const inputAriaLabel =
    selectedKeys.length === 0
      ? undefined
      : replaceTranslationParams(selectedKeys.length === 1 ? selectionCountLabelSingular : selectionCountLabel, {
          label,
          count: String(selectedKeys.length),
        });

  const describedByIds = [ariaDescribedByProp['aria-describedby'], showAddMore ? addMoreHelperId : undefined]
    .filter(Boolean)
    .join(' ');

  const selectionContent = (() => {
    if (!selectedItems.length) {
      return null;
    }

    if (renderTags) {
      return renderTags({
        getKeyboardGridRowProps,
        onRemove: removeItem,
        removeTagAtIndex,
      });
    }

    return selectedItems.map((item, index) => (
      <UNSTABLE_ComboboxTag
        {...tagProps}
        key={item.value}
        tagKeyboardProps={getKeyboardGridRowProps(index)}
        isDisabled={isDisabled}
        label={item.label}
        onRemove={() => removeTagAtIndex(index)}
        {...(removeItemLabel
          ? {
              removeLabel: replaceTranslationParams(removeItemLabel, { itemLabel: item.label }),
            }
          : {})}
      />
    ));
  })();

  const hasOptionChildren = Children.toArray(children).length > 0;
  const showEmptyState = !isLoading && hasEmptyState && !hasOptionChildren;
  const shouldRenderListbox = hasOptionChildren || hasEmptyState;

  return (
    <PropsProvider
      value={{
        isDisabled,
        isLabelHidden,
        isRequired,
        size,
        variant,
        validationState,
      }}
    >
      <ComboboxContextProvider value={{ size, tagDescriptionId }}>
        <div
          ref={rootRef}
          {...styleProps}
          className={classNames(classProps.root, styleProps.className)}
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
              <InputContainer role="group" aria-label={label} onClick={handleGroupClick}>
                <UNSTABLE_ComboboxSelection isDisabled={isDisabled}>
                  <div
                    ref={selectionGridRef}
                    role="grid"
                    id={selectionId}
                    className="d-contents"
                    aria-label={replaceTranslationParams(selectionAriaLabel, { label })}
                    aria-live="off"
                    aria-atomic={false}
                    aria-relevant="additions"
                  >
                    {selectionContent}
                  </div>
                  <input
                    ref={inputRef}
                    id={inputId}
                    type="text"
                    role="combobox"
                    className={classProps.input}
                    disabled={isDisabled}
                    value={inputValue}
                    placeholder={inputPlaceholder}
                    autoComplete="off"
                    aria-haspopup="grid"
                    aria-expanded={isOpen}
                    aria-controls={shouldRenderListbox ? listboxId : popoverId}
                    aria-autocomplete="list"
                    aria-labelledby={labelId}
                    {...(inputAriaLabel ? { 'aria-label': inputAriaLabel } : {})}
                    {...(describedByIds ? { 'aria-describedby': describedByIds } : {})}
                    {...(activeDescendantId ? { 'aria-activedescendant': activeDescendantId } : {})}
                    onFocus={handleInputFocus}
                    onClick={open}
                    onChange={handleInputChange}
                    onKeyDown={onInputKeyDown}
                  />
                  <VisuallyHidden id={addMoreHelperId} {...(!showAddMore ? { hidden: true } : {})}>
                    {replaceTranslationParams(addMoreDescriptionText, { label })}
                  </VisuallyHidden>
                </UNSTABLE_ComboboxSelection>
                {hasClearButton && (
                  <InputAddon
                    onClick={(event) => event.stopPropagation()}
                    {...(selectedKeys.length === 0 ? { hidden: true } : {})}
                  >
                    <ControlButton
                      aria-label={removeAllLabel}
                      isSymmetrical
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        removeAll();
                      }}
                      size={COMBOBOX_CLEAR_CONTROL_BUTTON_SIZE_MAP[size]}
                      isDisabled={isDisabled}
                    >
                      <Icon name="close" />
                    </ControlButton>
                  </InputAddon>
                )}
              </InputContainer>
              <DropdownPopover {...popoverProps} aria-labelledby={labelId}>
                {isLoading && (
                  <div className={classProps.loading} role="status" aria-live="polite">
                    {loadingLabel}
                  </div>
                )}
                {shouldRenderListbox && (
                  <Stack
                    ref={listboxRef}
                    spacing="space-300"
                    role="grid"
                    id={listboxId}
                    aria-labelledby={labelId}
                    aria-multiselectable="true"
                    onKeyDown={onListboxKeyDown}
                    onMouseDown={handleListboxMouseDown}
                    {...(isLoading ? { hidden: true } : {})}
                  >
                    <ComboboxPopoverContextProvider value={popoverContextValue}>
                      {children}
                    </ComboboxPopoverContextProvider>
                  </Stack>
                )}
                {hasEmptyState && (
                  <div
                    className={classProps.emptyState}
                    role="status"
                    aria-live="polite"
                    {...(!showEmptyState ? { hidden: true } : {})}
                  >
                    {emptyStateLabel}
                  </div>
                )}
                {auxiliaryContent}
              </DropdownPopover>
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
            {tagDescriptionText}
          </span>
        </div>
      </ComboboxContextProvider>
    </PropsProvider>
  );
};

const UNSTABLE_Combobox = forwardRef<SpiritUnstableComboboxRef, SpiritUnstableComboboxProps>(
  _UNSTABLE_Combobox,
) as ForwardRefComponent<SpiritUnstableComboboxRef, SpiritUnstableComboboxProps>;

UNSTABLE_Combobox.spiritComponent = 'UNSTABLE_Combobox';
UNSTABLE_Combobox.displayName = 'UNSTABLE_Combobox';

export default UNSTABLE_Combobox;
