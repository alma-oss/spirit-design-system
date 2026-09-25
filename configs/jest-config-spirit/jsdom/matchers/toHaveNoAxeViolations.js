import { buildBlock, wrapSection } from './utils.js';

const formatNodes = (nodes, utils) =>
  nodes
    .map((node, index) =>
      buildBlock(
        `   ${index + 1}.`,
        wrapSection('Target:', node.target?.join(', '), utils, 6),
        wrapSection('HTML:', node.html ? utils.printReceived(node.html) : undefined, utils, 6),
        wrapSection('Failure:', node.failureSummary, utils, 6),
      ))
    .join('\n');

const formatNodesBlock = (nodes, utils) =>
  nodes.length ? `${utils.DIM_COLOR('• Nodes:')}${'\n'}${formatNodes(nodes, utils)}` : null;

const formatViolations = (violations, utils) =>
  violations
    .map((violation) => {
      const { id, impact, help, description, helpUrl, nodes = [] } = violation;
      const header = utils.RECEIVED_COLOR(`${id}${impact ? ` [${impact}]` : ''}`);

      return buildBlock(
        `${header} - ${help}`,
        wrapSection('• Description:', description, utils),
        wrapSection('• More info:', helpUrl, utils),
        formatNodesBlock(nodes, utils),
      );
    })
    .join('\n\n');

export const toHaveNoAxeViolations = function toHaveNoAxeViolations(received, options = {}) {
  const { includedImpacts } = options;
  const { matcherHint } = this.utils;

  if (!received || typeof received !== 'object') {
    throw new TypeError('toHaveNoAxeViolations matcher requires an object returned by axe().');
  }

  const violations = Array.isArray(received.violations) ? received.violations : [];
  const filteredViolations
    = includedImpacts && includedImpacts.length
      ? violations.filter((violation) => includedImpacts.includes(violation.impact))
      : violations;

  const pass = filteredViolations.length === 0;

  return {
    pass,
    message: () => {
      if (pass) {
        return (
          `${matcherHint('.not.toHaveNoAxeViolations')}`
          + '\n\nExpected accessibility violations to be present, but none were found.'
        );
      }

      const violationMessage = formatViolations(filteredViolations, this.utils);
      const hint = matcherHint('.toHaveNoAxeViolations');

      return `${hint}\n\nExpected zero accessibility violations. Received:\n\n${violationMessage}`;
    },
  };
};
