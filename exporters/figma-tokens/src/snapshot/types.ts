export const SNAPSHOT_SCHEMA_VERSION = 1;

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

export interface SnapshotMode {
  id: string;
  name: string;
}

export interface SnapshotCollection {
  id: string;
  name: string;
  key: string;
  hiddenFromPublishing: boolean;
  defaultModeId: string;
  modes: SnapshotMode[];
  variableIds: string[];
}

export interface SnapshotVariable {
  id: string;
  name: string;
  key: string;
  collectionId: string;
  resolvedType: FigmaResolvedType;
  valuesByMode: Record<string, FigmaVariableValue>;
  scopes: FigmaVariableScope[];
  remote: boolean;
  hiddenFromPublishing: boolean;
  codeSyntax: Record<string, string>;
  description: string;
}

export interface SnapshotVector {
  x: number;
  y: number;
}

export interface SnapshotColorStop {
  position: number;
  color: FigmaRgba;
  boundVariables?: {
    color?: FigmaVariableAlias;
  };
}

export interface SnapshotPaint {
  type: string;
  visible?: boolean;
  opacity?: number;
  color?: FigmaRgba;
  gradientHandlePositions?: SnapshotVector[];
  gradientStops?: SnapshotColorStop[];
  boundVariables?: {
    color?: FigmaVariableAlias;
  };
}

export interface SnapshotEffect {
  type: string;
  visible?: boolean;
  radius?: number;
  spread?: number;
  offset?: SnapshotVector;
  color?: FigmaRgba;
  boundVariables?: {
    color?: FigmaVariableAlias;
    radius?: FigmaVariableAlias;
    spread?: FigmaVariableAlias;
    offsetX?: FigmaVariableAlias;
    offsetY?: FigmaVariableAlias;
  };
}

export interface SnapshotLineHeight {
  unit: 'PIXELS' | 'PERCENT' | 'AUTO';
  value?: number;
}

export interface SnapshotLetterSpacing {
  unit: 'PIXELS' | 'PERCENT';
  value: number;
}

export interface SnapshotTextStyle {
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
  letterSpacing: SnapshotLetterSpacing;
  lineHeight: SnapshotLineHeight;
  boundVariables?: Record<string, FigmaVariableAlias>;
}

export interface SnapshotPaintStyle {
  type: 'PAINT';
  id: string;
  name: string;
  key: string;
  remote: boolean;
  paints: SnapshotPaint[];
}

export interface SnapshotEffectStyle {
  type: 'EFFECT';
  id: string;
  name: string;
  key: string;
  remote: boolean;
  effects: SnapshotEffect[];
}

export type SnapshotStyle = SnapshotTextStyle | SnapshotPaintStyle | SnapshotEffectStyle;

export interface SnapshotFile {
  key: string;
  name: string;
}

export interface SnapshotDiagnostic {
  level: 'error' | 'warning';
  message: string;
}

export interface SnapshotV1 {
  schemaVersion: typeof SNAPSHOT_SCHEMA_VERSION;
  capturedAt: string;
  file: SnapshotFile;
  collections: SnapshotCollection[];
  variables: SnapshotVariable[];
  styles: SnapshotStyle[];
  dependencies: SnapshotVariable[];
  diagnostics: SnapshotDiagnostic[];
}
