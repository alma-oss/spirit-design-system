import classNames from 'classnames';
import { CLASS_NAME_OPEN } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type DrawerAlignmentXType, type DrawerPanelProps } from '../../types';
import { DRAWER_ALIGNMENT_DEFAULT } from './constants';

export interface UseDrawerStylesProps extends DrawerPanelProps {
  drawerAlignmentX?: DrawerAlignmentXType;
  isOpen?: boolean;
}

export interface UseDrawerStylesReturn {
  /** className props */
  classProps: {
    root: string;
    panel: string;
    header: string;
    content: string;
  };
}

export const useDrawerStyleProps = (props: UseDrawerStylesProps = {}): UseDrawerStylesReturn => {
  const { drawerAlignmentX = DRAWER_ALIGNMENT_DEFAULT, isOpen = false } = props;

  const drawerClass = useClassNamePrefix('Drawer');
  const drawerAlignXClasses: Record<DrawerAlignmentXType, string> = {
    left: `${drawerClass}--left`,
    right: `${drawerClass}--right`,
  };
  const drawerPanelClass = `${drawerClass}Panel`;
  const drawerPanelHeaderClass = `${drawerPanelClass}__header`;
  const drawerContentClass = `${drawerPanelClass}__content`;

  const classProps = {
    root: classNames(drawerClass, drawerAlignXClasses[drawerAlignmentX], {
      [CLASS_NAME_OPEN]: isOpen,
    }),
    panel: drawerPanelClass,
    header: drawerPanelHeaderClass,
    content: drawerContentClass,
  };

  return {
    classProps,
  };
};
