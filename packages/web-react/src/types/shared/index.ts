import { type ElementType, type JSXElementConstructor, type ReactNode } from 'react';

export * from './adornments';
export * from './buttons';
export * from './colors';
export * from './columns';
export * from './dialogs';
export * from './dictionaries';
export * from './directions';
export * from './dragAndDrop';
export * from './element';
export * from './events';
export * from './inputs';
export * from './item';
export * from './polymorphic';
export * from './positions';
export * from './radii';
export * from './refs';
export * from './responsive';
export * from './rest';
export * from './sizes';
export * from './style';
export * from './text';
export * from './tokens';

export interface ChildrenProps {
  /** The content to display in the component. */
  children?: ReactNode | string;
}

export interface ElementTypeProps<T extends ElementType = 'div'> {
  /**
   * The HTML element or React element used to render the component.
   *
   * @default 'div'
   */
  elementType?: T | JSXElementConstructor<unknown>;
}

export enum SpiritBreakpoints {
  TABLET = 'tablet',
  DESKTOP = 'desktop',
}

/**
 * This is actual type for all aria-* props which have value 'true' or 'false' is called Booleanish.
 * Unfortunately it is not exported, and you must create it manually.
 */
export type Booleanish = boolean | 'true' | 'false';

/**
 * Represents a non-negative integer.
 *
 * @template T - The type of the number.
 */
/* eslint-disable @typescript-eslint/no-explicit-any -- we don't care about the type here */
export type PositiveInteger<T extends number> = `${T}` extends '0' | `-${any}` | `${any}.${any}` ? never : T;
/* eslint-enable @typescript-eslint/no-explicit-any */
