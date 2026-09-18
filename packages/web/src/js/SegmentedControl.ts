import { cssVariablePrefix } from '@alma-oss/spirit-design-tokens';
import BaseComponent from './BaseComponent';
import { EventHandler } from './dom';
import SelectorEngine from './dom/SelectorEngine';
import { CLASS_NAME_TRANSITIONING } from './constants';
import { enableToggleAutoloader, SpiritConfig } from './utils';
import { SpiritElement } from './types';

const NAME = 'segmentedControl';
const DATA_KEY = `${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;
const SELECTOR_INPUT = '[type="radio"]';
const CLASS_NAME_INIT = 'is-initialized';
const EVENT_CHANGE = `change${EVENT_KEY}`;

class SegmentedControl extends BaseComponent {
  parent: HTMLElement;
  inputs: HTMLElement[];

  constructor(element: SpiritElement, config?: SpiritConfig) {
    super(element, config);
    this.parent = this.element as HTMLElement;
    this.inputs = this.getChildren();

    this.init();
  }

  static get NAME(): string {
    return NAME;
  }

  static get DATA_KEY() {
    return `${this.NAME}`;
  }

  static getActiveItem(children: HTMLElement[]): HTMLElement | undefined {
    return children.find((child) => (child as HTMLInputElement).checked);
  }

  getChildren(selector = SELECTOR_INPUT): HTMLElement[] {
    return SelectorEngine.findAll(selector, this.parent);
  }

  static getActivePosition(parent: HTMLElement, children: HTMLElement[]): number {
    const activeItem = SegmentedControl.getActiveItem(children);

    return activeItem ? children.length - children.indexOf(activeItem) - 1 : 0;
  }

  static setActivePosition(parent: HTMLElement, children: HTMLElement[]): void {
    const position = SegmentedControl.getActivePosition(parent, children);

    parent.style.setProperty(`--${cssVariablePrefix}segmented-control-highlight-pos`, position.toString());
  }

  onChange(): void {
    SegmentedControl.setActivePosition(this.parent, this.inputs);
    this.parent.classList.add(CLASS_NAME_TRANSITIONING);
    EventHandler.trigger(this.parent, EVENT_CHANGE);
  }

  onInit(): void {
    this.parent.classList.add(CLASS_NAME_INIT);
    SegmentedControl.setActivePosition(this.parent, this.inputs);
  }

  addEventListeners(): void {
    for (const input of this.inputs) {
      if (input) {
        EventHandler.on(input, 'change', this.onChange.bind(this));
      }
    }
  }

  init() {
    this.onInit();
    this.addEventListeners();
  }
}

enableToggleAutoloader(SegmentedControl);

export default SegmentedControl;
