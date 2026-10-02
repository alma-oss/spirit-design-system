export const wrapSection = (label, value, utils, indent = 0) =>
  value ? `${' '.repeat(indent)}${utils.DIM_COLOR(label)} ${value}` : null;

export const buildBlock = (...parts) => parts.filter(Boolean).join('\n');
