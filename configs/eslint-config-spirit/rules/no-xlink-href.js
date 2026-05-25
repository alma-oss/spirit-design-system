/**
 * @fileoverview ESLint rule to disallow deprecated xlink:href attribute.
 *
 * The xlink:href attribute was deprecated in SVG 2.0 in favor of plain `href`.
 * This rule detects its usage across:
 *   - JSX attributes (xlink:href="..." or xlinkHref="...")
 *   - String/template literals containing xlink:href (e.g. in dangerouslySetInnerHTML or raw HTML)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href
 */

"use strict";

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow deprecated xlink:href attribute in favor of href",
      category: "Best Practices",
      recommended: true,
      url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href",
    },
    fixable: "code",
    schema: [],
    messages: {
      jsxNamespacedAttr:
        "Deprecated SVG attribute 'xlink:href' found. Use 'href' instead.",
      jsxCamelCaseAttr:
        "Deprecated SVG attribute 'xlinkHref' (camelCase form of xlink:href) found. Use 'href' instead.",
      stringLiteral:
        "Deprecated SVG attribute 'xlink:href' found in string. Use 'href' instead.",
    },
  },

  create(context) {
    /**
     * Checks a string value for xlink:href occurrences and reports them.
     * @param {import('eslint').Rule.Node} node
     * @param {string} value
     */
    function checkStringForXlinkHref(node, value) {
      if (/xlink:href/i.test(value)) {
        context.report({
          node,
          messageId: "stringLiteral",
        });
      }
    }

    return {
      // ── JSX: xlink:href="..." ──────────────────────────────────────────────
      JSXAttribute(node) {
        const { name } = node;

        // Namespaced attribute: xlink:href
        if (
          name.type === "JSXNamespacedName" &&
          name.namespace.name === "xlink" &&
          name.name.name === "href"
        ) {
          context.report({
            node,
            messageId: "jsxNamespacedAttr",
            fix(fixer) {
              // Replace the whole attribute name (xlink:href) with href.
              // Preserve the value expression as-is.
              const value = node.value;
              const valueSource = value
                ? context.getSourceCode().getText(value)
                : null;

              return fixer.replaceText(
                node,
                valueSource ? `href=${valueSource}` : "href"
              );
            },
          });
          return;
        }

        // camelCase form used in React: xlinkHref
        if (
          name.type === "JSXIdentifier" &&
          name.name === "xlinkHref"
        ) {
          context.report({
            node,
            messageId: "jsxCamelCaseAttr",
            fix(fixer) {
              const value = node.value;
              const valueSource = value
                ? context.getSourceCode().getText(value)
                : null;

              return fixer.replaceText(
                node,
                valueSource ? `href=${valueSource}` : "href"
              );
            },
          });
        }
      },

      // ── String literals ────────────────────────────────────────────────────
      Literal(node) {
        if (typeof node.value === "string") {
          checkStringForXlinkHref(node, node.value);
        }
      },

      // ── Template literals ──────────────────────────────────────────────────
      TemplateLiteral(node) {
        for (const quasi of node.quasis) {
          checkStringForXlinkHref(node, quasi.value.raw);
        }
      },
    };
  },
};

module.exports = rule;
