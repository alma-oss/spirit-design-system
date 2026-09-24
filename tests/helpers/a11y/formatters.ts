import { type Result as AxeResult, type NodeResult } from 'axe-core';
import { type FormattedViolation, type FormattedNode, type A11yScanResult, type ImpactLevel } from './types';
import { IMPACT_BADGES } from './types';

export const formatNode = (node: NodeResult): FormattedNode => ({
  html: node.html,
  target: node.target,
  failureSummary: node.failureSummary || 'No summary available',
});

export const formatViolations = (violations: AxeResult[]): FormattedViolation[] =>
  violations.map(({ id: ruleId, impact, description, helpUrl, nodes }) => ({
    ruleId,
    impact,
    description,
    helpUrl,
    nodes: nodes.map(formatNode),
  }));

export const getImpactBadge = (impact: string): string => IMPACT_BADGES[impact as ImpactLevel] || '[UNKNOWN]';

// TODO by dlouhak: Find better way how to format console logs  – #DS-2327
export const formatViolationError = (results: A11yScanResult): string => {
  const header
    = `\n${'='.repeat(80)}\n`
      + 'ACCESSIBILITY VIOLATIONS FOUND\n'
      + `URL: ${results.url}\n`
      + `Total Violations: ${results.violationCount}\n`
      + `${'='.repeat(80)}\n`;

  const violationDetails = results.violations
    .map((violation, index) => {
      const impactBadge = getImpactBadge(violation.impact);
      const violationHeader
        = `\n[${index + 1}] ${violation.ruleId} ${impactBadge}\n`
          + `Description: ${violation.description}\n`
          + `Help: ${violation.helpUrl}\n`;

      const affectedElements = violation.nodes
        .map((node, nodeIndex) =>
          `  Element ${nodeIndex + 1}:\n`
          + `    Target: ${node.target.join(', ')}\n`
          + `    HTML: ${node.html}\n`
          + `    Issue: ${node.failureSummary}\n`)
        .join('\n');

      return `${violationHeader}\nAffected Elements:\n${affectedElements}`;
    })
    .join(`\n${'-'.repeat(80)}\n`);

  const footer = `\n${'='.repeat(80)}\n`;

  return header + violationDetails + footer;
};
