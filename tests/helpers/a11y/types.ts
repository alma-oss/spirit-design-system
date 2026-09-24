export type StringOrStringArray = string | string[];

export interface A11yScanOptions {
  /** CSS selectors to exclude from scan */
  exclude?: StringOrStringArray;
  /** Rule IDs to disable */
  disableRules?: StringOrStringArray;
  /** Tags to filter rules (e.g., 'wcag2a', 'wcag2aa') */
  withTags?: StringOrStringArray;
  /** Specific rule IDs to test */
  withRules?: StringOrStringArray;
}

export const IMPACT_BADGES = {
  critical: '[CRITICAL]',
  serious: '[SERIOUS]',
  moderate: '[MODERATE]',
  minor: '[MINOR]',
} as const;

export type ImpactLevel = keyof typeof IMPACT_BADGES;

export interface FormattedViolation {
  ruleId: string;
  impact: ImpactLevel;
  description: string;
  helpUrl: string;
  nodes: FormattedNode[];
}

export interface FormattedNode {
  html: string;
  target: string[];
  failureSummary: string;
}

export interface A11yScanResult {
  violations: FormattedViolation[];
  violationCount: number;
  url: string;
  timestamp: string;
}
