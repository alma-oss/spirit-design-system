import { type ComponentPropsWithoutRef } from 'react';
import { type StyleProps } from './shared';

export interface SpiritDividerProps extends StyleProps, Omit<ComponentPropsWithoutRef<'hr'>, 'className' | 'style'> {}
