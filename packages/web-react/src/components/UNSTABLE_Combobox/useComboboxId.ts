import { useMemo } from 'react';

export interface UnstableComboboxId {
  addMoreHelperId: string;
  comboboxId: string;
  contextualHelpId: string;
  inputId: string;
  labelId: string;
  listboxId: string;
  popoverId: string;
  selectionId: string;
  tagDescriptionId: string;
}

export const useComboboxId = (id: string): UnstableComboboxId =>
  useMemo(() => {
    const comboboxId = `combobox-${id}`;

    return {
      comboboxId,
      contextualHelpId: `${comboboxId}-contextual-help`,
      labelId: `${comboboxId}-label`,
      inputId: `${comboboxId}-input`,
      popoverId: `${comboboxId}-popover`,
      listboxId: `${comboboxId}-listbox`,
      selectionId: `${comboboxId}-selection`,
      tagDescriptionId: `${comboboxId}-tag-description`,
      addMoreHelperId: `${comboboxId}-add-more-helper`,
    };
  }, [id]);
