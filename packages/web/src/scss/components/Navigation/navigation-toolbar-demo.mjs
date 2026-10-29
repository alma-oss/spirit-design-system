// ⚠️ AI-GENERATED CODE, DO NOT COPY-PASTE.

// Navigation toolbar — demo interaction script
//
// Roving tabindex on a `Navigation` with `role="toolbar"`, the same as in web-react:
//   - Single Tab stop: the active item has `tabindex="0"`, the other items `tabindex="-1"`
//   - The focused (or clicked) item becomes the active one, so Tab returns to it
//   - Arrow keys matching `aria-orientation` move focus with wrapping (Left/Right swapped in RTL)
//   - Home/End move focus to the first/last item
//   - Items are interactive NavigationAction, NavigationAvatar and Button elements; disabled ones are skipped
//
// See https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/

const SELECTOR_TOOLBAR = '.Navigation[role="toolbar"]';
const SELECTOR_ITEM = ['.NavigationAction', '.NavigationAvatar', '.Button']
  .flatMap((className) => [`a${className}[href]`, `button${className}:not([disabled])`])
  .join(', ');

const getItems = (toolbar) => Array.from(toolbar.querySelectorAll(SELECTOR_ITEM));

const getNextIndex = (toolbar, key, currentIndex, count) => {
  const isVertical = toolbar.getAttribute('aria-orientation') === 'vertical';
  const isRtl = !isVertical && getComputedStyle(toolbar).direction === 'rtl';
  const horizontalKeys = isRtl ? ['ArrowLeft', 'ArrowRight'] : ['ArrowRight', 'ArrowLeft'];
  const [nextKey, previousKey] = isVertical ? ['ArrowDown', 'ArrowUp'] : horizontalKeys;

  switch (key) {
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    case nextKey:
      return (currentIndex + 1) % count;
    case previousKey:
      return (currentIndex - 1 + count) % count;
    default:
      return -1;
  }
};

const setActiveItem = (items, activeItem) => {
  items.forEach((item) => {
    item.setAttribute('tabindex', item === activeItem ? '0' : '-1');
  });
};

function initToolbar(toolbar) {
  setActiveItem(getItems(toolbar), getItems(toolbar)[0]);

  toolbar.addEventListener('focusin', (event) => {
    const items = getItems(toolbar);

    if (items.includes(event.target)) {
      setActiveItem(items, event.target);
    }
  });

  toolbar.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    const items = getItems(toolbar);
    const currentIndex = items.indexOf(event.target);

    if (currentIndex === -1) {
      return;
    }

    const nextItem = items[getNextIndex(toolbar, event.key, currentIndex, items.length)];

    if (nextItem) {
      event.preventDefault();
      setActiveItem(items, nextItem);
      nextItem.focus();
    }
  });
}

export function initNavigationToolbars() {
  document.querySelectorAll(SELECTOR_TOOLBAR).forEach(initToolbar);
}
