import { type SkeletonDimension } from '../types';

// Storybook only. Text controls emit strings; Skeleton itself accepts a number or a percentage.
const percentagePattern = /^\d+(\.\d+)?%$/;
const pixelPattern = /^\d+(\.\d+)?$/;

export const parseSkeletonDimension = (value: unknown): SkeletonDimension | undefined => {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();

  if (percentagePattern.test(trimmed)) {
    return trimmed as SkeletonDimension;
  }

  if (pixelPattern.test(trimmed)) {
    return Number(trimmed);
  }

  return undefined;
};
