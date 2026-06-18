export const isPopoverOpen = (element: HTMLElement) => {
  try {
    return element.matches(':popover-open');
  } catch {
    return false;
  }
};

export const showToastPopover = (element: HTMLElement | null) => {
  if (typeof element?.showPopover !== 'function' || isPopoverOpen(element)) {
    return;
  }

  element.showPopover();
};
