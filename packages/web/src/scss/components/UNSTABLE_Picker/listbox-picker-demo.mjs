// ⚠️ AI-GENERATED CODE, DO NOT COPY-PASTE.
//
// Demo interaction for the Picker `listbox` presentation. Options are `role="option"` inside a
// `role="listbox"`; selection is expressed with `aria-selected` (no native inputs). Keyboard:
// roving tabindex with Arrow (clamped) / Home / End, Space & Enter to toggle, and type-ahead.

// eslint-disable-next-line import/extensions -- browser ESM (loaded via <script type="module">) requires the extension
import { createSelectionLabel, createTag, initPopoverBehavior } from './picker-demo.mjs';

const SELECTOR_LISTBOX_PICKER = '[data-spirit-toggle="listbox-picker"]';
const SELECTOR_DROPDOWN_TRIGGER = '[data-spirit-toggle="dropdown"]';
const SELECTOR_SELECTION = '[data-spirit-element="selection"]';
const SELECTOR_LISTBOX = '[role="listbox"]';
const SELECTOR_OPTION = '[role="option"]';
const SELECTOR_OPTION_CHECK = '[data-spirit-element="option-check"]';
const ATTRIBUTE_DATA_TARGET = 'data-spirit-target';

const TYPE_AHEAD_RESET_MS = 500;

const CLASSNAMES_SELECTED = ['color-scheme-on-selected-subtle', 'bg-color-scheme'];

function getOptionLabel(option) {
  return option.textContent.trim();
}

function initListboxPicker(dropdownEl) {
  const selectionEl = dropdownEl.querySelector(SELECTOR_SELECTION);
  const popoverId = dropdownEl
    .querySelector(`[${ATTRIBUTE_DATA_TARGET}]`)
    ?.getAttribute(ATTRIBUTE_DATA_TARGET)
    ?.slice(1);
  const popoverEl = popoverId ? document.getElementById(popoverId) : null;

  if (!selectionEl || !popoverEl) return;

  const label = dropdownEl.dataset.pickerLabel || '';
  const listboxEl = popoverEl.querySelector(SELECTOR_LISTBOX);
  const isMultiselectable = listboxEl?.getAttribute('aria-multiselectable') === 'true';

  const getOptions = () => Array.from(popoverEl.querySelectorAll(SELECTOR_OPTION));
  const isSelected = (option) => option.getAttribute('aria-selected') === 'true';
  const getSelected = () => getOptions().filter(isSelected);

  function setSelected(option, selected) {
    option.setAttribute('aria-selected', selected ? 'true' : 'false');
    CLASSNAMES_SELECTED.forEach((className) => option.classList.toggle(className, selected));
    option.querySelector(SELECTOR_OPTION_CHECK)?.classList.toggle('d-none', !selected);
  }

  function selectOnly(option) {
    getOptions().forEach((candidate) => setSelected(candidate, candidate === option));
  }

  function render() {
    const selected = getSelected();

    if (selected.length === 0) {
      selectionEl.setAttribute('role', 'group');
      selectionEl.textContent = '';
      selectionEl.appendChild(createSelectionLabel(label));

      return;
    }

    selectionEl.setAttribute('role', 'grid');
    selectionEl.textContent = '';

    selected.forEach((option) => {
      const tag = createTag(
        getOptionLabel(option),
        selectionEl,
        () => {
          setSelected(option, false);
          render();
        },
        null,
        '',
        false,
      );
      selectionEl.appendChild(tag);
    });

    const rows = selectionEl.querySelectorAll('[data-tag-row]');

    if (rows.length > 0) {
      rows[rows.length - 1].setAttribute('tabindex', '0');
    }
  }

  function toggle(option) {
    if (isMultiselectable) {
      setSelected(option, !isSelected(option));
    } else {
      selectOnly(option);
    }

    render();
  }

  function focusOption(option) {
    getOptions().forEach((candidate) => candidate.setAttribute('tabindex', candidate === option ? '0' : '-1'));
    option.focus();
  }

  // Initial roving tab stop: first selected option, else the first option.
  const initialActive = getSelected()[0] || getOptions()[0];
  getOptions().forEach((option) => option.setAttribute('tabindex', option === initialActive ? '0' : '-1'));

  let typeAheadBuffer = '';
  let typeAheadTimeout = null;

  listboxEl?.addEventListener('keydown', (event) => {
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
        toggle(current);
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          if (typeAheadTimeout) clearTimeout(typeAheadTimeout);
          typeAheadBuffer += event.key.toLowerCase();
          typeAheadTimeout = setTimeout(() => {
            typeAheadBuffer = '';
          }, TYPE_AHEAD_RESET_MS);

          const match = options.find((option) => getOptionLabel(option).toLowerCase().startsWith(typeAheadBuffer));

          if (match) focusOption(match);
        }
        break;
    }
  });

  getOptions().forEach((option) => {
    option.addEventListener('click', () => toggle(option));
    option.addEventListener('focus', () => {
      getOptions().forEach((candidate) => candidate.setAttribute('tabindex', candidate === option ? '0' : '-1'));
    });
  });

  render();
}

export function initListboxPickers() {
  document.querySelectorAll(SELECTOR_LISTBOX_PICKER).forEach((dropdownEl) => {
    initListboxPicker(dropdownEl);

    const triggerEl = dropdownEl.querySelector(SELECTOR_DROPDOWN_TRIGGER);
    const popoverId = triggerEl?.getAttribute(ATTRIBUTE_DATA_TARGET)?.slice(1);
    const popoverEl = popoverId ? document.getElementById(popoverId) : null;

    if (triggerEl && popoverEl) {
      initPopoverBehavior(triggerEl, popoverEl);
    }
  });
}
