'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { type ChildrenProps } from '../../types';

interface NoSsrProps extends ChildrenProps {}

const NoSsr = ({ children }: NoSsrProps): ReactNode => {
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return isMounted ? children : null;
};

NoSsr.spiritComponent = 'NoSsr';

export default NoSsr;
