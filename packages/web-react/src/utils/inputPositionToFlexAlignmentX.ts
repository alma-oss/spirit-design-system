import { AlignmentXExtended, InputPositions } from '../constants';
import { type FlexAlignmentXType, type InputPositionType, type SingleOrResponsive } from '../types';

export function inputPositionToFlexAlignmentX(
  inputPosition: SingleOrResponsive<InputPositionType> | undefined,
): FlexAlignmentXType {
  if (typeof inputPosition === 'object') {
    return Object.fromEntries(
      Object.entries(inputPosition).map(([breakpoint, position]) => [
        breakpoint,
        position === InputPositions.END ? AlignmentXExtended.SPACE_BETWEEN : AlignmentXExtended.STRETCH,
      ]),
    ) as FlexAlignmentXType;
  }

  return inputPosition === InputPositions.END ? AlignmentXExtended.SPACE_BETWEEN : AlignmentXExtended.STRETCH;
}
