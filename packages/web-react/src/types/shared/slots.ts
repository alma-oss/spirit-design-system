import { type ReactNode } from 'react';

export interface StartSlotProps {
  /** Optional content rendered before the main content */
  startSlot?: ReactNode;
}

export interface EndSlotProps {
  /** Optional content rendered after the main content */
  endSlot?: ReactNode;
}
