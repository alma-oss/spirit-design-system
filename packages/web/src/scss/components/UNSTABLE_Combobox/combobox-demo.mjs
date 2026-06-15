// ⚠️ AI-GENERATED CODE, DO NOT COPY-PASTE.

import Dropdown from '../../../js/Dropdown';

// UNSTABLE_Combobox — demo interaction script
//
// Responsibilities:
//   - Filter grid rows as the user types
//   - Toggle aria-selected on rows (click or Enter/Space)
//   - Render/remove Tag rows in the selection grid
//   - Keyboard navigation: pure aria-activedescendant (DOM focus stays on the input; options are activated visually)
//   - Clear-all button: deselect all rows, remove all tags
//   - Popover open/close: pointer click, typing, Arrow Up/Down open; Escape, click-outside, Tab-out close
//     (keyboard focus alone / Tab into the field does not open)
//   - Hide the "+ Add more…" affordance when every option is already selected

// ─── Selectors ───────────────────────────────────────────────────────────────

const SELECTOR_COMBOBOX = '[data-spirit-element="combobox"]';
const SELECTOR_INPUT = '[data-spirit-combobox-input]';
const SELECTOR_POPUP = '[data-spirit-combobox-listbox]';
/** Popup options: listbox `option` or grid `row` (selection tags are excluded). */
const SELECTOR_OPTION_ITEM = '[role="option"], [role="row"]:not([data-spirit-combobox-tag-row])';
const SELECTOR_OPTION_CELL_CONTROL = 'button:not([disabled]), [role="button"]:not([aria-disabled="true"])';
const SELECTOR_GRIDCELL = '[role="gridcell"]';
/** Remove control inside an option row (grid pattern demo: drop the option from the list). */
const SELECTOR_OPTION_REMOVE = '[data-spirit-combobox-option-remove]';
const SELECTOR_SELECTION = '[data-spirit-combobox-selection]';
const SELECTOR_CLEAR = '[data-spirit-combobox-clear]';
const SELECTOR_TAG_ROW = '[data-spirit-combobox-tag-row]';
const SELECTOR_TAG_CLOSE = '[data-spirit-combobox-tag-close]';
const SELECTOR_TAG_LABEL = '[data-spirit-combobox-tag-label]';
const SELECTOR_TAG_DESCRIPTION = '[data-spirit-combobox-tag-description]';
const SELECTOR_EMPTY_STATE = '[data-spirit-combobox-empty-state]';
const SELECTOR_LOADING = '[data-spirit-combobox-loading]';

const ATTR_ASYNC = 'data-spirit-combobox-async';
/** Filter-only demos (e.g. Last Searches): input filters rows; primary action is a link — no tags. */
const ATTR_FILTER_ONLY = 'data-spirit-combobox-filter-only';

const ID_TAG_TEMPLATE = 'combobox-tag-template';

// Simulated async search delay (ms) — used only by instances with data-spirit-combobox-async
const ASYNC_DELAY_MS = 600;

const CLASSNAME_TAG_SIZE_DEFAULT = 'Tag--small';
const CLASSNAME_CONTROL_BUTTON_SIZE_DEFAULT = 'ControlButton--xsmall';

// Maps InputContainer size → nested Tag / ControlButton sizes (same as React COMBOBOX_NESTED_*_MAP).
const NESTED_TAG_SIZES = {
  small: { tagSizeClass: 'Tag--xsmall', controlButtonSizeClass: 'ControlButton--xsmall' },
  medium: { tagSizeClass: 'Tag--small', controlButtonSizeClass: 'ControlButton--xsmall' },
  large: { tagSizeClass: 'Tag--medium', controlButtonSizeClass: 'ControlButton--xsmall' },
};

// ─── Utilities ────────────────────────────────────────────────────────────────

function getRows(popupEl) {
  return Array.from(popupEl.querySelectorAll(SELECTOR_OPTION_ITEM));
}

function getVisibleRows(popupEl) {
  return getRows(popupEl).filter((row) => row.style.display !== 'none');
}

function isRowDisabled(rowEl) {
  return rowEl?.getAttribute('aria-disabled') === 'true';
}

// First enabled row from `startIndex`, walking in `step` direction without wrapping.
function findEnabledRow(rows, startIndex, step) {
  for (let index = startIndex; index >= 0 && index < rows.length; index += step) {
    if (!isRowDisabled(rows[index])) return rows[index];
  }

  return null;
}

function getMoveStep(move) {
  switch (move) {
    case 'previous':
    case 'last':
      return -1;
    case 'next':
    case 'first':
    default:
      return 1;
  }
}

// Wrapped arrow / Home / End index that keeps travelling until it lands on an enabled row.
// Mirrors `getNextEnabledRowIndex` in web-react. Returns -1 when every row is disabled.
function getNextEnabledRowIndex(currentIndex, rows, move) {
  const count = rows.length;

  if (count <= 0) return -1;

  const step = getMoveStep(move);
  let index;

  switch (move) {
    case 'first':
      index = 0;
      break;
    case 'last':
      index = count - 1;
      break;
    case 'next':
      index = (currentIndex + 1) % count;
      break;
    case 'previous':
    default:
      index = (currentIndex - 1 + count) % count;
      break;
  }

  for (let visited = 0; visited < count; visited += 1) {
    if (!isRowDisabled(rows[index])) return index;
    index = (index + step + count) % count;
  }

  return -1;
}

function getRowCellControls(rowEl) {
  return Array.from(rowEl.querySelectorAll(SELECTOR_OPTION_CELL_CONTROL));
}

function setRowSelected(rowEl, selected, { disabled = false } = {}) {
  rowEl.setAttribute('aria-selected', selected ? 'true' : 'false');
  rowEl.classList.toggle('color-scheme-on-selected-subtle', selected);
  rowEl.classList.toggle('bg-color-scheme', selected && !disabled);
  // Match Item API: selected + disabled uses disabled surface utilities, no fill background.
  rowEl.classList.toggle('disabled', selected && disabled);
  rowEl.classList.toggle('text-color-scheme', selected && disabled);
}

function getRowLabel(rowEl) {
  const explicitLabel = rowEl.getAttribute('data-spirit-label');

  if (explicitLabel) {
    return explicitLabel.trim();
  }

  const firstCell = rowEl.querySelector(SELECTOR_GRIDCELL);

  return firstCell ? firstCell.textContent.trim() : rowEl.textContent.trim();
}

function getNestedTagSizeConfig(comboboxEl) {
  const inputContainer = comboboxEl.querySelector('.InputContainer');

  if (inputContainer?.classList.contains('InputContainer--small')) {
    return NESTED_TAG_SIZES.small;
  }

  if (inputContainer?.classList.contains('InputContainer--large')) {
    return NESTED_TAG_SIZES.large;
  }

  return NESTED_TAG_SIZES.medium;
}

// ─── Tag management ───────────────────────────────────────────────────────────

function removeFocusedTag(selectionEl, onRemove) {
  onRemove();

  // Focus goes back to the filter input, never to a neighbouring tag (Gmail-style chips).
  requestAnimationFrame(() => {
    const comboboxEl = selectionEl.closest(SELECTOR_COMBOBOX);
    const inputEl = comboboxEl?.querySelector(SELECTOR_INPUT);

    if (!inputEl) return;

    inputEl.focus();
  });
}

function createTag(label, selectionEl, onRemove, { disabled = false, sizeConfig = NESTED_TAG_SIZES.medium } = {}) {
  const template = document.getElementById(ID_TAG_TEMPLATE);

  if (!template) {
    // eslint-disable-next-line no-console
    console.warn(`[UNSTABLE_Combobox] Tag template #${ID_TAG_TEMPLATE} not found — skipping tag render.`);

    return null;
  }

  const fragment = template.content.cloneNode(true);
  const row = fragment.querySelector(SELECTOR_TAG_ROW);
  // The tag description is a single shared element placed outside every combobox;
  // resolve it from the document, not from within the combobox.
  const tagDescriptionId = document.querySelector(SELECTOR_TAG_DESCRIPTION)?.id;

  row.setAttribute('aria-label', label);
  row.setAttribute('tabindex', '-1');

  if (tagDescriptionId) {
    row.setAttribute('aria-describedby', tagDescriptionId);
  }

  fragment.querySelector(SELECTOR_TAG_LABEL).textContent = label;

  const closeBtn = fragment.querySelector(SELECTOR_TAG_CLOSE);

  closeBtn.setAttribute('aria-label', `Remove ${label}`);
  closeBtn.setAttribute('tabindex', '-1');

  if (sizeConfig.tagSizeClass !== CLASSNAME_TAG_SIZE_DEFAULT) {
    row.classList.remove(CLASSNAME_TAG_SIZE_DEFAULT);
    row.classList.add(sizeConfig.tagSizeClass);
  }

  if (sizeConfig.controlButtonSizeClass !== CLASSNAME_CONTROL_BUTTON_SIZE_DEFAULT) {
    closeBtn.classList.remove(CLASSNAME_CONTROL_BUTTON_SIZE_DEFAULT);
    closeBtn.classList.add(sizeConfig.controlButtonSizeClass);
  }

  if (disabled) {
    // Disabled tag: drop the selected color scheme in favor of the disabled visual state and
    // disable the close button so it cannot be activated while the combobox is non-interactive.
    row.classList.remove('color-scheme-on-selected-basic');
    row.classList.add('disabled');
    closeBtn.disabled = true;

    return fragment;
  }

  row.addEventListener('focus', () => closeBtn.setAttribute('tabindex', '0'));
  row.addEventListener('blur', () => closeBtn.setAttribute('tabindex', '-1'));

  row.addEventListener('keydown', (event) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      removeFocusedTag(selectionEl, onRemove);

      return;
    }

    const rows = Array.from(selectionEl.querySelectorAll(SELECTOR_TAG_ROW));
    const index = rows.indexOf(row);
    let target = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = rows[(index + 1) % rows.length];
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      target = rows[(index - 1 + rows.length) % rows.length];
    else if (event.key === 'Home') [target] = rows;
    else if (event.key === 'End') target = rows[rows.length - 1];

    if (target) {
      event.preventDefault();
      rows.forEach((r) => r.setAttribute('tabindex', '-1'));
      target.setAttribute('tabindex', '0');
      target.focus();
    }
  });

  closeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    removeFocusedTag(selectionEl, onRemove);
  });

  return fragment;
}

// ─── Filter ───────────────────────────────────────────────────────────────────

function filterRows(popupEl, query) {
  const normalised = query.trim().toLowerCase();

  getRows(popupEl).forEach((row) => {
    const label = getRowLabel(row);
    const matches = !normalised || label.toLowerCase().includes(normalised);

    row.style.display = matches ? '' : 'none';
  });

  const emptyState = popupEl.querySelector(SELECTOR_EMPTY_STATE);
  const anyVisible = getVisibleRows(popupEl).length > 0;

  if (emptyState) {
    emptyState.hidden = anyVisible;
  }
}

// ─── Loading state ────────────────────────────────────────────────────────────

function setLoading(comboboxEl, popupEl, isLoading) {
  const loadingEl = comboboxEl.querySelector(SELECTOR_LOADING);

  if (!loadingEl) return;

  loadingEl.hidden = !isLoading;

  popupEl.querySelectorAll(`${SELECTOR_OPTION_ITEM}, ${SELECTOR_EMPTY_STATE}`).forEach((el) => {
    el.style.display = isLoading ? 'none' : '';
  });
}

// ─── Init per instance ───────────────────────────────────────────────────────

function initCombobox(comboboxEl) {
  const inputEl = comboboxEl.querySelector(SELECTOR_INPUT);
  const popupEl = comboboxEl.querySelector(SELECTOR_POPUP);
  const selectionEl = comboboxEl.querySelector(SELECTOR_SELECTION);
  const clearBtn = comboboxEl.querySelector(SELECTOR_CLEAR);

  if (!inputEl || !popupEl || !selectionEl) return;

  const isDisabled = inputEl.disabled;
  const isAsync = comboboxEl.hasAttribute(ATTR_ASYNC);
  const isFilterOnly = comboboxEl.hasAttribute(ATTR_FILTER_ONLY);
  const sizeConfig = getNestedTagSizeConfig(comboboxEl);
  let asyncTimer = null;

  // Track selection order: row IDs in insertion order (not popup DOM order).
  // Pre-selected rows are populated in DOM order on init; subsequent toggles
  // append/remove from this list so the tag order reflects when items were selected.
  const selectedIds = [];

  // Filter-only demos keep static aria-selected / selected styling in markup and never sync tags.
  if (!isFilterOnly) {
    getRows(popupEl)
      .filter((row) => row.getAttribute('aria-selected') === 'true')
      .forEach((row) => {
        if (row.id) selectedIds.push(row.id);
        setRowSelected(row, true, { disabled: isDisabled });
      });
  }
  // ── Selection rendering ───────────────────────────────────────────────────

  const fieldLabel = inputEl.placeholder;

  // Visually-hidden helper paired with the input via aria-describedby so screen readers
  // get the same hint that sighted users see via the placeholder ("+ Add more…").
  // Placeholders are unreliable for assistive technology, so we mirror the intent here.
  const addMoreHelper = document.createElement('span');
  const addMoreHelperId = `${inputEl.id}-add-more-helper`;

  addMoreHelper.className = 'accessibility-hidden';
  addMoreHelper.id = addMoreHelperId;
  addMoreHelper.textContent = `Add more ${fieldLabel}`;
  addMoreHelper.hidden = true;
  inputEl.insertAdjacentElement('afterend', addMoreHelper);

  function allOptionsSelected() {
    const totalRows = getRows(popupEl).length;

    return totalRows > 0 && selectedIds.length >= totalRows;
  }

  function setAddMoreDescribed(active) {
    const current = (inputEl.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    const next = active
      ? Array.from(new Set([...current, addMoreHelperId]))
      : current.filter((id) => id !== addMoreHelperId);

    if (next.length) {
      inputEl.setAttribute('aria-describedby', next.join(' '));
    } else {
      inputEl.removeAttribute('aria-describedby');
    }
  }

  function renderSelection() {
    selectionEl.querySelectorAll(SELECTOR_TAG_ROW).forEach((row) => row.remove());

    const totalSelected = selectedIds.length;
    const allSelected = allOptionsSelected();
    const showAddMore = totalSelected > 0 && !allSelected;

    if (clearBtn) {
      // `d-none` is required because InputAddon sets `display: flex`, which overrides [hidden].
      clearBtn.hidden = totalSelected === 0;
      clearBtn.classList.toggle('d-none', totalSelected === 0);
    }

    if (totalSelected === 0) {
      selectionEl.setAttribute('role', 'group');
      inputEl.removeAttribute('aria-label');
    } else {
      selectionEl.setAttribute('role', 'grid');
      inputEl.setAttribute(
        'aria-label',
        `${fieldLabel}, ${totalSelected} item${totalSelected > 1 ? 's' : ''} selected`,
      );
    }

    if (totalSelected === 0) {
      inputEl.placeholder = fieldLabel;
    } else if (!allSelected) {
      inputEl.placeholder = '+ Add more…';
    } else {
      inputEl.placeholder = '';
    }

    addMoreHelper.hidden = !showAddMore;
    setAddMoreDescribed(showAddMore);

    selectedIds.forEach((id) => {
      const rowEl = document.getElementById(id);

      if (!rowEl) return;

      const label = getRowLabel(rowEl);
      const tag = createTag(
        label,
        selectionEl,
        () => {
          setRowSelected(rowEl, false, { disabled: isDisabled });
          const idx = selectedIds.indexOf(id);

          if (idx !== -1) selectedIds.splice(idx, 1);
          renderSelection();
        },
        { disabled: isDisabled, sizeConfig },
      );

      if (tag) selectionEl.appendChild(tag);
    });

    const tagRows = Array.from(selectionEl.querySelectorAll(SELECTOR_TAG_ROW));

    tagRows.forEach((row, i) => row.setAttribute('tabindex', i === tagRows.length - 1 ? '0' : '-1'));
  }

  // Disabled instances keep their initial aria-selected rows but stay non-interactive;
  // render the tags so the field reflects its selected state, then skip listeners.
  if (isDisabled) {
    if (!isFilterOnly) {
      renderSelection();
    }

    return;
  }

  // Wire up the Dropdown plugin for popup open/close so events and state flow through
  // the same channel as Picker and other Dropdown-based components.
  // ID is assigned dynamically so the HTML does not need to change.
  if (!popupEl.id) popupEl.id = `${inputEl.id}-popover`;
  inputEl.dataset.spiritTarget = `#${popupEl.id}`;

  // Dropdown.getOptions() reads autoClose from dataset.spiritAutoclose, not from the constructor
  // config. Set it on the element so that Dropdown's built-in outside-click handler is disabled —
  // the combobox manages its own click-outside close logic below.
  inputEl.dataset.spiritAutoclose = 'false';

  // Let Dropdown own the Escape key (close + return focus to the input). Arrow keys stay with the
  // combobox: Dropdown's keyboard handler ignores them on input triggers, and the combobox needs
  // its own roving focus + aria-activedescendant navigation.
  inputEl.dataset.spiritDropdownKeyboard = 'true';

  const dropdown = new Dropdown(inputEl);

  // Options stay focusable for restore-after-remove patterns, but arrow keys do not move DOM focus.
  getRows(popupEl).forEach((row) => row.setAttribute('tabindex', '-1'));

  let activeNestedControlIndex = null;

  // ── Row toggle ────────────────────────────────────────────────────────────

  function toggleRow(rowEl) {
    if (isFilterOnly || isRowDisabled(rowEl)) return;

    const isSelected = rowEl.getAttribute('aria-selected') === 'true';

    setRowSelected(rowEl, !isSelected, { disabled: isDisabled });

    if (isSelected) {
      const idx = selectedIds.indexOf(rowEl.id);

      if (idx !== -1) selectedIds.splice(idx, 1);
    } else if (rowEl.id) {
      selectedIds.push(rowEl.id);
    }

    renderSelection();
    inputEl.value = '';
    setLoading(comboboxEl, popupEl, false);
    filterRows(popupEl, '');
  }

  // ── Popover helpers ───────────────────────────────────────────────────────

  function open() {
    dropdown.show();
  }

  function clearVisualActiveControls() {
    popupEl.querySelectorAll('[data-spirit-combobox-active-control]').forEach((el) => {
      el.removeAttribute('data-spirit-combobox-active-control');
      el.classList.remove('is-active');
    });
    popupEl.querySelectorAll('.Item.is-active').forEach((el) => el.classList.remove('is-active'));
  }

  function syncVisualActiveState(rowEl) {
    clearVisualActiveControls();

    if (!rowEl) return;

    if (activeNestedControlIndex == null) {
      rowEl.classList.add('is-active');

      return;
    }

    const controlEl = getRowCellControls(rowEl)[activeNestedControlIndex];

    if (!controlEl) {
      rowEl.classList.add('is-active');
      activeNestedControlIndex = null;

      return;
    }

    controlEl.classList.add('is-active');
    controlEl.setAttribute('data-spirit-combobox-active-control', '');
  }

  // Visually activate a popup row and maintain aria-activedescendant (DOM focus stays on the input).
  function activateRow(rowEl) {
    if (!rowEl) return;
    activeNestedControlIndex = null;
    rowEl.scrollIntoView({ block: 'nearest' });
    inputEl.setAttribute('aria-activedescendant', rowEl.id);
    syncVisualActiveState(rowEl);
  }

  // Visually activate a nested cell control without moving DOM focus.
  function activateCellControl(controlEl, rowEl, controlIndex) {
    if (!controlEl || !rowEl) return;
    activeNestedControlIndex = controlIndex;
    controlEl.scrollIntoView({ block: 'nearest' });
    inputEl.setAttribute('aria-activedescendant', rowEl.id);
    syncVisualActiveState(rowEl);
  }

  // Activate the row the move lands on, skipping disabled rows.
  function activateRowByMove(visibleRows, currentIndex, move) {
    const nextIndex = getNextEnabledRowIndex(currentIndex, visibleRows, move);

    if (nextIndex === -1) return;

    activateRow(visibleRows[nextIndex]);
  }

  function getActiveRowState() {
    const visible = getVisibleRows(popupEl);
    const activeId = inputEl.getAttribute('aria-activedescendant');
    const currentRow = activeId ? visible.find((row) => row.id === activeId) || null : null;
    const currentIndex = currentRow ? visible.indexOf(currentRow) : -1;

    return { visible, currentRow, currentIndex };
  }

  // ── Row removal (grid pattern demo) ───────────────────────────────────────

  // Removing a row destroys the focused element, so move focus to its neighbour (or the input).
  // Disabled rows are not focus candidates — arrow navigation cannot leave them behind.
  function removeOptionRow(rowEl) {
    if (!rowEl) return;

    const visible = getVisibleRows(popupEl);
    const removedIndex = visible.indexOf(rowEl);
    const remaining = visible.filter((row) => row !== rowEl);
    const nextRow =
      findEnabledRow(remaining, removedIndex, 1) || findEnabledRow(remaining, removedIndex - 1, -1) || null;
    const selectedIndex = selectedIds.indexOf(rowEl.id);

    if (selectedIndex !== -1) selectedIds.splice(selectedIndex, 1);

    rowEl.remove();
    renderSelection();
    filterRows(popupEl, inputEl.value);

    if (nextRow) {
      activateRow(nextRow);
    } else {
      inputEl.removeAttribute('aria-activedescendant');
      clearVisualActiveControls();
      activeNestedControlIndex = null;
    }

    inputEl.focus();
  }

  // Combobox-specific teardown that the generic Dropdown.hide() does not perform. Hanging it off the
  // hide event means it runs no matter how the popover is closed — including Dropdown's own Escape.
  popupEl.addEventListener('hide.dropdown', () => {
    clearTimeout(asyncTimer);
    setLoading(comboboxEl, popupEl, false);
    inputEl.removeAttribute('aria-activedescendant');
    clearVisualActiveControls();
    activeNestedControlIndex = null;
  });

  function close() {
    // The hide.dropdown listener performs the combobox-specific teardown (async timer, loading
    // state, aria-activedescendant, visual active state) so it runs for every close path,
    // including Dropdown's Escape.
    dropdown.hide();
  }

  // ── Event listeners ───────────────────────────────────────────────────────

  // Container click focuses input and opens (click-through from selection area)
  const containerEl = inputEl.closest('[role="group"]') || inputEl.parentElement;

  containerEl.addEventListener('click', (event) => {
    if (!event.target.closest(`[data-spirit-combobox-clear], ${SELECTOR_TAG_ROW}`)) {
      inputEl.focus();
      open();
    }
  });

  document.addEventListener('click', (event) => {
    // Use composedPath instead of contains() so that clicks on elements removed from the DOM
    // during the event (e.g. a tag's close button that triggers renderSelection()) still
    // correctly register as "inside the combobox" and do not close the popup.
    if (!event.composedPath().includes(comboboxEl)) {
      close();
    }
  });

  // Open on pointer click, typing, or Arrow Up/Down — not on keyboard focus alone (Tab).
  inputEl.addEventListener('click', () => open());

  inputEl.addEventListener('input', () => {
    open();
    inputEl.removeAttribute('aria-activedescendant');
    clearVisualActiveControls();
    activeNestedControlIndex = null;

    if (isAsync && inputEl.value.trim()) {
      clearTimeout(asyncTimer);
      setLoading(comboboxEl, popupEl, true);
      asyncTimer = setTimeout(() => {
        setLoading(comboboxEl, popupEl, false);
        filterRows(popupEl, inputEl.value);
      }, ASYNC_DELAY_MS);
    } else {
      clearTimeout(asyncTimer);
      setLoading(comboboxEl, popupEl, false);
      filterRows(popupEl, inputEl.value);
    }
  });

  // ── Keyboard navigation (pure aria-activedescendant — focus stays on the input) ──

  inputEl.addEventListener('keydown', (event) => {
    const isOpen = popupEl.classList.contains('is-open');
    const hasActiveDescendant = Boolean(inputEl.getAttribute('aria-activedescendant'));

    // Escape is handled by the Dropdown plugin (close + return focus to the input).

    if (event.key === 'Tab') {
      close();

      return;
    }

    // Empty filter + selected tags: Backspace focuses the last tag (Gmail-style; remove on next Backspace).
    if (event.key === 'Backspace' && inputEl.value === '' && !isFilterOnly && selectedIds.length > 0) {
      event.preventDefault();
      close();

      const tagRows = Array.from(selectionEl.querySelectorAll(SELECTOR_TAG_ROW));
      const lastTag = tagRows[tagRows.length - 1];

      if (lastTag) {
        tagRows.forEach((row) => row.setAttribute('tabindex', '-1'));
        lastTag.setAttribute('tabindex', '0');
        lastTag.focus();
      }

      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();

      if (!isOpen) open();

      const { visible, currentIndex } = getActiveRowState();

      if (!hasActiveDescendant) {
        activateRowByMove(visible, -1, event.key === 'ArrowDown' ? 'first' : 'last');
      } else {
        activateRowByMove(visible, currentIndex, event.key === 'ArrowDown' ? 'next' : 'previous');
      }

      return;
    }

    if (!isOpen || !hasActiveDescendant) return;

    const { visible, currentRow, currentIndex } = getActiveRowState();

    if (!currentRow) return;

    if (event.key === 'Home') {
      event.preventDefault();
      activateRowByMove(visible, currentIndex, 'first');

      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      activateRowByMove(visible, currentIndex, 'last');

      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const controls = getRowCellControls(currentRow);

      if (!controls.length) return;

      event.preventDefault();

      if (event.key === 'ArrowRight') {
        const nextIndex = activeNestedControlIndex == null ? 0 : activeNestedControlIndex + 1;

        if (nextIndex < controls.length) {
          activateCellControl(controls[nextIndex], currentRow, nextIndex);
        }

        return;
      }

      if (activeNestedControlIndex == null) return;

      if (activeNestedControlIndex <= 0) {
        activateRow(currentRow);

        return;
      }

      activateCellControl(controls[activeNestedControlIndex - 1], currentRow, activeNestedControlIndex - 1);

      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      if (activeNestedControlIndex != null) {
        const controlEl = getRowCellControls(currentRow)[activeNestedControlIndex];

        controlEl?.click();

        return;
      }

      // Row-level Enter activates a nested link when present (e.g. Last Searches); otherwise toggles selection.
      if (!isRowDisabled(currentRow)) {
        const linkEl = currentRow.querySelector('a[href]');

        if (linkEl) {
          linkEl.click();

          return;
        }
      }

      toggleRow(currentRow);
    }
  });

  // ── Popup mouse events ────────────────────────────────────────────────────

  popupEl.addEventListener('click', (event) => {
    const removeBtn = event.target.closest(SELECTOR_OPTION_REMOVE);

    if (!removeBtn) return;

    event.preventDefault();
    event.stopPropagation();
    removeOptionRow(removeBtn.closest(SELECTOR_OPTION_ITEM));
  });

  popupEl.addEventListener('mousedown', (event) => {
    if (event.target.closest('a, button, [role="button"]')) {
      return;
    }

    const option = event.target.closest(SELECTOR_OPTION_ITEM);

    if (!option || !popupEl.contains(option)) return;

    event.preventDefault(); // Keep focus on input
    toggleRow(option);
  });

  // ── Clear all ────────────────────────────────────────────────────────────

  if (clearBtn) {
    clearBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      getRows(popupEl).forEach((row) => setRowSelected(row, false, { disabled: isDisabled }));
      selectedIds.length = 0;
      renderSelection();
      inputEl.focus();
    });
  }

  // ── Initial render ────────────────────────────────────────────────────────

  if (!isFilterOnly) {
    renderSelection();
  }
}

// ─── Entry point ──────────────────────────────────────────────────────────────

export function initComboboxes() {
  document.querySelectorAll(SELECTOR_COMBOBOX).forEach(initCombobox);
}
