'use client';

import { useCallback, useMemo, useState } from 'react';

export type RegisterParams = { add?: string; remove?: string };
export type RegisterType = (params: RegisterParams) => void;

export type UseAriaIdsOptions = { format?: 'list' | 'string' };

// Overloads
export function useAriaIds(otherAriaIds?: string): [string[], RegisterType];
export function useAriaIds(
  otherAriaIds: string | undefined,
  options: { format: 'string' },
): [string | undefined, RegisterType];
export function useAriaIds(otherAriaIds: string | undefined, options: { format: 'list' }): [string[], RegisterType];
export function useAriaIds(
  otherAriaIds: string | undefined,
  options: UseAriaIdsOptions,
): [string[] | string | undefined, RegisterType];

// Implementation
export function useAriaIds(
  otherAriaIds?: string,
  options?: UseAriaIdsOptions,
): [string[] | string | undefined, RegisterType] {
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

  const formattedIds = useMemo(() => {
    if (options?.format === 'string') {
      return ids.length > 0 ? ids.join(' ') : undefined;
    }

    return ids;
  }, [ids, options?.format]);

  return [formattedIds, register];
}

export default useAriaIds;
