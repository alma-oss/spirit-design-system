'use client';

import { useState } from 'react';

export const usePasswordToggle = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const passwordToggle = () => setIsPasswordShown(!isPasswordShown);

  return {
    isPasswordShown,
    passwordToggle,
  };
};
