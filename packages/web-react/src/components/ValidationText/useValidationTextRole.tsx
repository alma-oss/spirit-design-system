'use client';

import { useEffect, useRef, useState } from 'react';
import { type ValidationState, type ValidationTextType } from '../../types';
import { A11Y_ALERT_ROLE } from './constants';

export const useValidationTextRole = ({
  validationState,
  validationText,
}: {
  validationState?: ValidationState;
  validationText?: ValidationTextType;
}) => {
  const [role, setRole] = useState<string | undefined>();
  const previousValidationText = useRef(validationText);
  const previousValidationState = useRef(validationState);

  useEffect(() => {
    if (previousValidationText.current !== validationText || previousValidationState.current !== validationState) {
      setRole(A11Y_ALERT_ROLE);
    }
    previousValidationText.current = validationText;
    previousValidationState.current = validationState;
  }, [validationText, validationState]);

  return role;
};
