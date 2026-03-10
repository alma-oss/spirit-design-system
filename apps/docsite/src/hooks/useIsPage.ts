'use client';

import { usePathname } from 'next/navigation';

const useIsPage = (route: string) => {
  const pathname = usePathname();

  return pathname === route;
};

export default useIsPage;
