/** Named keyboard event keys for comparisons against `event.key`. */
export const KeyboardKey = {
  ArrowDown: 'ArrowDown',
  ArrowUp: 'ArrowUp',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Home: 'Home',
  End: 'End',
  Enter: 'Enter',
  Space: ' ',
  Escape: 'Escape',
  Delete: 'Delete',
  Backspace: 'Backspace',
  Tab: 'Tab',
} as const;

export type KeyboardKeyType = (typeof KeyboardKey)[keyof typeof KeyboardKey];
