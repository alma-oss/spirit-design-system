'use client';

import { isActiveBranch } from '@local/domains/routing/navPath';
import { usePathname } from 'next/navigation';

const useIsSection = (route: string) => {
  const pathname = usePathname();

  return isActiveBranch(route, pathname);
};

export default useIsSection;
