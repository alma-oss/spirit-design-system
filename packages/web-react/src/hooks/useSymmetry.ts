import { breakpointOrder } from '../constants';
import { BREAKPOINT_MOBILE, type BreakpointToken, type SingleOrResponsive } from '../types';

const SYMMETRICAL_CLASS_SUFFIX = '--symmetrical';
const NON_SYMMETRICAL_CLASS_SUFFIX = '--asymmetrical';

interface SymmetryReturn {
  isSymmetricalActive: boolean;
  symmetricalClassName: string;
}

interface ReducerAccumulator {
  classes: string[];
  wasSymmetrical: boolean;
}

function getSymmetryClassNamesReducer(componentClass: string, isSymmetrical: Record<string, boolean>) {
  return (acc: ReducerAccumulator, breakpoint: BreakpointToken): ReducerAccumulator => {
    if (breakpoint in isSymmetrical) {
      const value = isSymmetrical[breakpoint];
      const infix = breakpoint === BREAKPOINT_MOBILE ? '' : `--${breakpoint}`;
      if (value) {
        return {
          classes: [...acc.classes, `${componentClass}${infix}${SYMMETRICAL_CLASS_SUFFIX}`],
          wasSymmetrical: true,
        };
      }
      if (acc.wasSymmetrical) {
        return {
          classes: [...acc.classes, `${componentClass}${infix}${NON_SYMMETRICAL_CLASS_SUFFIX}`],
          wasSymmetrical: acc.wasSymmetrical,
        };
      }
    }

    return acc;
  };
}

export function useSymmetry(
  componentClass: string,
  isSymmetrical: SingleOrResponsive<boolean> | undefined,
): SymmetryReturn {
  if (typeof isSymmetrical !== 'object' || isSymmetrical === null) {
    return {
      isSymmetricalActive: isSymmetrical === true,
      symmetricalClassName: isSymmetrical ? `${componentClass}${SYMMETRICAL_CLASS_SUFFIX}` : '',
    };
  }

  const { classes } = breakpointOrder.reduce(getSymmetryClassNamesReducer(componentClass, isSymmetrical), {
    classes: [] as string[],
    wasSymmetrical: false,
  });

  return {
    isSymmetricalActive: Object.values(isSymmetrical).includes(true),
    symmetricalClassName: classes.join(' '),
  };
}
