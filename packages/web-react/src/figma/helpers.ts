import figma from 'figma';

type FigmaInstance = typeof figma.selectedInstance;

export const getInstance = (): FigmaInstance => figma.selectedInstance;

export const getText = (instance: FigmaInstance, layerName: string): string => {
  const result = instance.findText(layerName);

  return result.type !== 'ERROR' ? result.textContent : '';
};
