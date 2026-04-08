import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritToastProps } from '../../types';

export interface ToastStyles<T> {
  classProps: {
    root: string;
    queue: string;
  };
  props: T;
}

export function useToastStyleProps(props: SpiritToastProps): ToastStyles<SpiritToastProps> {
  const { alignmentX, alignmentY, isCollapsible, ...restProps } = props;

  const toastClass = useClassNamePrefix('Toast');

  function processAlignments(alignments: Array<SpiritToastProps['alignmentX'] | SpiritToastProps['alignmentY']>) {
    return alignments.map((alignment) =>
      typeof alignment === 'object' && alignment !== null
        ? Object.keys(alignment).reduce<string[]>((acc, key) => {
            const infix = key === 'mobile' ? '' : `--${key}`;

            return [...acc, `${toastClass}${infix}--${alignment[key as keyof typeof alignment]}`];
          }, [])
        : [`${toastClass}--${alignment}`],
    );
  }

  const alignmentClasses = [...processAlignments([alignmentX, alignmentY])];
  const collapsibleClass = `${toastClass}--collapsible`;

  const toastQueueClass = `${toastClass}__queue`;

  return {
    classProps: {
      root: classNames(toastClass, isCollapsible && collapsibleClass, ...alignmentClasses),
      queue: toastQueueClass,
    },
    props: restProps,
  };
}
