'use client';

import { useCallback, useState } from 'react';
import { type RegisterParams, type RegisterType } from '../types';

export const useAriaIds = (otherAriaIds?: string): [string[], RegisterType] => {
  const [ids, setIds] = useState<string[]>(otherAriaIds ? otherAriaIds.split(' ') : []);

  const register = useCallback(({ add, remove }: RegisterParams) => {
    setIds((prevIds) => {
      let newIds = [...prevIds];

      if (remove) {
        newIds = newIds.filter((item) => item !== remove);
      }

      if (add) {
        newIds = [...newIds, add];
      }

      return newIds;
    });
  }, []);

  return [ids, register];
};
