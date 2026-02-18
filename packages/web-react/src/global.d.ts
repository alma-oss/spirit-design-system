/* eslint-disable @typescript-eslint/ban-types */
import type { ExoticComponent, FC, StaticLifecycle } from 'react';

interface Window {
  console: Console;
}

/**
 * Declaring `prettier` module to fix following problem
 *
 * ../../node_modules/@storybook/components/dist/index.d.ts:5:35
 * error TS7016: Could not find a declaration file for module 'prettier'. '/spirit-design-system/node_modules/prettier/index.js' implicitly has an 'any' type.
 *  Try `npm i --save-dev @types/prettier` if it exists or add a new declaration (.d.ts) file containing `declare module 'prettier';`
 * 5 import { BuiltInParserName } from 'prettier';
 */

declare global {
  namespace jest {
    type AxeImpactLevel = 'minor' | 'moderate' | 'serious' | 'critical';

    interface AxeMatcherOptions {
      includedImpacts?: AxeImpactLevel[];
    }

    interface Matchers<R = void> {
      toHaveNoAxeViolations(options?: AxeMatcherOptions): R;
    }

    interface Expect {
      toHaveNoAxeViolations(options?: AxeMatcherOptions): unknown;
    }

    interface InverseMatchers<R = void> {
      toHaveNoAxeViolations(options?: AxeMatcherOptions): R;
    }
  }

  module '*.md' {
    const content: string;
    export default content;
  }

  module '*.md?raw' {
    const content: string;
    export default content;
  }

  module 'prettier' {
    export type BuiltInParserName = unknown;
  }

  namespace React {
    interface NamedExoticComponent<P = {}> extends ExoticComponent<P> {
      spiritComponent?: string;
    }

    interface FunctionComponent<P = {}> extends FC<P> {
      spiritComponent?: string;
    }

    interface ComponentClass<P = {}, S = {}> extends StaticLifecycle<P, S> {
      spiritComponent?: string;
    }
  }
}
