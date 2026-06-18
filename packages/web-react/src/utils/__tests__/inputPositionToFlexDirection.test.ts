import { DirectionExtended, InputPositions } from '../../constants';
import { inputPositionToFlexDirection } from '../inputPositionToFlexDirection';

describe('inputPositionToFlexDirection', () => {
  it('should return horizontal for undefined input position', () => {
    expect(inputPositionToFlexDirection(undefined)).toBe(DirectionExtended.HORIZONTAL);
  });

  it('should return horizontal for start input position', () => {
    expect(inputPositionToFlexDirection(InputPositions.START)).toBe(DirectionExtended.HORIZONTAL);
  });

  it('should return horizontal-reversed for end input position', () => {
    expect(inputPositionToFlexDirection(InputPositions.END)).toBe(DirectionExtended.HORIZONTAL_REVERSED);
  });

  it('should return responsive flex directions', () => {
    expect(
      inputPositionToFlexDirection({
        mobile: InputPositions.START,
        tablet: InputPositions.END,
        desktop: InputPositions.START,
      }),
    ).toEqual({
      mobile: DirectionExtended.HORIZONTAL,
      tablet: DirectionExtended.HORIZONTAL_REVERSED,
      desktop: DirectionExtended.HORIZONTAL,
    });
  });
});
