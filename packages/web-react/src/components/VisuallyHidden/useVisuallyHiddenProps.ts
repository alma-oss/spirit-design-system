import { useClassNamePrefix } from '../../hooks';
import { type VisuallyHiddenProps } from '../../types';

export interface VisuallyHiddenStyles {
  /** className props */
  classProps: string | null;
  /** props to be passed to the element */
  props: VisuallyHiddenProps;
}

export function useVisuallyHiddenProps(props: VisuallyHiddenProps): VisuallyHiddenStyles {
  const { ...restProps } = props;

  const visuallyHiddenClass = useClassNamePrefix('accessibility-hidden');

  return {
    classProps: visuallyHiddenClass,
    props: restProps,
  };
}
