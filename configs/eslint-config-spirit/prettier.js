/**
 * @todo Move this configuration to Code Quality Tools once the migration to ESLint v9 is done
 * @see { @link https://github.com/alma-oss/spirit-design-system/issues/2268 }
 */
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'prettier-config-spirit';

export default [
  eslintConfigPrettier,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },

    rules: {
      // matches `plugin:prettier/recommended`, which this replaces
      'prefer-arrow-callback': 'off',

      /**
       * Use prettier config for code formatting
       *
       * @see { @link https://github.com/prettier/eslint-plugin-prettier }
       */
      'prettier/prettier': [
        'error',
        {
          ...prettierConfig,
        },
      ],

      /**
       * There are places where arrow body make sense and where does not
       * We are leaving this up to developer to decide where to use braces
       * and where implicit return
       * Conflicting with the Prettier configuration for the line length
       *
       * @see { @link https://eslint.org/docs/latest/rules/arrow-body-style }
       */
      'arrow-body-style': ['warn', 'as-needed'],
    },
  },
];
