import { type RegisterType } from '../../types/shared/inputs';
import { type TextAreaCounterRenderProps } from '../../types/textArea';

export interface CharacterCounterProps extends TextAreaCounterRenderProps {
  /** ID of the associated textarea, used to generate the screen reader message element ID */
  id: string;
  /** Callback to register/unregister aria-describedBy IDs */
  registerAria: RegisterType;
}
