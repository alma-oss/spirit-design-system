import type { RefObject } from 'react';
import {
  type ChildrenProps,
  type DirectionDictionaryType,
  type StringsProps,
  type StyleProps,
  type TranslatableString,
} from './shared';

export type ScrollViewDirectionType = DirectionDictionaryType;
export type ScrollViewOverflowDecoratorsType = 'borders' | 'shadows' | 'both';

export type ScrollViewControlsAriaLabelType = {
  top?: string;
  bottom?: string;
  start?: string;
  end?: string;
};

export type ScrollViewStrings = {
  ariaLabel?: {
    bottom?: TranslatableString;
    end?: TranslatableString;
    start?: TranslatableString;
    top?: TranslatableString;
  };
};

export type ScrollViewControlsScrollStepType = number;

interface ScrollViewControlsBaseProps extends StringsProps<ScrollViewStrings> {
  /** @deprecated Use `strings.ariaLabel.start` / `strings.ariaLabel.end` / `strings.ariaLabel.top` / `strings.ariaLabel.bottom` instead. */
  ariaLabelControls?: ScrollViewControlsAriaLabelType;
  direction: ScrollViewDirectionType;
  scrollStep: ScrollViewControlsScrollStepType;
  viewportRef: RefObject<HTMLDivElement>;
}

export interface ScrollViewBaseProps extends ChildrenProps, StyleProps, StringsProps<ScrollViewStrings> {
  /** @deprecated Use `strings.ariaLabel.start` / `strings.ariaLabel.end` / `strings.ariaLabel.top` / `strings.ariaLabel.bottom` instead. */
  ariaLabelControls?: ScrollViewControlsAriaLabelType;
  controlsScrollStep?: ScrollViewControlsScrollStepType;
  direction?: ScrollViewDirectionType;
  hasControls?: boolean;
  isScrollbarDisabled?: boolean;
  overflowDecorators?: ScrollViewOverflowDecoratorsType;
}

export interface SpiritScrollViewProps extends ScrollViewBaseProps {}
export interface SpiritScrollViewControlsProps extends ScrollViewControlsBaseProps {}
