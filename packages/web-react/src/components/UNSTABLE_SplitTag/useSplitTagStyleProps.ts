import { useClassNamePrefix } from '../../hooks';

export interface SplitTagStyles {
  /** className props */
  classProps: string;
}

export function useSplitTagStyleProps(): SplitTagStyles {
  const splitTagClass = useClassNamePrefix('UNSTABLE_SplitTag');

  return {
    classProps: splitTagClass,
  };
}
