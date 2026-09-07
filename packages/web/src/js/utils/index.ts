/**
 * Trick to restart an element's animation
 *
 * @param element
 * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
 */
const reflow = (element: HTMLElement): void => {
  // eslint-disable-next-line no-unused-expressions
  element.offsetHeight;
};

export {
  enableToggleTrigger,
  enableDismissTrigger,
  enableToggleAutoloader,
  clickOutsideElement,
} from './ComponentFunctions';
export { loadComponents } from '../dom/Autoload';
export * from './Config';
export { default as Config } from './Config';
export * from './Debounce';
export * from './Deprecations';
export * from './Elements';
export * from './Image2Base64Preview';
export { default as ScrollControl } from './ScrollControl';
export * from './Transitions';
export { reflow };
