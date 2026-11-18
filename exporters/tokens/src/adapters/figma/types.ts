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

export interface FigmaMode {
  id: string;
  name: string;
}

export interface FigmaCollection {
  id: string;
  name: string;
  key: string;
  hiddenFromPublishing: boolean;
  defaultModeId: string;
  modes: FigmaMode[];
  variableIds: string[];
}

export interface FigmaVariable {
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

export interface FigmaVector {
  x: number;
  y: number;
}

export interface FigmaColorStop {
  position: number;
  color: FigmaRgba;
  boundVariables?: {
    color?: FigmaVariableAlias;
  };
}

export interface FigmaPaint {
  type: string;
  visible?: boolean;
  opacity?: number;
  color?: FigmaRgba;
  gradientHandlePositions?: FigmaVector[];
  gradientStops?: FigmaColorStop[];
  boundVariables?: {
    color?: FigmaVariableAlias;
  };
}

export interface FigmaEffect {
  type: string;
  visible?: boolean;
  radius?: number;
  spread?: number;
  offset?: FigmaVector;
  color?: FigmaRgba;
  boundVariables?: {
    color?: FigmaVariableAlias;
    radius?: FigmaVariableAlias;
    spread?: FigmaVariableAlias;
    offsetX?: FigmaVariableAlias;
    offsetY?: FigmaVariableAlias;
  };
}

export interface FigmaLineHeight {
  unit: 'PIXELS' | 'PERCENT' | 'AUTO';
  value?: number;
}

export interface FigmaLetterSpacing {
  unit: 'PIXELS' | 'PERCENT';
  value: number;
}

export interface FigmaTextStyle {
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
  letterSpacing: FigmaLetterSpacing;
  lineHeight: FigmaLineHeight;
  boundVariables?: Record<string, FigmaVariableAlias>;
}

export interface FigmaPaintStyle {
  type: 'PAINT';
  id: string;
  name: string;
  key: string;
  remote: boolean;
  paints: FigmaPaint[];
}

export interface FigmaEffectStyle {
  type: 'EFFECT';
  id: string;
  name: string;
  key: string;
  remote: boolean;
  effects: FigmaEffect[];
}

export type FigmaStyle = FigmaTextStyle | FigmaPaintStyle | FigmaEffectStyle;

export interface FigmaFile {
  key: string;
  name: string;
}

export interface FigmaSource {
  file: FigmaFile;
  collections: FigmaCollection[];
  variables: FigmaVariable[];
  styles: FigmaStyle[];
}
