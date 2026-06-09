import EventHandler from './dom/EventHandler';
import SelectorEngine from './dom/SelectorEngine';

const SELECTOR_TOAST_CONTAINER = '.Toast[popover="manual"]';

const showToastContainer = (element: HTMLElement) => {
  if (typeof element.showPopover !== 'function') {
    return;
  }

  let isOpen = false;

  try {
    isOpen = element.matches(':popover-open');
  } catch {
    // `:popover-open` may be unsupported; fall through and call showPopover() once below.
  }

  if (!isOpen) {
    element.showPopover();
  }
};

const enableToastContainerAutoloader = () => {
  EventHandler.on(window, 'DOMContentLoaded', () => {
    SelectorEngine.findAll(SELECTOR_TOAST_CONTAINER).forEach((element) => {
      showToastContainer(element as HTMLElement);
    });
  });
};

enableToastContainerAutoloader();

export { showToastContainer };
