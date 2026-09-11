import { AlignmentX, AlignmentY, Direction, TextColors } from '../../constants';
import { type SpiritFlexProps } from '../../types';

export const PROGRESS_BAR_VALUE_LABEL_TEXT_COLOR = TextColors.SECONDARY;

export const PROGRESS_BAR_VALUE_PLACEMENT_FLEX_PROPS = {
  bottom: {
    alignmentX: AlignmentX.LEFT,
    alignmentY: undefined,
    direction: Direction.VERTICAL,
    spacingX: undefined,
    spacingY: 'space-600',
  },
  right: {
    alignmentX: AlignmentX.LEFT,
    alignmentY: AlignmentY.CENTER,
    direction: Direction.HORIZONTAL,
    spacingX: 'space-600',
    spacingY: undefined,
  },
} as const satisfies Record<
  'bottom' | 'right',
  Pick<SpiritFlexProps, 'alignmentX' | 'alignmentY' | 'direction' | 'spacingX' | 'spacingY'>
>;

export const ProgressBarColorsExtended = {
  SELECTED: 'selected',
} as const;
