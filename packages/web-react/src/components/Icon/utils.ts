import { getAccentColorNames, getEmotionColorNames, getTextColorNames } from '../../utils';
import { IconColorsExtended } from './constants';

export const textColors = getTextColorNames();
export const accentColors = getAccentColorNames();
export const emotionColors = getEmotionColorNames();
export const selectedColors = Object.values(IconColorsExtended);
export const iconColors = [...textColors, ...selectedColors, ...accentColors, ...emotionColors];
