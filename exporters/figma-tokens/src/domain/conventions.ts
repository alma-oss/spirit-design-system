import { toParamCase } from './naming';

export const DEVICE_MODE_ORDER = ['mobile', 'tablet', 'desktop'];

export const tokenGroup = (path: string[]): string => toParamCase(path[0] ?? '');
