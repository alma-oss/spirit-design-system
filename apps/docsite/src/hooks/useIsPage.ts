'use client';

import { usePathname } from 'next/navigation';

const useIsPage = (page: string) => {
  const pathname = usePathname();

  return page === '/' ? pathname === '/' : pathname.split('/').includes(page);
};

export default useIsPage;
