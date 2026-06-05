import type { RefObject } from 'react';
import { type ChildrenProps, type DirectionDictionaryType, type StyleProps } from './shared';

export type ScrollViewDirectionType = DirectionDictionaryType;
export type ScrollViewOverflowDecoratorsType = 'borders' | 'shadows' | 'both';

export type ScrollViewControlsAriaLabelType = {
  top?: string;
  bottom?: string;
  start?: string;
  end?: string;
};

export type ScrollViewControlsScrollStepType = number;

interface ScrollViewControlsBaseProps {
  ariaLabelControls?: ScrollViewControlsAriaLabelType;
  direction: ScrollViewDirectionType;
  scrollStep: ScrollViewControlsScrollStepType;
  viewportRef: RefObject<HTMLDivElement>;
}

export interface ScrollViewBaseProps extends ChildrenProps, StyleProps {
  ariaLabelControls?: ScrollViewControlsAriaLabelType;
  controlsScrollStep?: ScrollViewControlsScrollStepType;
  direction?: ScrollViewDirectionType;
  hasControls?: boolean;
  isScrollbarDisabled?: boolean;
  overflowDecorators?: ScrollViewOverflowDecoratorsType;
}

export interface SpiritScrollViewProps extends ScrollViewBaseProps {}
export interface SpiritScrollViewControlsProps extends ScrollViewControlsBaseProps {}
