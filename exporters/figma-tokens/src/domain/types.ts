export type TokenFamily = 'global' | 'theme' | 'device' | 'other';

export type TokenKind =
  | 'borderWidth'
  | 'color'
  | 'dimension'
  | 'fontSize'
  | 'gradient'
  | 'letterSpacing'
  | 'lineHeight'
  | 'radius'
  | 'shadow'
  | 'size'
  | 'space'
  | 'string'
  | 'typography';

export type TokenUnit = 'px' | 'rem' | 'percent' | 'none';

export interface ColorValue {
  type: 'color';
  hex: string;
}

export interface NumberValue {
  type: 'number';
  measure: number;
  unit: TokenUnit;
}

export interface StringValue {
  type: 'string';
  text: string;
}

export interface ShadowLayer {
  inset: boolean;
  x: number;
  y: number;
  radius: number;
  spread: number;
  color: string;
}

export interface ShadowValue {
  type: 'shadow';
  layers: ShadowLayer[];
}

export interface GradientStop {
  position: number;
  color: string;
}

export interface GradientValue {
  type: 'gradient';
  angle: number;
  stops: GradientStop[];
}

export interface TypographyDeviceValue {
  fontSize: number;
  lineHeight?: number;
}

export interface TypographyValue {
  type: 'typography';
  fontFamily: string;
  fontSize: number;
  fontSizeUnit: TokenUnit;
  fontWeight: number | string;
  fontStyle: 'normal' | 'italic';
  lineHeight?: number;
  lineHeightUnit?: TokenUnit;
  byDevice?: Record<string, TypographyDeviceValue>;
}

export type TokenValue = ColorValue | NumberValue | StringValue | ShadowValue | GradientValue | TypographyValue;

export interface DomainToken {
  id: string;
  path: string[];
  name: string;
  family: TokenFamily;
  kind: TokenKind;
  device?: string;
  value: TokenValue;
  remote: boolean;
}

export interface DomainTheme {
  name: string;
  tokens: DomainToken[];
}

export interface DomainDocument {
  fileKey: string;
  fileName: string;
  prefix: string;
  themes: DomainTheme[];
  globalTokens: DomainToken[];
  deviceTokens: DomainToken[];
  warnings: string[];
}

export class DiagnosticCollector {
  readonly errors: string[] = [];
  readonly warnings: string[] = [];

  error(message: string): void {
    this.errors.push(message);
  }

  warn(message: string): void {
    this.warnings.push(message);
  }

  throwIfErrors(): void {
    if (this.errors.length === 0) {
      return;
    }

    throw new Error(`Figma token export failed:\n${this.errors.map((item) => `- ${item}`).join('\n')}`);
  }
}
