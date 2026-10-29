export type FigmaResolvedType = 'BOOLEAN' | 'COLOR' | 'FLOAT' | 'STRING';

export type FigmaVariableScope =
  | 'ALL_SCOPES'
  | 'TEXT_CONTENT'
  | 'CORNER_RADIUS'
  | 'WIDTH_HEIGHT'
  | 'GAP'
  | 'ALL_FILLS'
  | 'FRAME_FILL'
  | 'SHAPE_FILL'
  | 'TEXT_FILL'
  | 'STROKE_COLOR'
  | 'STROKE'
  | 'STROKE_FLOAT'
  | 'EFFECT_COLOR'
  | 'EFFECT_FLOAT'
  | 'OPACITY'
  | 'FONT_FAMILY'
  | 'FONT_STYLE'
  | 'FONT_WEIGHT'
  | 'FONT_SIZE'
  | 'LINE_HEIGHT'
  | 'LETTER_SPACING'
  | 'PARAGRAPH_SPACING'
  | 'PARAGRAPH_INDENT';

export interface FigmaRgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface FigmaVariableAlias {
  type: 'VARIABLE_ALIAS';
  id: string;
}

export type FigmaVariableValue = boolean | number | string | FigmaRgba | FigmaVariableAlias;

export interface TokenMode {
  id: string;
  name: string;
}

export interface TokenCollection {
  id: string;
  name: string;
  key: string;
  hiddenFromPublishing: boolean;
  defaultModeId: string;
  modes: TokenMode[];
  variableIds: string[];
}

export interface TokenVariable {
  id: string;
  name: string;
  key: string;
  collectionId: string;
  defaultModeId: string;
  resolvedType: FigmaResolvedType;
  valuesByMode: Record<string, FigmaVariableValue>;
  scopes: FigmaVariableScope[];
  remote: boolean;
  hiddenFromPublishing: boolean;
  deletedButReferenced?: boolean;
  codeSyntax: Record<string, string>;
  description: string;
}

export interface TokenVector {
  x: number;
  y: number;
}

export interface TokenColorStop {
  position: number;
  color: FigmaRgba;
  boundVariables?: {
    color?: FigmaVariableAlias;
  };
}

export interface TokenPaint {
  type: string;
  visible?: boolean;
  opacity?: number;
  color?: FigmaRgba;
  gradientHandlePositions?: TokenVector[];
  gradientStops?: TokenColorStop[];
  boundVariables?: {
    color?: FigmaVariableAlias;
  };
}

export interface TokenEffect {
  type: string;
  visible?: boolean;
  radius?: number;
  spread?: number;
  offset?: TokenVector;
  color?: FigmaRgba;
  boundVariables?: {
    color?: FigmaVariableAlias;
    radius?: FigmaVariableAlias;
    spread?: FigmaVariableAlias;
    offsetX?: FigmaVariableAlias;
    offsetY?: FigmaVariableAlias;
  };
}

export interface TokenLineHeight {
  unit: 'PIXELS' | 'PERCENT' | 'AUTO';
  value?: number;
}

export interface TokenLetterSpacing {
  unit: 'PIXELS' | 'PERCENT';
  value: number;
}

export interface TokenTextStyle {
  type: 'TEXT';
  id: string;
  name: string;
  key: string;
  remote: boolean;
  fontSize: number;
  fontName: {
    family: string;
    style: string;
  };
  fontWeight?: number;
  letterSpacing: TokenLetterSpacing;
  lineHeight: TokenLineHeight;
  boundVariables?: Record<string, FigmaVariableAlias>;
}

export interface TokenPaintStyle {
  type: 'PAINT';
  id: string;
  name: string;
  key: string;
  remote: boolean;
  paints: TokenPaint[];
}

export interface TokenEffectStyle {
  type: 'EFFECT';
  id: string;
  name: string;
  key: string;
  remote: boolean;
  effects: TokenEffect[];
}

export type TokenStyle = TokenTextStyle | TokenPaintStyle | TokenEffectStyle;

export interface TokenFile {
  key: string;
  name: string;
}

export interface TokenSource {
  file: TokenFile;
  collections: TokenCollection[];
  variables: TokenVariable[];
  styles: TokenStyle[];
}
