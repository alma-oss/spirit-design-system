import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';

export interface InputDetailsStyleProps {
  isDisabled?: boolean;
}

export interface InputDetailsStyles {
  classProps: string;
}

export function useInputDetailsStyleProps(props: InputDetailsStyleProps): InputDetailsStyles {
  const { isDisabled } = props;
  const inputDetailsClass = useClassNamePrefix('InputDetails');
  const inputDetailsClassDisabled = `${inputDetailsClass}--disabled`;

  return {
    classProps: classNames(inputDetailsClass, {
      [inputDetailsClassDisabled]: isDisabled,
    }),
  };
}
