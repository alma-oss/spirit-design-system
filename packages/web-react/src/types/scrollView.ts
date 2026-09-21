import type { RefObject } from 'react';
import {
  type ChildrenProps,
  type DirectionDictionaryType,
  type StyleProps,
  type TranslatableString,
  type WithStrings,
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
  ariaBottom?: TranslatableString;
  ariaEnd?: TranslatableString;
  ariaStart?: TranslatableString;
  ariaTop?: TranslatableString;
};

export type ScrollViewControlsScrollStepType = number;

interface ScrollViewControlsBaseProps extends WithStrings<ScrollViewStrings> {
  /** @deprecated Use `strings.ariaStart` / `strings.ariaEnd` / `strings.ariaTop` / `strings.ariaBottom` instead. */
  ariaLabelControls?: ScrollViewControlsAriaLabelType;
  direction: ScrollViewDirectionType;
  scrollStep: ScrollViewControlsScrollStepType;
  viewportRef: RefObject<HTMLDivElement>;
}

export interface ScrollViewBaseProps extends ChildrenProps, StyleProps, WithStrings<ScrollViewStrings> {
  /** @deprecated Use `strings.ariaStart` / `strings.ariaEnd` / `strings.ariaTop` / `strings.ariaBottom` instead. */
  ariaLabelControls?: ScrollViewControlsAriaLabelType;
  controlsScrollStep?: ScrollViewControlsScrollStepType;
  direction?: ScrollViewDirectionType;
  hasControls?: boolean;
  isScrollbarDisabled?: boolean;
  overflowDecorators?: ScrollViewOverflowDecoratorsType;
}

export interface SpiritScrollViewProps extends ScrollViewBaseProps {}
export interface SpiritScrollViewControlsProps extends ScrollViewControlsBaseProps {}
