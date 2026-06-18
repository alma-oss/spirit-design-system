import { DirectionExtended, InputPositions } from '../constants';
import { type FlexDirectionType, type InputPositionType, type SingleOrResponsive } from '../types';

export function inputPositionToFlexDirection(
  inputPosition: SingleOrResponsive<InputPositionType> | undefined,
): FlexDirectionType {
  if (typeof inputPosition === 'object') {
    return Object.fromEntries(
      Object.entries(inputPosition).map(([breakpoint, position]) => [
        breakpoint,
        position === InputPositions.END ? DirectionExtended.HORIZONTAL_REVERSED : DirectionExtended.HORIZONTAL,
      ]),
    ) as FlexDirectionType;
  }

  return inputPosition === InputPositions.END ? DirectionExtended.HORIZONTAL_REVERSED : DirectionExtended.HORIZONTAL;
}
