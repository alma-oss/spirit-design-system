// ⚠️ AI-GENERATED CODE, DO NOT COPY-PASTE.

// UNSTABLE_Combobox — demo interaction script
//
// Responsibilities:
//   - Filter grid rows as the user types
//   - Toggle aria-selected on rows (click or Enter/Space)
//   - Render/remove Tag rows in the selection grid
//   - Manage aria-activedescendant for keyboard navigation (points to role="row" in the popup grid)
//   - Clear-all button: deselect all rows, remove all tags
//   - Popover open/close: Escape, click-outside, Tab-out
//   - Hide the "+ Add more…" affordance when every option is already selected

// ─── Selectors ───────────────────────────────────────────────────────────────

const SELECTOR_COMBOBOX = '[data-spirit-element="combobox"]';
const SELECTOR_INPUT = '[data-spirit-combobox-input]';
const SELECTOR_POPUP = '[data-spirit-combobox-listbox]';
const SELECTOR_ROW = '[role="row"]:not([data-spirit-combobox-tag-row])';
const SELECTOR_GRIDCELL = '[role="gridcell"]';
const SELECTOR_SELECTION = '[data-spirit-combobox-selection]';
const SELECTOR_CLEAR = '[data-spirit-combobox-clear]';
const SELECTOR_TAG_ROW = '[data-spirit-combobox-tag-row]';
const SELECTOR_TAG_CLOSE = '[data-spirit-combobox-tag-close]';
const SELECTOR_TAG_LABEL = '[data-spirit-combobox-tag-label]';
const SELECTOR_TAG_DESCRIPTION = '[data-spirit-combobox-tag-description]';
const SELECTOR_EMPTY_STATE = '[data-spirit-combobox-empty-state]';
const SELECTOR_LOADING = '[data-spirit-combobox-loading]';

const ATTR_ACTIVE = 'data-spirit-combobox-active';
const ATTR_ASYNC = 'data-spirit-combobox-async';

const ID_TAG_TEMPLATE = 'combobox-tag-template';

// Simulated async search delay (ms) — used only by instances with data-spirit-combobox-async
const ASYNC_DELAY_MS = 600;

// ─── Utilities ────────────────────────────────────────────────────────────────

function getRows(popupEl) {
  return Array.from(popupEl.querySelectorAll(SELECTOR_ROW));
}

function getVisibleRows(popupEl) {
  return getRows(popupEl).filter((row) => row.style.display !== 'none');
}

function getActiveRow(popupEl) {
  return popupEl.querySelector(`[${ATTR_ACTIVE}="true"]`);
}

function clearActive(popupEl) {
  popupEl.querySelectorAll(`[${ATTR_ACTIVE}]`).forEach((el) => el.removeAttribute(ATTR_ACTIVE));
}

function setRowSelected(rowEl, selected) {
  rowEl.setAttribute('aria-selected', selected ? 'true' : 'false');
  rowEl.classList.toggle('Item--selected', selected);
}

function setActive(inputEl, rowEl) {
  const popupEl = document.getElementById(inputEl.getAttribute('aria-controls'));

  clearActive(popupEl);

  if (!rowEl) {
    inputEl.removeAttribute('aria-activedescendant');

    return;
  }

  rowEl.setAttribute(ATTR_ACTIVE, 'true');
  rowEl.scrollIntoView({ block: 'nearest' });
  inputEl.setAttribute('aria-activedescendant', rowEl.id);
}

function getRowLabel(rowEl) {
  const firstCell = rowEl.querySelector(SELECTOR_GRIDCELL);

  return firstCell ? firstCell.textContent.trim() : rowEl.textContent.trim();
}

// ─── Tag management ───────────────────────────────────────────────────────────

function createTag(label, selectionEl, onRemove, { disabled = false } = {}) {
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

  if (disabled) {
    // Disabled tag: drop the selected color scheme in favor of the disabled visual state and
    // disable the close button so it cannot be activated while the combobox is non-interactive.
    row.classList.remove('color-scheme-on-selected-basic');
    row.classList.add('Tag--disabled');
    closeBtn.disabled = true;

    return fragment;
  }

  row.addEventListener('focus', () => closeBtn.setAttribute('tabindex', '0'));
  row.addEventListener('blur', () => closeBtn.setAttribute('tabindex', '-1'));

  row.addEventListener('keydown', (event) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      removeFocusedTag(row, selectionEl, onRemove);

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
    removeFocusedTag(row, selectionEl, onRemove);
  });

  return fragment;
}

function removeFocusedTag(row, selectionEl, onRemove) {
  const rows = Array.from(selectionEl.querySelectorAll(SELECTOR_TAG_ROW));
  const index = rows.indexOf(row);

  onRemove();

  requestAnimationFrame(() => {
    const remaining = Array.from(selectionEl.querySelectorAll(SELECTOR_TAG_ROW));
    const next = remaining[index] || remaining[index - 1];

    if (next) {
      remaining.forEach((r) => r.setAttribute('tabindex', '-1'));
      next.setAttribute('tabindex', '0');
      next.focus();
    } else {
      const inputEl = selectionEl.closest(SELECTOR_COMBOBOX)?.querySelector(SELECTOR_INPUT);

      inputEl?.focus();
    }
  });
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

  popupEl.querySelectorAll(`${SELECTOR_ROW}, ${SELECTOR_EMPTY_STATE}`).forEach((el) => {
    el.style.display = isLoading ? 'none' : '';
  });
}

// ─── Popup open/close ─────────────────────────────────────────────────────────

function openPopup(inputEl, popupEl) {
  popupEl.classList.add('is-open');
  inputEl.setAttribute('aria-expanded', 'true');
}

function closePopup(inputEl, popupEl) {
  popupEl.classList.remove('is-open');
  inputEl.setAttribute('aria-expanded', 'false');
  clearActive(popupEl);
  inputEl.removeAttribute('aria-activedescendant');
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
  let asyncTimer = null;

  // Track selection order: row IDs in insertion order (not popup DOM order).
  // Pre-selected rows are populated in DOM order on init; subsequent toggles
  // append/remove from this list so the tag order reflects when items were selected.
  const selectedIds = [];

  getRows(popupEl)
    .filter((row) => row.getAttribute('aria-selected') === 'true')
    .forEach((row) => {
      if (row.id) selectedIds.push(row.id);
      row.classList.add('Item--selected');
    });

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
      clearBtn.hidden = totalSelected === 0;
    }

    if (totalSelected === 0) {
      inputEl.removeAttribute('aria-label');
    } else {
      inputEl.setAttribute(
        'aria-label',
        `${fieldLabel}, ${totalSelected} item${totalSelected > 1 ? 's' : ''} selected`,
      );
    }

    inputEl.placeholder = totalSelected === 0 ? fieldLabel : '+ Add more…';

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
          setRowSelected(rowEl, false);
          const idx = selectedIds.indexOf(id);

          if (idx !== -1) selectedIds.splice(idx, 1);
          renderSelection();
        },
        { disabled: isDisabled },
      );

      if (tag) selectionEl.appendChild(tag);
    });

    const tagRows = Array.from(selectionEl.querySelectorAll(SELECTOR_TAG_ROW));

    tagRows.forEach((row, i) => row.setAttribute('tabindex', i === tagRows.length - 1 ? '0' : '-1'));
  }

  // Disabled instances keep their initial aria-selected rows but stay non-interactive;
  // render the tags so the field reflects its selected state, then skip listeners.
  if (isDisabled) {
    renderSelection();

    return;
  }

  // ── Row toggle ────────────────────────────────────────────────────────────

  function toggleRow(rowEl) {
    if (rowEl.getAttribute('aria-disabled') === 'true') return;

    const isSelected = rowEl.getAttribute('aria-selected') === 'true';

    setRowSelected(rowEl, !isSelected);

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
    openPopup(inputEl, popupEl);
  }

  function close() {
    clearTimeout(asyncTimer);
    setLoading(comboboxEl, popupEl, false);
    closePopup(inputEl, popupEl);
  }

  // ── Event listeners ───────────────────────────────────────────────────────

  // Container click focuses input (click-through from selection area)
  const containerEl = inputEl.closest('[role="group"]') || inputEl.parentElement;

  containerEl.addEventListener('click', (event) => {
    if (!event.target.closest(`[data-spirit-combobox-clear], ${SELECTOR_TAG_ROW}`)) {
      inputEl.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!comboboxEl.contains(event.target)) {
      close();
    }
  });

  inputEl.addEventListener('focus', () => open());
  inputEl.addEventListener('click', () => open());

  inputEl.addEventListener('input', () => {
    open();
    clearActive(popupEl);
    inputEl.removeAttribute('aria-activedescendant');

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

  // ── Keyboard navigation ───────────────────────────────────────────────────

  inputEl.addEventListener('keydown', (event) => {
    const isOpen = popupEl.classList.contains('is-open');

    if (event.key === 'Escape') {
      event.preventDefault();
      close();

      return;
    }

    if (event.key === 'Tab') {
      close();

      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();

      if (!isOpen) open();

      const visible = getVisibleRows(popupEl);

      if (!visible.length) return;

      const current = getActiveRow(popupEl);
      const currentIndex = visible.indexOf(current);
      let nextIndex;

      if (event.key === 'ArrowDown') {
        nextIndex = current ? (currentIndex + 1) % visible.length : 0;
      } else {
        nextIndex = current ? (currentIndex - 1 + visible.length) % visible.length : visible.length - 1;
      }

      setActive(inputEl, visible[nextIndex]);

      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const visible = getVisibleRows(popupEl);

      setActive(inputEl, visible[0] || null);

      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      const visible = getVisibleRows(popupEl);

      setActive(inputEl, visible[visible.length - 1] || null);

      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      const active = getActiveRow(popupEl);

      if (active) {
        event.preventDefault();
        toggleRow(active);
      }
    }
  });

  // ── Popup mouse events ────────────────────────────────────────────────────

  popupEl.addEventListener('mousedown', (event) => {
    const row = event.target.closest('[role="row"]');

    if (!row || !popupEl.contains(row)) return;

    event.preventDefault(); // Keep focus on input
    toggleRow(row);
  });

  popupEl.addEventListener('mousemove', (event) => {
    const row = event.target.closest('[role="row"]');

    if (row && popupEl.contains(row)) {
      setActive(inputEl, row);
    }
  });

  popupEl.addEventListener('mouseleave', () => {
    clearActive(popupEl);
    inputEl.removeAttribute('aria-activedescendant');
  });

  // ── Clear all ────────────────────────────────────────────────────────────

  if (clearBtn) {
    clearBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      getRows(popupEl).forEach((row) => setRowSelected(row, false));
      selectedIds.length = 0;
      renderSelection();
      inputEl.focus();
    });
  }

  // ── Initial render ────────────────────────────────────────────────────────

  renderSelection();
}

// ─── Entry point ──────────────────────────────────────────────────────────────

export function initComboboxes() {
  document.querySelectorAll(SELECTOR_COMBOBOX).forEach(initCombobox);
}
