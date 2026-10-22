'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const usePageViewEvent = () => {
  const pathname = usePathname();
  const isFirstView = useRef(true);

  useEffect(() => {
    if (isFirstView.current) {
      isFirstView.current = false;

      return;
    }

    // Pathname only. Query state such as sort is not a new page, and a full query would also send typed search text.
    sendGTMEvent({
      event: 'page_view',
      page_path: pathname,
    });
  }, [pathname]);
};
