export const TRANSITION_DURATION = 250;

export const TRANSITIONING_STYLES: Record<string, string> = {
  entering: 'is-open is-transitioning',
  entered: 'is-open',
  exiting: 'is-hidden is-transitioning',
  exited: 'is-hidden',
};

export const ICON_BOX_SIZE = 20;

export const DEFAULT_TOAST_COLOR = 'neutral';

export const DEFAULT_TOAST_AUTO_CLOSE_INTERVAL = 3000; // milliseconds

export const ToastColorsExtended = {
  NEUTRAL: 'neutral',
} as const;
