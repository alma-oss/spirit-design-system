import { AlignmentXExtended, InputPositions } from '../../constants';
import { inputPositionToFlexAlignmentX } from '../inputPositionToFlexAlignmentX';

describe('inputPositionToFlexAlignmentX', () => {
  it('should return stretch for undefined input position', () => {
    expect(inputPositionToFlexAlignmentX(undefined)).toBe(AlignmentXExtended.STRETCH);
  });

  it('should return stretch for start input position', () => {
    expect(inputPositionToFlexAlignmentX(InputPositions.START)).toBe(AlignmentXExtended.STRETCH);
  });

  it('should return space-between for end input position', () => {
    expect(inputPositionToFlexAlignmentX(InputPositions.END)).toBe(AlignmentXExtended.SPACE_BETWEEN);
  });

  it('should return responsive flex alignments', () => {
    expect(
      inputPositionToFlexAlignmentX({
        mobile: InputPositions.END,
        tablet: InputPositions.START,
        desktop: InputPositions.END,
      }),
    ).toEqual({
      mobile: AlignmentXExtended.SPACE_BETWEEN,
      tablet: AlignmentXExtended.STRETCH,
      desktop: AlignmentXExtended.SPACE_BETWEEN,
    });
  });
});
