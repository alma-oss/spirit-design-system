// ⚠️ AI-GENERATED CODE, DO NOT COPY-PASTE.
//
// Demo interaction for the SplitTag radius picker. Options use real focus with roving tabindex.

import Dropdown from '../../../js/Dropdown';

const SELECTOR_SPLIT_TAG_DROPDOWN = '.UNSTABLE_SplitTag > .Dropdown';
const SELECTOR_DROPDOWN_TRIGGER = '[data-spirit-toggle="dropdown"]';
const SELECTOR_SELECTED_RADIUS = '[data-spirit-element="selected-radius"]';
const SELECTOR_LISTBOX = '[role="listbox"]';
const SELECTOR_OPTION = '[role="option"]';
const SELECTOR_OPTION_CHECK = '[data-spirit-element="option-check"]';
const ATTRIBUTE_DATA_TARGET = 'data-spirit-target';

const TYPE_AHEAD_RESET_MS = 500;

const CLASSNAMES_SELECTED = ['color-scheme-on-selected-subtle', 'bg-color-scheme'];

function getOptionLabel(option) {
  return option.querySelector('.Label')?.textContent.trim() || option.textContent.trim();
}

function initSplitTagDropdown(dropdownEl) {
  const triggerEl = dropdownEl.querySelector(SELECTOR_DROPDOWN_TRIGGER);
  const popoverId = triggerEl?.getAttribute(ATTRIBUTE_DATA_TARGET)?.slice(1);
  const popoverEl = popoverId ? document.getElementById(popoverId) : null;
  const listboxEl = popoverEl?.querySelector(SELECTOR_LISTBOX);

  if (!triggerEl || !popoverEl || !listboxEl) return;

  const dropdown = Dropdown.getOrCreateInstance(triggerEl);
  const splitTagEl = dropdownEl.closest('.UNSTABLE_SplitTag');
  const selectedRadiusEl = triggerEl.querySelector(SELECTOR_SELECTED_RADIUS);
  const getOptions = () => Array.from(listboxEl.querySelectorAll(SELECTOR_OPTION));
  const getSelected = () => getOptions().find((option) => option.getAttribute('aria-selected') === 'true');

  function setSelected(option, selected) {
    option.setAttribute('aria-selected', selected ? 'true' : 'false');
    option.setAttribute('tabindex', selected ? '0' : '-1');
    CLASSNAMES_SELECTED.forEach((className) => option.classList.toggle(className, selected));
    option.querySelector(SELECTOR_OPTION_CHECK)?.classList.toggle('d-none', !selected);
  }

  function focusOption(option) {
    getOptions().forEach((candidate) => candidate.setAttribute('tabindex', candidate === option ? '0' : '-1'));
    option.focus();
  }

  function renderSelectedRadius(option) {
    const selectedRadius = getOptionLabel(option);

    if (selectedRadiusEl) selectedRadiusEl.textContent = selectedRadius;

    triggerEl.setAttribute('aria-label', `Select distance, selected ${selectedRadius}`);

    if (splitTagEl) {
      splitTagEl.setAttribute('aria-label', `Prague distance filter, radius ${selectedRadius}`);
    }
  }

  function selectOnly(option) {
    getOptions().forEach((candidate) => setSelected(candidate, candidate === option));
    renderSelectedRadius(option);
    dropdown.hide();
  }

  const initialActive = getSelected() || getOptions()[0];

  if (!initialActive) return;

  getOptions().forEach((option) => option.setAttribute('tabindex', option === initialActive ? '0' : '-1'));

  let typeAheadBuffer = '';
  let typeAheadTimeout = null;

  listboxEl.addEventListener('keydown', (event) => {
    const options = getOptions();
    const current = document.activeElement?.closest(SELECTOR_OPTION);
    const index = options.indexOf(current);

    if (index < 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusOption(options[Math.min(index + 1, options.length - 1)]);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusOption(options[Math.max(index - 1, 0)]);
        break;
      case 'Home':
        event.preventDefault();
        focusOption(options[0]);
        break;
      case 'End':
        event.preventDefault();
        focusOption(options[options.length - 1]);
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        selectOnly(current);
        break;
      case 'Escape':
        event.preventDefault();
        dropdown.hide();
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          if (typeAheadTimeout) window.clearTimeout(typeAheadTimeout);

          typeAheadBuffer += event.key.toLowerCase();
          typeAheadTimeout = window.setTimeout(() => {
            typeAheadBuffer = '';
          }, TYPE_AHEAD_RESET_MS);

          const match = options.find((option) => getOptionLabel(option).toLowerCase().startsWith(typeAheadBuffer));

          if (match) focusOption(match);
        }
        break;
    }
  });

  getOptions().forEach((option) => {
    option.addEventListener('click', () => selectOnly(option));
    option.addEventListener('focus', () => focusOption(option));
  });

  popoverEl.addEventListener('shown.dropdown', () => {
    triggerEl.setAttribute('aria-controls', popoverEl.id);
    focusOption(getSelected() || getOptions().find((option) => option.tabIndex === 0) || getOptions()[0]);
  });

  popoverEl.addEventListener('hidden.dropdown', () => {
    triggerEl.setAttribute('aria-controls', popoverEl.id);

    const activeEl = document.activeElement;

    if (!activeEl || activeEl === document.body || popoverEl.contains(activeEl)) {
      triggerEl.focus();
    }
  });

  triggerEl.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' && triggerEl.getAttribute('aria-expanded') !== 'true') {
      event.preventDefault();
      dropdown.show();
    }
  });
}

export function initSplitTagDropdowns() {
  document.querySelectorAll(SELECTOR_SPLIT_TAG_DROPDOWN).forEach(initSplitTagDropdown);
}
