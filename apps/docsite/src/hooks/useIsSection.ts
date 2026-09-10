'use client';

import { usePathname } from 'next/navigation';

const useIsSection = (route: string) => {
  const pathname = usePathname();

  return pathname === route || pathname.startsWith(`${route}/`);
};

export default useIsSection;
