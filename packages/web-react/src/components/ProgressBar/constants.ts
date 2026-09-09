import { AlignmentY, Direction, TextColors } from '../../constants';
import { type SpiritFlexProps } from '../../types';

export const PROGRESS_BAR_VALUE_LABEL_TEXT_COLOR = TextColors.SECONDARY;

/** Matches ProgressBar `--progress-bar-value` CSS transition (`duration-200`). */
export const PROGRESS_BAR_VALUE_THROTTLE_MS = 250;

export const PROGRESS_BAR_VALUE_PLACEMENT_FLEX_PROPS = {
  bottom: {
    alignmentX: undefined,
    alignmentY: undefined,
    direction: Direction.VERTICAL,
    spacingY: 'space-600',
  },
  right: {
    alignmentX: undefined,
    alignmentY: AlignmentY.CENTER,
    direction: Direction.HORIZONTAL,
    spacingX: 'space-600',
  },
} as const satisfies Record<
  'bottom' | 'right',
  Pick<SpiritFlexProps, 'alignmentX' | 'alignmentY' | 'direction' | 'spacingX' | 'spacingY'>
>;

export const ProgressBarColorsExtended = {
  SELECTED: 'selected',
} as const;
