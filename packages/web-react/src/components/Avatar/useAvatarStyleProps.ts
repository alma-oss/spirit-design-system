import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type AvatarStyleProps } from '../../types';
import { generateResponsiveClassNames } from '../../utils';

export interface AvatarStyles<T> {
  classProps: string;
  props: T;
}

export const useAvatarStyleProps = (props: AvatarStyleProps): AvatarStyles<AvatarStyleProps> => {
  const { isSquare, size, ...restProps } = props;

  const avatarClass = useClassNamePrefix('Avatar');
  const avatarSquareClass = `${avatarClass}--square`;
  const avatarSizeClass = generateResponsiveClassNames(avatarClass, size);

  const classProps = classNames(avatarClass, ...avatarSizeClass, {
    [avatarSquareClass]: isSquare,
  });

  return {
    classProps,
    props: restProps,
  };
};
