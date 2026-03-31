import { useMemo } from 'react';

export interface UnstablePickerId {
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
      labelId: `${pickerId}-label`,
      popoverId: `${pickerId}-popover`,
      selectionId: `${pickerId}-selection`,
      tagDescriptionId: `${pickerId}-tag-description`,
    };
  }, [id]);
