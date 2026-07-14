import { useClassNamePrefix } from '../../hooks';

export interface UnstableSplitTagStyles {
  /** className props */
  classProps: string;
}

export function useUnstableSplitTagStyleProps(): UnstableSplitTagStyles {
  const unstableSplitTagClass = useClassNamePrefix('UNSTABLE_SplitTag');

  return {
    classProps: unstableSplitTagClass,
  };
}
