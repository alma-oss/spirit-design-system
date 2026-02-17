'use strict';

/**
 * Changelog preset configuration for Lerna.
 *
 * This file uses conventional-changelog-conventionalcommits@7.x which is
 * CommonJS-compatible. Version 8.x+ is ESM-only and produces broken
 * changelog output with Lerna 9.x (missing links, malformed sections).
 *
 * @see https://github.com/lerna/lerna/issues/4021
 */
const config = require('conventional-changelog-conventionalcommits');

module.exports = config({
  types: [
    { type: 'feat', section: 'Features', hidden: false },
    { type: 'fix', section: 'Bug Fixes', hidden: false },
    { type: 'revert', section: 'Reverts', hidden: false },
    { type: 'docs', section: 'Documentation', hidden: false },
    { type: 'deps', section: 'Dependencies', hidden: false },
    { type: 'chore', section: 'Chores', hidden: false },
    { type: 'perf', section: 'Performance Improvements', hidden: false },
    { type: 'style', section: 'Styles', hidden: false },
    { type: 'refactor', section: 'Code Refactoring', hidden: false },
    { type: 'test', section: 'Tests', hidden: false },
    { type: 'build', section: 'Build System', hidden: true },
    { type: 'ci', section: 'Continuous Integration', hidden: true },
  ],
});
