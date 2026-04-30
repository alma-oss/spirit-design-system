import { useClassNamePrefix } from '../../hooks';

export interface UseFieldGroupStyleReturn {
  /** className props */
  classProps: {
    root: string;
  };
}

export const useFieldGroupStyleProps = (): UseFieldGroupStyleReturn => ({
  classProps: {
    root: useClassNamePrefix('border-0'),
  },
});
