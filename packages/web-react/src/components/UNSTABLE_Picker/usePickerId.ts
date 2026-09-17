import { useMemo } from 'react';

export interface UnstablePickerId {
  contextualHelpId: string;
  labelId: string;
  pickerId: string;
  popoverId: string;
  selectionId: string;
  tagDescriptionId: string;
}

export const usePickerId = (id: string): UnstablePickerId =>
  useMemo(() => {
    const pickerId = `picker-${id}`;

    return {
      pickerId,
      contextualHelpId: `${pickerId}-contextual-help`,
      labelId: `${pickerId}-label`,
      popoverId: `${pickerId}-popover`,
      selectionId: `${pickerId}-selection`,
      tagDescriptionId: `${pickerId}-tag-description`,
    };
  }, [id]);
