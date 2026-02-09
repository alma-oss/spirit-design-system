// Problem with the Encore build
// @ts-ignore -- TS2307: Cannot find module 'csstype' or its corresponding type declarations.
import type * as CSS from 'csstype';
import BaseComponent from './BaseComponent';
import { warning } from './common/utilities';
import {
  ATTRIBUTE_ARIA_EXPANDED,
  ATTRIBUTE_DATA_DISMISS,
  ATTRIBUTE_DATA_ELEMENT,
  ATTRIBUTE_DATA_POPULATE_FIELD,
  ATTRIBUTE_DATA_SNIPPET,
  ATTRIBUTE_DATA_TARGET,
  CLASS_NAME_COLOR_SCHEME_PREFIX,
  CLASS_NAME_LINK_DISABLED,
  CLASS_NAME_LINK_UNDERLINED,
  CLASS_NAME_HIDDEN,
  CLASS_NAME_TRANSITIONING,
  CLASS_NAME_VISIBLE,
  DEFAULT_TOAST_AUTO_CLOSE_INTERVAL,
  CLASS_NAME_LINK_NOT_UNDERLINED,
} from './constants';
import { EventHandler, SelectorEngine } from './dom';
import { enableDismissTrigger, enableToggleTrigger, executeAfterTransition, SpiritConfig } from './utils';
import { SpiritElement } from './types';

const NAME = 'toast';
const DATA_KEY = `${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;

const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;

const COLOR_ICON_MAP = {
  danger: 'danger',
  informative: 'info',
  neutral: 'info',
  success: 'check-plain',
  warning: 'warning',
};

const UNDERLINE_MAP = {
  hover: 'hover',
  always: 'always',
  never: 'never',
};

const SELECTOR_QUEUE_ELEMENT = `[${ATTRIBUTE_DATA_ELEMENT}="toast-queue"]`;
const SELECTOR_TEMPLATE_ELEMENT = `[${ATTRIBUTE_DATA_SNIPPET}="item"]`;
const SELECTOR_ITEM_ELEMENT = `[${ATTRIBUTE_DATA_POPULATE_FIELD}="item"]`;
const SELECTOR_ICON_ELEMENT = `[${ATTRIBUTE_DATA_POPULATE_FIELD}="icon"]`;
const SELECTOR_CLOSE_BUTTON_ELEMENT = `[${ATTRIBUTE_DATA_POPULATE_FIELD}="close-button"]`;
const SELECTOR_DISMISS_TRIGGER_ELEMENT = `[${ATTRIBUTE_DATA_DISMISS}="${NAME}"]`;
const SELECTOR_MESSAGE_ELEMENT = `[${ATTRIBUTE_DATA_POPULATE_FIELD}="message"]`;
const SELECTOR_LINK_ELEMENT = `[${ATTRIBUTE_DATA_POPULATE_FIELD}="link"]`;
const SELECTOR_BOX_ELEMENT = `[${ATTRIBUTE_DATA_POPULATE_FIELD}="box"]`;

// Keep in sync with transitions in `scss/Toast/_theme.scss`.
export const PROPERTY_NAME_SLOWEST_TRANSITION = {
  css: 'max-height',
  js: 'maxHeight',
};
const PROPERTY_NAME_FALLBACK_TRANSITION = 'opacity';

const CLASS_NAME_TOAST_BAR_LINK = 'ToastBar__link';

type Color = keyof typeof COLOR_ICON_MAP;
type Underlined = keyof typeof UNDERLINE_MAP;

type Config = {
  autoCloseInterval: number;
  color: Color;
  containerId: string;
  enableAutoClose: boolean;
  message: HTMLElement | string;
  enableLink: boolean;
  linkContent: HTMLElement | string;
  linkProps: {
    color: 'primary' | 'secondary' | 'tertiary';
    elementType: string;
    href: string;
    isDisabled: boolean;
    underlined: Underlined;
    target: '_blank' | '_self' | '_parent' | '_top';
  };
  hasIcon: boolean;
  iconName: string;
  id: string;
  isDismissible: boolean;
};

class Toast extends BaseComponent {
  container: HTMLElement | null;
  isShown: boolean;
  triggers: HTMLElement[];

  static get NAME() {
    return NAME;
  }

  constructor(element: SpiritElement, config?: SpiritConfig) {
    super(element, config);

    this.container = this.getContainer();
    this.isShown = this.checkShownState();
    this.triggers = this.getTriggers();
  }

  checkShownState(): boolean {
    return this.element
      ? this.element.classList.contains(CLASS_NAME_VISIBLE) || !this.element.classList.contains(CLASS_NAME_HIDDEN)
      : false;
  }

  getAwaitedTransitionPropertyName(): CSS.Properties<string | number> {
    // @ts-expect-error -- TS7015: Element implicitly has an any type because index expression is not of type number.
    return parseInt(getComputedStyle(this.element)[PROPERTY_NAME_SLOWEST_TRANSITION.js], 10) > 0
      ? // @ts-expect-error -- Type 'string' has no properties in common with type 'Properties<string | number, string & {}>'.
        PROPERTY_NAME_SLOWEST_TRANSITION.css
      : // @ts-expect-error -- Type 'string' has no properties in common with type 'Properties<string | number, string & {}>'.
        PROPERTY_NAME_FALLBACK_TRANSITION;
  }

  getContainer(): SpiritElement {
    const config = this.config as Config;

    if (!this.element && !config.containerId) {
      warning(false, `No Toast element found or no Toast container ID given.`);

      return null;
    }

    if (this.element && !config.containerId) {
      return this.element.closest(SELECTOR_QUEUE_ELEMENT);
    }

    if (config.containerId) {
      const container = SelectorEngine.findOne(`#${config.containerId}`);

      if (!container) {
        warning(false, `No Toast container found with ID "${config.containerId}".`);

        return null;
      }

      return SelectorEngine.findOne(SELECTOR_QUEUE_ELEMENT, container);
    }

    return null;
  }

  getTemplate(): SpiritElement {
    const templateElement = SelectorEngine.findOne(SELECTOR_TEMPLATE_ELEMENT, this.container) as HTMLTemplateElement;

    if (!templateElement) {
      warning(false, `No Toast template found.`);

      return null;
    }

    const snippetElement = templateElement.content.cloneNode(true) as DocumentFragment;

    if (!snippetElement) {
      warning(false, 'Could not create element from Toast template.');

      return null;
    }

    return snippetElement;
  }

  getTriggers(): SpiritElement[] {
    const id = this.element && (this.element.getAttribute('id') as string);

    return SelectorEngine.findAll(`[${ATTRIBUTE_DATA_TARGET}="#${id}"]`);
  }

  updateOrRemoveCloseButton(closeButtonElement: HTMLElement) {
    const { id, isDismissible } = this.config as Config;

    if (isDismissible) {
      closeButtonElement!.setAttribute('data-spirit-dismiss', 'toast');
      closeButtonElement!.setAttribute('data-spirit-target', `#${id}`);
      closeButtonElement!.setAttribute('aria-controls', id);
    } else {
      closeButtonElement!.remove();
    }
  }

  updateOrRemoveIcon(iconElement: HTMLElement) {
    const { hasIcon, iconName, color } = this.config as Config;

    const iconUseElement = iconElement.querySelector('use') as SVGUseElement;
    const originalIconPath = iconUseElement!.getAttribute('xlink:href') as string;
    const iconPath = originalIconPath.substring(0, originalIconPath.indexOf('#'));

    if (hasIcon) {
      iconUseElement!.setAttribute('xlink:href', `${iconPath}#${iconName || COLOR_ICON_MAP[color]}`);
    } else {
      iconElement!.remove();
    }
  }

  updateOrRemoveLink(linkElement: HTMLElement) {
    const { linkContent, linkProps } = this.config as Config;

    if (!linkProps.href) {
      warning(false, 'Property href in Toast link is required, nothing given.');
    }

    if (linkContent) {
      const linkElementWithType = document.createElement(linkProps.elementType || 'a');
      linkElement.replaceWith(linkElementWithType);
      const { underlined = UNDERLINE_MAP.always } = linkProps;

      linkElementWithType.classList.add(CLASS_NAME_TOAST_BAR_LINK);
      if (underlined === UNDERLINE_MAP.always) {
        linkElementWithType.classList.add(CLASS_NAME_LINK_UNDERLINED);
      }
      if (underlined === UNDERLINE_MAP.never) {
        linkElementWithType.classList.add(CLASS_NAME_LINK_NOT_UNDERLINED);
      }
      if (linkProps.isDisabled) {
        linkElementWithType.classList.add(CLASS_NAME_LINK_DISABLED);
      }
      linkElementWithType.setAttribute('href', linkProps.href);
      linkProps.target && linkElementWithType.setAttribute('target', linkProps.target);
      linkElementWithType!.innerHTML = typeof linkContent === 'string' ? linkContent : linkContent.outerHTML;
    } else {
      linkElement!.remove();
    }
  }

  createFromTemplate(): SpiritElement {
    const template = this.getTemplate();
    if (!template) {
      return null;
    }

    const config = this.config as Config;
    if (!config.message) {
      warning(false, 'Toast message is required, nothing given.');

      return null;
    }

    const itemElement = template.querySelector(SELECTOR_ITEM_ELEMENT) as HTMLElement;
    const iconElement = template.querySelector(SELECTOR_ICON_ELEMENT) as HTMLElement;
    const closeButtonElement = template.querySelector(SELECTOR_CLOSE_BUTTON_ELEMENT) as HTMLElement;
    const messageElement = template.querySelector(SELECTOR_MESSAGE_ELEMENT) as HTMLElement;
    const linkElement = template.querySelector(SELECTOR_LINK_ELEMENT) as HTMLElement;

    itemElement!.setAttribute('id', config.id);

    const boxElement = itemElement!.querySelector(SELECTOR_BOX_ELEMENT) as HTMLElement;
    if (boxElement) {
      const colorScheme = config.color === 'neutral' ? 'neutral-basic' : `emotion-${config.color}-basic`;
      boxElement.classList.add(`${CLASS_NAME_COLOR_SCHEME_PREFIX}${colorScheme}`);
    }

    this.updateOrRemoveIcon(iconElement);
    this.updateOrRemoveCloseButton(closeButtonElement);
    this.updateOrRemoveLink(linkElement);

    messageElement!.innerHTML = typeof config.message === 'string' ? config.message : config.message.outerHTML;

    return itemElement;
  }

  addEvents(): void {
    const dismissButtonElement = SelectorEngine.findOne(SELECTOR_DISMISS_TRIGGER_ELEMENT, this.element);
    if (dismissButtonElement) {
      EventHandler.on(dismissButtonElement, 'click', (event: Event) => {
        event.preventDefault();
        this.hide();
      });
    }
  }

  show(): void {
    const config = this.config as Config;

    if (this.isShown) {
      return;
    }

    this.element = this.element || this.createFromTemplate();
    if (!this.element) {
      return;
    }

    const showEvent = EventHandler.trigger(this.element, Toast.eventName(EVENT_SHOW)) as Event;
    if (showEvent.defaultPrevented) {
      return;
    }

    this.container?.appendChild(this.element);

    if (config.isDismissible) {
      this.addEvents();
    }

    this.triggers.forEach((element) => {
      element?.setAttribute(ATTRIBUTE_ARIA_EXPANDED, 'true');
    });

    // Use setTimeout to force starting the transition
    setTimeout(() => {
      this.element.classList.remove(CLASS_NAME_HIDDEN);
      this.element.classList.add(CLASS_NAME_VISIBLE);
      this.element.classList.add(CLASS_NAME_TRANSITIONING);
    }, 0);

    executeAfterTransition(
      this.element,
      () => {
        EventHandler.trigger(this.element, Toast.eventName(EVENT_SHOWN));
        this.element.classList.remove(CLASS_NAME_TRANSITIONING);
      },
      true,
      this.getAwaitedTransitionPropertyName(),
    );

    this.isShown = true;

    if (config.enableAutoClose) {
      const timeoutId = setTimeout(() => {
        this.hide();
        clearInterval(timeoutId);
      }, config.autoCloseInterval || DEFAULT_TOAST_AUTO_CLOSE_INTERVAL);
    }
  }

  finishHiding = (): void => {
    EventHandler.trigger(this.element, Toast.eventName(EVENT_HIDDEN));
    this.element.remove();
  };

  hide(): void {
    if (!this.isShown || !this.element) {
      return;
    }

    const hideEvent = EventHandler.trigger(this.element, Toast.eventName(EVENT_HIDE)) as Event;
    if (hideEvent.defaultPrevented) {
      return;
    }

    this.triggers.forEach((element) => {
      element?.setAttribute(ATTRIBUTE_ARIA_EXPANDED, 'false');
    });

    // Use the visibility style to check if the toast is already visually hidden
    const { visibility } = getComputedStyle(this.element);

    if (visibility === 'hidden') {
      this.finishHiding();
    } else {
      this.element.classList.remove(CLASS_NAME_VISIBLE);
      this.element.classList.add(CLASS_NAME_HIDDEN);
      this.element.classList.add(CLASS_NAME_TRANSITIONING);

      executeAfterTransition(this.element, this.finishHiding, true, this.getAwaitedTransitionPropertyName());
    }
  }
}

enableToggleTrigger(Toast, 'show', 'target');
enableDismissTrigger(Toast, 'hide', 'target');

export default Toast;
