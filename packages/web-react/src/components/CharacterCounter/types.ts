import type { RegisterType, StyleProps, ValidationState } from '../../types/shared';

export interface CharacterCounterProps extends StyleProps {
  /** Character threshold shown after the slash in the counter (e.g. `5/200`); implicitly enables the counter */
  counterThreshold?: number;
  /** Current number of characters */
  currentLength: number;
  /** Whether to show the character counter (count only); automatically true when `counterThreshold` is set */
  hasCounter?: boolean;
}

export interface SpiritCharacterCounterProps extends CharacterCounterProps {
  /** ID of the associated textarea, used to generate the screen reader message element ID */
  id: string;
  /** Whether the character counter is disabled */
  isDisabled?: boolean;
  /** Callback to register/unregister aria-describedBy IDs */
  registerAria?: RegisterType;
  /** Validation state */
  validationState?: ValidationState;
}
