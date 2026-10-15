import {
  accent02BackgroundBasic,
  backgroundSecondary,
  backgroundTertiary,
  borderBasic,
  borderWidth100,
  borderWidth200,
  breakpointDesktop,
  breakpointTablet,
  containerPaddingDesktop,
  containerXlargeMaxWidth,
  gradientPrimary,
  gradientSecondary,
  radius300,
  radius400,
  radius500,
  radiusFull,
  shadow100,
  shadow200,
  shadow300,
  space500,
  space700,
  space1000,
  space1300,
  textPrimary,
  textSecondary,
  textTertiary,
} from '@alma-oss/spirit-design-tokens';

export type TokenChipKind =
  | 'color'
  | 'radius'
  | 'typography'
  | 'spacing'
  | 'shadow'
  | 'gradient'
  | 'border'
  | 'container'
  | 'icon'
  | 'illustration';

export interface TokenChip {
  kind: TokenChipKind;
  /** Token name as it is written in the Spirit documentation. */
  name: string;
  /** Human readable value (px or hex code), omitted for tokens without a single value. */
  value?: string;
  /** Raw CSS value of the token used to draw the preview. */
  css?: string;
  /** Name of the Spirit icon, used only by the icon chips. */
  icon?: string;
  /** Public path of the illustration preview, the empty box is drawn until the image is provided. */
  image?: string;
}

/**
 * Every row has its own mix of categories, so the same kinds of chips do not meet in one place while the rows drift in
 * opposite directions. The chips of one kind are spread out within their row.
 */
export const tokenRows: TokenChip[][] = [
  [
    { kind: 'container', name: 'container-xlarge-max-width', value: '1280', css: containerXlargeMaxWidth },
    { kind: 'color', name: 'blue-1000', value: '#0066d8', css: '#0066d8' },
    { kind: 'spacing', name: 'space-1000', value: '32', css: space1000 },
    { kind: 'icon', name: 'icon-download', icon: 'download' },
    { kind: 'container', name: 'breakpoint-tablet', value: '768', css: breakpointTablet },
    { kind: 'color', name: 'yellow-800', value: '#ffd24d', css: '#ffd24d' },
    { kind: 'spacing', name: 'space-700', value: '16', css: space700 },
    { kind: 'illustration', name: 'illustration-404' },
    { kind: 'container', name: 'container-padding-desktop', value: '32', css: containerPaddingDesktop },
    { kind: 'color', name: 'accent-02-background-basic', value: '#7847ff', css: accent02BackgroundBasic },
    { kind: 'spacing', name: 'space-500', value: '8', css: space500 },
    { kind: 'color', name: 'text-secondary', value: '#535353', css: textSecondary },
    { kind: 'container', name: 'breakpoint-desktop', value: '1280', css: breakpointDesktop },
    { kind: 'spacing', name: 'space-1300', value: '56', css: space1300 },
  ],
  [
    { kind: 'radius', name: 'radius-300', value: '8', css: radius300 },
    { kind: 'shadow', name: 'shadow-100', css: shadow100 },
    { kind: 'gradient', name: 'gradient-primary', css: gradientPrimary },
    { kind: 'border', name: 'border-width-100', value: '1', css: borderWidth100 },
    { kind: 'icon', name: 'logo-facebook-colored', icon: 'logo-facebook-colored' },
    { kind: 'radius', name: 'radius-500', value: '16', css: radius500 },
    { kind: 'shadow', name: 'shadow-200', css: shadow200 },
    { kind: 'color', name: 'orange-700', value: '#f7b166', css: '#f7b166' },
    { kind: 'gradient', name: 'gradient-secondary', css: gradientSecondary },
    { kind: 'border', name: 'border-width-200', value: '2', css: borderWidth200 },
    { kind: 'illustration', name: 'illustration-error' },
    { kind: 'radius', name: 'radius-400', value: '12', css: radius400 },
    { kind: 'shadow', name: 'shadow-300', css: shadow300 },
    { kind: 'radius', name: 'radius-full', value: '9999', css: radiusFull },
  ],
  [
    { kind: 'typography', name: 'label-large' },
    { kind: 'color', name: 'background-tertiary', value: '#f1edff', css: backgroundTertiary },
    { kind: 'typography', name: 'eyebrow' },
    { kind: 'color', name: 'text-primary', value: '#202020', css: textPrimary },
    { kind: 'icon', name: 'icon-search', icon: 'search' },
    { kind: 'typography', name: 'caption' },
    { kind: 'color', name: 'green-900', value: '#65af72', css: '#65af72' },
    { kind: 'typography', name: 'display-large' },
    { kind: 'color', name: 'border-basic', value: '#d9d9d9', css: borderBasic },
    { kind: 'illustration', name: 'illustration-not-found' },
    { kind: 'typography', name: 'action-large' },
    { kind: 'color', name: 'background-secondary', value: '#f4f4f4', css: backgroundSecondary },
    { kind: 'typography', name: 'input-large' },
    { kind: 'color', name: 'text-tertiary', value: '#7f7f7f', css: textTertiary },
  ],
];
