// ⚠️ AI-GENERATED CODE, DO NOT COPY-PASTE.

export const SELECTOR_TAG_ROW = '[data-tag-row]';
export const SELECTOR_TAG_LABEL = '[data-tag-label]';
export const SELECTOR_TAG_CLOSE = '[data-tag-close]';

export const ID_SELECTION_LABEL_TEMPLATE = 'picker-selection-label-template';
export const ID_TAG_TEMPLATE = 'picker-tag-template';

const ATTRIBUTE_DATA_TARGET = 'data-spirit-target';
const ATTRIBUTE_AGGREGATE_TAGS = 'data-spirit-picker-aggregate-tags';

const CLASSNAME_TAG_SIZE_DEFAULT = 'Tag--small';
const CLASSNAME_CONTROL_BUTTON_SIZE_DEFAULT = 'ControlButton--small';

const SELECTOR_PICKER = '[data-spirit-toggle="picker"]';
const SELECTOR_DROPDOWN_TRIGGER = '[data-spirit-toggle="dropdown"]';
const SELECTOR_SELECTION = '[data-spirit-element="selection"]';
const SELECTOR_SELECTION_LABEL = '[data-spirit-element="selection-label"]';
const SELECTOR_CHECKBOX = '[data-spirit-element="checkbox"]';
const SELECTOR_CHECKBOX_LABEL = '[data-spirit-element="checkbox-label"]';
const SELECTOR_CHECKBOX_INPUT = 'input[type="checkbox"]';

const SELECTOR_FOCUSABLE =
  'input:not([disabled]), button:not([disabled]), select, textarea, a[href], [tabindex]:not([tabindex="-1"])';
const SELECTOR_FOCUSABLE_ANY = 'input, button, select, textarea, a[href], [tabindex]:not([tabindex="-1"])';

const EVENT_SHOWN = 'shown.dropdown';
const EVENT_HIDDEN = 'hidden.dropdown';

const TAG_SIZES = {
  xsmall: { tagSizeClass: 'Tag--xsmall', controlButtonSizeClass: 'ControlButton--xsmall' },
  small: { tagSizeClass: 'Tag--small', controlButtonSizeClass: 'ControlButton--small' },
  medium: { tagSizeClass: 'Tag--medium', controlButtonSizeClass: 'ControlButton--medium' },
};

function createSelectionLabel(text) {
  const template = document.getElementById(ID_SELECTION_LABEL_TEMPLATE);
  const label = template.content.cloneNode(true);

  label.querySelector(SELECTOR_SELECTION_LABEL).textContent = text;

  return label;
}

function getCheckboxLabel(checkbox) {
  const label = checkbox.closest(SELECTOR_CHECKBOX)?.querySelector(SELECTOR_CHECKBOX_LABEL);

  return label ? label.textContent.trim() : '';
}

function createTag(tagLabel, selectionEl, onClose, sizeConfig) {
  const tag = document.getElementById(ID_TAG_TEMPLATE).content.cloneNode(true);
  const row = tag.querySelector(SELECTOR_TAG_ROW);

  row.setAttribute('aria-label', tagLabel);
  row.setAttribute('tabindex', '-1');
  tag.querySelector(SELECTOR_TAG_LABEL).textContent = tagLabel;

  const removeButton = tag.querySelector(SELECTOR_TAG_CLOSE);

  removeButton.setAttribute('aria-label', `Remove ${tagLabel}`);
  removeButton.setAttribute('tabindex', '-1');

  if (sizeConfig) {
    row.classList.remove(CLASSNAME_TAG_SIZE_DEFAULT);
    row.classList.add(sizeConfig.tagSizeClass);
    removeButton.classList.remove(CLASSNAME_CONTROL_BUTTON_SIZE_DEFAULT);
    removeButton.classList.add(sizeConfig.controlButtonSizeClass);
  }

  row.addEventListener('focus', () => removeButton.setAttribute('tabindex', '0'));
  row.addEventListener('blur', () => removeButton.setAttribute('tabindex', '-1'));

  function focusAfterDelete(deletedIndex) {
    const newRows = Array.from(selectionEl.querySelectorAll(SELECTOR_TAG_ROW));
    const focusTarget = newRows[deletedIndex] || newRows[deletedIndex - 1];

    if (focusTarget) {
      newRows.forEach((tagRow) => tagRow.setAttribute('tabindex', '-1'));
      focusTarget.setAttribute('tabindex', '0');
      focusTarget.focus();
    } else {
      const label = selectionEl.querySelector(SELECTOR_SELECTION_LABEL);

      if (label) {
        label.setAttribute('tabindex', '0');
        label.focus();
        label.addEventListener('blur', () => label.removeAttribute('tabindex'), { once: true });
      }
    }
  }

  tag.querySelector(SELECTOR_TAG_CLOSE).addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    const rows = Array.from(selectionEl.querySelectorAll(SELECTOR_TAG_ROW));
    const deletedIndex = rows.indexOf(row);

    onClose();
    focusAfterDelete(deletedIndex);
  });

  row.addEventListener('keydown', function (event) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();

      const rows = Array.from(selectionEl.querySelectorAll(SELECTOR_TAG_ROW));
      const deletedIndex = rows.indexOf(this);

      onClose();
      focusAfterDelete(deletedIndex);

      return;
    }

    const rows = Array.from(selectionEl.querySelectorAll(SELECTOR_TAG_ROW));
    const index = rows.indexOf(this);

    let target = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      target = rows[(index + 1) % rows.length];
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      target = rows[(index - 1 + rows.length) % rows.length];
    } else if (event.key === 'Home') {
      target = rows[0] || null;
    } else if (event.key === 'End') {
      target = rows[rows.length - 1] || null;
    }

    if (target) {
      event.preventDefault();
      rows.forEach((tagRow) => tagRow.setAttribute('tabindex', '-1'));
      target.setAttribute('tabindex', '0');
      target.focus();
    }
  });

  return tag;
}

function initPicker(dropdownEl) {
  const selectionEl = dropdownEl.querySelector(SELECTOR_SELECTION);
  const popoverId = dropdownEl
    .querySelector(`[${ATTRIBUTE_DATA_TARGET}]`)
    ?.getAttribute(ATTRIBUTE_DATA_TARGET)
    ?.slice(1);
  const popoverEl = popoverId ? document.getElementById(popoverId) : null;

  const triggerEl = dropdownEl.querySelector(SELECTOR_DROPDOWN_TRIGGER);

  if (!selectionEl || !popoverEl) return;
  if (triggerEl?.disabled) return;

  const label = dropdownEl.dataset.pickerLabel || '';
  const aggregateTags = dropdownEl.hasAttribute(ATTRIBUTE_AGGREGATE_TAGS);
  const tagSizeKey = dropdownEl.dataset.pickerTagSize;
  const sizeConfig = (tagSizeKey && TAG_SIZES[tagSizeKey]) || null;
  const getCheckboxes = () => Array.from(popoverEl.querySelectorAll(SELECTOR_CHECKBOX_INPUT));
  const getChecked = () => getCheckboxes().filter((checkbox) => checkbox.checked);

  function render() {
    const checked = getChecked();
    const count = checked.length;

    if (count === 0) {
      selectionEl.setAttribute('role', 'group');
      selectionEl.textContent = '';
      selectionEl.appendChild(createSelectionLabel(label));

      return;
    }

    selectionEl.setAttribute('role', 'grid');
    selectionEl.textContent = '';

    if (aggregateTags) {
      const tagLabel = count === 1 ? getCheckboxLabel(checked[0]) : `${label} (${count})`;
      const tag = createTag(
        tagLabel,
        selectionEl,
        () => {
          getCheckboxes().forEach((checkbox) => {
            checkbox.checked = false;
          });
          render();
        },
        sizeConfig,
      );
      selectionEl.appendChild(tag);
    } else {
      checked.forEach((checkbox) => {
        const tagLabel = getCheckboxLabel(checkbox);
        const tag = createTag(
          tagLabel,
          selectionEl,
          () => {
            checkbox.checked = false;
            render();
          },
          sizeConfig,
        );
        selectionEl.appendChild(tag);
      });
    }

    const allRows = selectionEl.querySelectorAll(SELECTOR_TAG_ROW);

    if (allRows.length > 0) {
      allRows[allRows.length - 1].setAttribute('tabindex', '0');
    }
  }

  const fieldset = popoverEl.querySelector('fieldset');

  if (fieldset) {
    fieldset.addEventListener('change', render);
  }

  render();
}

export function initPopoverBehavior(triggerEl, popoverEl) {
  // Initial focus: move to first interactive element when popover opens
  popoverEl.addEventListener(EVENT_SHOWN, () => {
    const first = popoverEl.querySelector(SELECTOR_FOCUSABLE_ANY);
    first?.focus();
  });

  // Focus restoration: return focus to trigger on any close (Escape, click outside, programmatic)
  popoverEl.addEventListener(EVENT_HIDDEN, () => {
    triggerEl.focus();
  });

  popoverEl.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      event.preventDefault();

      if (triggerEl.getAttribute('aria-expanded') === 'true') {
        triggerEl.click();
      }

      return;
    }

    // Tab off last focusable element closes the popover (non-modal anchored dropdown pattern)
    if (event.key === 'Tab' && !event.shiftKey) {
      const focusable = Array.from(popoverEl.querySelectorAll(SELECTOR_FOCUSABLE));

      if (focusable.length > 0 && document.activeElement === focusable[focusable.length - 1]) {
        event.preventDefault();
        triggerEl.click();
      }
    }
  });

  triggerEl.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (triggerEl.getAttribute('aria-expanded') !== 'true') {
        triggerEl.click();
      }
    }

    if (event.key === 'Escape') {
      event.preventDefault();

      if (triggerEl.getAttribute('aria-expanded') === 'true') {
        triggerEl.click();
      }
    }
  });
}

export function initPickers() {
  document.querySelectorAll(SELECTOR_PICKER).forEach(initPicker);

  // Keyboard: Esc closes Dropdown, ArrowDown opens Dropdown
  document.querySelectorAll(SELECTOR_PICKER).forEach((dropdownEl) => {
    const triggerEl = dropdownEl.querySelector(SELECTOR_DROPDOWN_TRIGGER);
    const popoverId = triggerEl?.getAttribute(ATTRIBUTE_DATA_TARGET)?.slice(1);
    const popoverEl = popoverId ? document.getElementById(popoverId) : null;

    if (!triggerEl || !popoverEl) return;

    initPopoverBehavior(triggerEl, popoverEl);
  });
}
