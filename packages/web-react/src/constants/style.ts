export const BackgroundStyleProps = {
  backgroundGradient: 'bg-gradient',
} as const;

export const BorderRadiusStyleProps = {
  borderRadius: 'rounded',
  borderRadiusTopStart: 'rounded-top-start',
  borderRadiusTopEnd: 'rounded-top-end',
  borderRadiusBottomEnd: 'rounded-bottom-end',
  borderRadiusBottomStart: 'rounded-bottom-start',
} as const;

export const SpacingStyleProp = {
  margin: 'm',
  marginTop: 'mt',
  marginRight: 'mr',
  marginBottom: 'mb',
  marginLeft: 'ml',
  marginX: 'mx',
  marginY: 'my',
} as const;

export const PaddingStyleProps = {
  padding: 'p',
  paddingBottom: 'pb',
  paddingLeft: 'pl',
  paddingRight: 'pr',
  paddingTop: 'pt',
  paddingX: 'px',
  paddingY: 'py',
} as const;

export const TextStyleProps = {
  isTextBalanced: 'text-wrap-pretty',
  textAlignment: 'text',
  textHyphens: 'text-hyphens',
  textWordBreak: 'text-word-break',
} as const;

export const HeadingStyleProps = {
  isTextBalanced: 'text-wrap-balance',
};

export const DisplayStyleProps = {
  hideOn: 'd',
  hideFrom: 'd',
} as const;

export const ThemeStyleProps = {
  theme: '',
} as const;
