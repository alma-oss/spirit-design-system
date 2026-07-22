import Manipulator from '../dom/Manipulator';
import { isElement } from './Elements';
import { SpiritElement } from '../types';

export type SpiritConfig = { [kes: string]: unknown } | null;

// Shout-out Angus Croll (https://goo.gl/pxwQGp)
const toType = (object: unknown) => {
  if (object == null) {
    return `${object}`;
  }

  const match = Object.prototype.toString.call(object).match(/\s([a-z]+)/i);

  return match ? match[1].toLowerCase() : '';
};

class Config {
  static get Default(): SpiritConfig {
    return {};
  }

  static get DefaultType(): SpiritConfig {
    return {};
  }

  static get NAME(): string {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }

  getConfig(config: SpiritConfig) {
    const mergedConfig = this.mergeConfigObj(config);
    this.typeCheckConfig(mergedConfig);

    return mergedConfig;
  }

  mergeConfigObj(config?: SpiritConfig, element?: SpiritElement): SpiritConfig {
    const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

    return {
      // @ts-ignore Property 'Default' does not exist on type 'Function'.
      ...this.constructor.Default,
      ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
      ...(isElement(element) ? Manipulator.getDataAttributes(element) : {}),
      ...(typeof config === 'object' ? config : {}),
    };
  }

  // @ts-ignore Property 'DefaultType' does not exist on type 'Function'.
  typeCheckConfig(config: SpiritConfig, configTypes: SpiritConfig = this.constructor.DefaultType) {
    // @ts-ignore No overload matches this call.
    for (const [property, expectedTypes] of Object.entries(configTypes)) {
      const value = config?.[property];
      const valueType = isElement(value) ? 'element' : toType(value);

      // @ts-ignore No overload matches this call.
      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(
          // @ts-ignore Property 'NAME' does not exist on type 'Function'.
          `${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`,
        );
      }
    }
  }
}

export default Config;
