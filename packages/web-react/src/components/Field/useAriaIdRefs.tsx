'use client';

import { useCallback, useMemo, useState } from 'react';

type AriaIdRefAttribute = 'aria-describedby' | 'aria-details';

export type RegisterParams = { add?: string; remove?: string };
export type RegisterType = (params: RegisterParams) => void;
export type AriaIdRefsReturn = [Partial<Record<AriaIdRefAttribute, string>>, RegisterType];

export function useAriaIdRefs(ariaAttribute: AriaIdRefAttribute, initialIds?: string): AriaIdRefsReturn {
  const [ids, setIds] = useState<string[]>(initialIds ? initialIds.trim().split(/\s+/).filter(Boolean) : []);

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

  const ariaProps = useMemo(() => (ids.length > 0 ? { [ariaAttribute]: ids.join(' ') } : {}), [ids, ariaAttribute]);

  return [ariaProps, register];
}

export const useAriaDescribedBy = (initialIds?: string): AriaIdRefsReturn =>
  useAriaIdRefs('aria-describedby', initialIds);

export const useAriaDetails = (initialIds?: string): AriaIdRefsReturn => useAriaIdRefs('aria-details', initialIds);

export default useAriaIdRefs;
