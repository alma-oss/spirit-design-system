'use client';

import { useCallback, useMemo, useState } from 'react';
import { type RegisterParams, type RegisterType } from '../types';

type AriaIdRefAttribute = 'aria-describedby' | 'aria-details';

export type AriaIdRefsReturn = [Partial<Record<AriaIdRefAttribute, string>>, RegisterType];

export function useAriaIdRefs(ariaAttribute: AriaIdRefAttribute, initialIds?: string): AriaIdRefsReturn {
  const [ids, setIds] = useState<string[]>(() => {
    if (!initialIds) {
      return [];
    }

    const parsed = initialIds.trim().split(/\s+/).filter(Boolean);

    return Array.from(new Set(parsed));
  });

  const register = useCallback(({ add, remove }: RegisterParams) => {
    setIds((prevIds) => {
      const idsSet = new Set(prevIds);
      const initialSize = idsSet.size;

      if (remove) {
        idsSet.delete(remove);
      }

      if (add) {
        idsSet.add(add);
      }

      return idsSet.size !== initialSize ? Array.from(idsSet) : prevIds;
    });
  }, []);

  const ariaProps = useMemo(() => (ids.length > 0 ? { [ariaAttribute]: ids.join(' ') } : {}), [ids, ariaAttribute]);

  return [ariaProps, register];
}

export const useAriaDescribedBy = (initialIds?: string): AriaIdRefsReturn =>
  useAriaIdRefs('aria-describedby', initialIds);

export const useAriaDetails = (initialIds?: string): AriaIdRefsReturn => useAriaIdRefs('aria-details', initialIds);

export default useAriaIdRefs;
