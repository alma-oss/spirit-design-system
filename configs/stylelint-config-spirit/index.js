import prettierPlugin from './plugins/prettier.js';
import styleRules from './rules/style.js';
import unstableRules from './rules/unstable.js';

export default {
  extends: ['@almacareer/stylelint-config', prettierPlugin, styleRules, unstableRules],
};
