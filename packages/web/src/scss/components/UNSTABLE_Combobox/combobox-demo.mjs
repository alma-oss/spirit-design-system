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
//   - Dismissible rows: click × button or Delete/Backspace on active row removes from list

// ─── Selectors ───────────────────────────────────────────────────────────────

const SELECTOR_COMBOBOX = '[data-spirit-element="combobox"]';
const SELECTOR_INPUT = '[data-spirit-combobox-input]';
const SELECTOR_POPUP = '[data-spirit-combobox-listbox]';
const SELECTOR_ROW = '[role="row"]:not([data-spirit-combobox-tag-row])'; // popup rows only (not tag rows)
const SELECTOR_GRIDCELL = '[role="gridcell"]';
const SELECTOR_GROUP = '[role="rowgroup"][data-spirit-combobox-group]';
const SELECTOR_SELECTION = '[data-spirit-combobox-selection]';
const SELECTOR_CLEAR = '[data-spirit-combobox-clear]';
const SELECTOR_TAG_ROW = '[data-spirit-combobox-tag-row]';
const SELECTOR_TAG_CLOSE = '[data-spirit-combobox-tag-close]';
const SELECTOR_TAG_LABEL = '[data-spirit-combobox-tag-label]';
const SELECTOR_TAG_DESCRIPTION = '[data-spirit-combobox-tag-description]';
const SELECTOR_OPTION_DISMISS = '[data-spirit-combobox-option-dismiss]';
const SELECTOR_EMPTY_STATE = '[data-spirit-combobox-empty-state]';
const SELECTOR_OPTION_LABEL = '.UNSTABLE_ComboboxOption__label';
const SELECTOR_OPTION_LIST = '.UNSTABLE_Combobox__optionList';
const SELECTOR_LOADING = '[data-spirit-combobox-loading]';
const SELECTOR_TIP = '[data-spirit-combobox-tip]';

const CLASS_OPTION_CELL = 'UNSTABLE_ComboboxOption__cell';
const CLASS_OPTION_DISMISSIBLE = 'UNSTABLE_ComboboxOption--dismissible';

const ATTR_ACTIVE = 'data-spirit-combobox-active';
const ATTR_ASYNC = 'data-spirit-combobox-async';
const ATTR_LINK_ROW = 'data-spirit-combobox-link-row';
const ATTR_SEARCH_ROW = 'data-spirit-combobox-search-row';
const ATTR_TIP_EMPTY = 'data-spirit-combobox-tip-empty';

const SELECTOR_SEARCH_QUERY = '[data-spirit-combobox-search-query]';

const SELECTOR_TOGGLE = '[data-spirit-toggle="combobox"]';

const ID_TAG_TEMPLATE = 'autocomplete-tag-template';

// Simulated async search delay (ms) — used only by instances with data-spirit-combobox-async
const ASYNC_DELAY_MS = 600;

// ─── Utilities ────────────────────────────────────────────────────────────────

/**
 * Returns all role="row" elements inside the popup grid (excludes tag rows).
 *
 * @param popupEl
 */
function getRows(popupEl) {
  return Array.from(popupEl.querySelectorAll(SELECTOR_ROW));
}

/**
 * Returns visible (not display:none, not inside a hidden rowgroup) rows.
 *
 * @param popupEl
 */
function getVisibleRows(popupEl) {
  return getRows(popupEl).filter((row) => {
    if (row.style.display === 'none') return false;
    const group = row.closest('[role="rowgroup"]');

    return !group || !group.hidden;
  });
}

function getActiveRow(popupEl) {
  return popupEl.querySelector(`[${ATTR_ACTIVE}="true"]`);
}

function clearActive(popupEl) {
  popupEl.querySelectorAll(`[${ATTR_ACTIVE}]`).forEach((el) => el.removeAttribute(ATTR_ACTIVE));
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

// ─── Row label helper ─────────────────────────────────────────────────────────

/**
 * Returns the text label of a popup row (first gridcell text content).
 *
 * @param rowEl
 */
function getRowLabel(rowEl) {
  const firstCell = rowEl.querySelector(SELECTOR_GRIDCELL);

  if (!firstCell) return rowEl.textContent.trim();

  // Icon option: label is only the first child of .UNSTABLE_ComboboxOption__label,
  // not the full cell text which also includes description and note lines.
  if (firstCell.classList.contains(CLASS_OPTION_CELL)) {
    const labelEl = firstCell.querySelector(SELECTOR_OPTION_LABEL);
    const target = labelEl?.firstElementChild;

    if (target) {
      // Use originalText when highlight has been applied to avoid reading both
      // the aria-hidden formatted span and the accessibility-hidden plain-text span.
      return target.dataset.originalText ?? target.textContent.trim();
    }

    return firstCell.textContent.trim();
  }

  // Same rationale: after highlighting, firstCell contains two spans.
  return firstCell.dataset.originalText ?? firstCell.textContent.trim();
}

/**
 * Returns the DOM element whose text content should be highlighted.
 *
 * Two structural variants are supported:
 * - Simple / dismissible: the first gridcell contains the label as a direct
 * text node — the gridcell element itself is the target.
 * - Icon option: the first gridcell uses display:flex (set via inline style)
 * and contains an <svg> followed by a wrapper <div>. The label sits in the
 * first child element of that wrapper.
 *
 * @param rowEl
 */
function getHighlightTarget(rowEl) {
  const firstCell = rowEl.querySelector(SELECTOR_GRIDCELL);

  if (!firstCell) return null;

  if (firstCell.classList.contains(CLASS_OPTION_CELL)) {
    // Icon variant: <svg> + <div class="UNSTABLE_ComboboxOption__label"><div>Label</div>…</div>
    const labelEl = firstCell.querySelector(SELECTOR_OPTION_LABEL);

    return labelEl ? labelEl.firstElementChild : null;
  }

  return firstCell;
}

/**
 * Highlights the portion of `targetEl`'s text that matches `query`.
 * The matching substring renders at regular weight; surrounding text is bold.
 * When `query` is empty the original plain text is restored.
 *
 * When a match exists, the formatted markup is wrapped in a <span aria-hidden="true">
 * so screen readers ignore it. A sibling <span class="accessibility-hidden"> carrying
 * the original plain text is added so screen readers announce the unformatted label.
 *
 * @param targetEl
 * @param query
 */
function highlightLabel(targetEl, query) {
  if (!targetEl) return;

  // Persist original text on first call so we can restore it later.
  if (!('originalText' in targetEl.dataset)) {
    targetEl.dataset.originalText = targetEl.textContent;
  }

  const original = targetEl.dataset.originalText;

  if (!query) {
    targetEl.textContent = original;

    return;
  }

  const matchIdx = original.toLowerCase().indexOf(query.toLowerCase());

  if (matchIdx === -1) {
    targetEl.textContent = original;

    return;
  }

  const before = original.slice(0, matchIdx);
  const match = original.slice(matchIdx, matchIdx + query.length);
  const after = original.slice(matchIdx + query.length);

  // Build the visually formatted span (hidden from AT).
  const formattedSpan = document.createElement('span');

  formattedSpan.setAttribute('aria-hidden', 'true');

  if (before) {
    const strong = document.createElement('strong');

    strong.textContent = before;
    formattedSpan.appendChild(strong);
  }

  formattedSpan.appendChild(document.createTextNode(match));

  if (after) {
    const strong = document.createElement('strong');

    strong.textContent = after;
    formattedSpan.appendChild(strong);
  }

  // Build the AT-only span with the original plain text.
  const hiddenSpan = document.createElement('span');

  hiddenSpan.className = 'accessibility-hidden';
  hiddenSpan.textContent = original;

  targetEl.innerHTML = '';
  targetEl.appendChild(formattedSpan);
  targetEl.appendChild(hiddenSpan);
}

// ─── Tag management ───────────────────────────────────────────────────────────

function createTag(label, selectionEl, onRemove) {
  const template = document.getElementById(ID_TAG_TEMPLATE);

  if (!template) {
    // eslint-disable-next-line no-console
    console.warn(`[UNSTABLE_Combobox] Tag template #${ID_TAG_TEMPLATE} not found — skipping tag render.`);

    return null;
  }

  const fragment = template.content.cloneNode(true);
  const row = fragment.querySelector(SELECTOR_TAG_ROW);
  const tagDescriptionId = selectionEl.closest(SELECTOR_COMBOBOX)?.querySelector(SELECTOR_TAG_DESCRIPTION)?.id;

  row.setAttribute('aria-label', label);
  row.setAttribute('tabindex', '-1');

  if (tagDescriptionId) {
    row.setAttribute('aria-describedby', tagDescriptionId);
  }

  fragment.querySelector(SELECTOR_TAG_LABEL).textContent = label;

  const closeBtn = fragment.querySelector(SELECTOR_TAG_CLOSE);

  closeBtn.setAttribute('aria-label', `Remove ${label}`);
  closeBtn.setAttribute('tabindex', '-1');

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
  const rawQuery = query.trim();

  getRows(popupEl).forEach((row) => {
    if (row.hasAttribute(ATTR_SEARCH_ROW)) return; // visibility managed by syncSearchRow

    const label = getRowLabel(row);
    const matches = !normalised || label.toLowerCase().includes(normalised);

    row.style.display = matches ? '' : 'none';
    highlightLabel(getHighlightTarget(row), rawQuery);
  });

  // Hide rowgroups when all their rows are hidden
  popupEl.querySelectorAll(SELECTOR_GROUP).forEach((group) => {
    const anyVisible = Array.from(group.querySelectorAll(SELECTOR_ROW)).some((row) => row.style.display !== 'none');

    group.hidden = !anyVisible;
  });

  // Show/hide empty state message
  const emptyState = popupEl.querySelector(SELECTOR_EMPTY_STATE);
  const anyVisible = getVisibleRows(popupEl).length > 0;

  if (emptyState) {
    emptyState.hidden = anyVisible;
  }
}

// ─── Tip box ─────────────────────────────────────────────────────────────────

/**
 * Shows the tip box based on its mode:
 * - Default tip (no ATTR_TIP_EMPTY): visible when popup is open and input is empty.
 *   Hides the option list while the tip is shown.
 * - Empty tip (ATTR_TIP_EMPTY present): visible only when all rows have been dismissed.
 *   Option list is hidden only after all rows are gone.
 *
 * @param comboboxEl
 * @param inputEl
 * @param popupEl
 */
/**
 * Shows or hides the search-keyword row and keeps its label in sync with the current query.
 * The row lets users "search for" whatever they typed instead of picking a suggestion.
 *
 * @param comboboxEl
 * @param inputEl
 */
function syncSearchRow(comboboxEl, inputEl) {
  const row = comboboxEl.querySelector(`[${ATTR_SEARCH_ROW}]`);

  if (!row) return;

  const query = inputEl.value.trim();

  row.style.display = query ? '' : 'none';

  if (query) {
    const queryEl = row.querySelector(SELECTOR_SEARCH_QUERY);

    if (queryEl) queryEl.textContent = query;

    row.setAttribute('aria-label', `${query} – search for keyword`);
  }
}

function syncTip(comboboxEl, inputEl, popupEl) {
  const tipEl = comboboxEl.querySelector(SELECTOR_TIP);

  if (!tipEl) return;

  const isOpen = popupEl.classList.contains('is-open');
  const hasValue = inputEl.value.length > 0;
  const noRows = getRows(popupEl).length === 0;
  const isEmptyTip = tipEl.hasAttribute(ATTR_TIP_EMPTY);
  const showTip = isOpen && (isEmptyTip ? noRows : !hasValue);

  tipEl.hidden = !showTip;
  // Use inline style to guarantee hiding even when utility CSS classes (e.g. Flex)
  // set display:flex and would otherwise override the [hidden] attribute.
  tipEl.style.display = showTip ? '' : 'none';

  // Hide option list / empty state when tip is visible
  popupEl.querySelectorAll(`${SELECTOR_OPTION_LIST}, ${SELECTOR_EMPTY_STATE}`).forEach((el) => {
    el.style.display = showTip ? 'none' : '';
  });
}

// ─── Loading state ────────────────────────────────────────────────────────────

function setLoading(comboboxEl, popupEl, isLoading) {
  const loadingEl = comboboxEl.querySelector(SELECTOR_LOADING);

  if (!loadingEl) return;

  loadingEl.hidden = !isLoading;

  // Hide rows and empty state while loading; restore visibility after
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
  const toggleBtn = comboboxEl.querySelector(SELECTOR_TOGGLE);

  if (!inputEl || !popupEl || !selectionEl) return;
  if (inputEl.disabled) return;

  const isAsync = comboboxEl.hasAttribute(ATTR_ASYNC);
  let asyncTimer = null;

  // Track selection order: row IDs in insertion order (not popup DOM order).
  // Pre-selected rows are populated in DOM order on init; subsequent toggles
  // append/remove from this list so the tag order reflects when items were selected.
  const selectedIds = [];

  // Free-text search terms selected via the search-keyword row (not tied to any popup row).
  const selectedSearchTerms = [];

  getRows(popupEl)
    .filter((row) => row.getAttribute('aria-selected') === 'true')
    .forEach((row) => {
      if (row.id) selectedIds.push(row.id);
    });

  // ── Selection rendering ───────────────────────────────────────────────────

  const fieldLabel = inputEl.placeholder;

  // Visible "add more" affordance — inserted directly before the input in the flex layout.
  const addMoreEl = document.createElement('span');

  addMoreEl.className = 'UNSTABLE_Combobox__addMore';
  addMoreEl.setAttribute('aria-hidden', 'true');
  addMoreEl.textContent = '+ Add more\u2026';
  addMoreEl.hidden = true;
  inputEl.insertAdjacentElement('beforebegin', addMoreEl);

  function syncAddMore() {
    addMoreEl.hidden =
      selectedIds.length + selectedSearchTerms.length === 0 ||
      document.activeElement === inputEl ||
      inputEl.value !== '';
  }

  function renderSelection() {
    selectionEl.querySelectorAll(SELECTOR_TAG_ROW).forEach((row) => row.remove());

    const totalSelected = selectedIds.length + selectedSearchTerms.length;

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

    // Show the "add more" span and hide the native placeholder when items are selected
    // (placeholder is reserved for the field label, not for instructions).
    syncAddMore();
    inputEl.placeholder = totalSelected === 0 ? fieldLabel : '';

    // Render search-term tags (free-text selections from the search-keyword row).
    selectedSearchTerms.forEach((term) => {
      const tag = createTag(term, selectionEl, () => {
        const i = selectedSearchTerms.indexOf(term);

        if (i !== -1) selectedSearchTerms.splice(i, 1);
        renderSelection();
      });

      if (tag) selectionEl.insertBefore(tag, addMoreEl);
    });

    // Render option tags (selections from popup rows).
    selectedIds.forEach((id) => {
      const rowEl = document.getElementById(id);

      if (!rowEl) return;

      const label = getRowLabel(rowEl);
      const tag = createTag(label, selectionEl, () => {
        rowEl.setAttribute('aria-selected', 'false');
        const idx = selectedIds.indexOf(id);

        if (idx !== -1) selectedIds.splice(idx, 1);
        renderSelection();
      });

      // Insert each tag before addMoreEl so the span always stays immediately
      // before the input: [tags…][addMoreEl][inputEl].
      if (tag) selectionEl.insertBefore(tag, addMoreEl);
    });

    const tagRows = Array.from(selectionEl.querySelectorAll(SELECTOR_TAG_ROW));

    tagRows.forEach((row, i) => row.setAttribute('tabindex', i === tagRows.length - 1 ? '0' : '-1'));
  }

  // ── Search-term selection ─────────────────────────────────────────────────

  function selectSearchTerm() {
    const term = inputEl.value.trim();

    if (!term || selectedSearchTerms.includes(term)) return;

    selectedSearchTerms.push(term);
    renderSelection();
    inputEl.value = '';
    syncSearchRow(comboboxEl, inputEl);
    setLoading(comboboxEl, popupEl, false);
    filterRows(popupEl, '');
  }

  // ── Row toggle ────────────────────────────────────────────────────────────

  function toggleRow(rowEl) {
    if (rowEl.getAttribute('aria-disabled') === 'true') return;

    const isSelected = rowEl.getAttribute('aria-selected') === 'true';

    rowEl.setAttribute('aria-selected', isSelected ? 'false' : 'true');

    if (isSelected) {
      const idx = selectedIds.indexOf(rowEl.id);

      if (idx !== -1) selectedIds.splice(idx, 1);
    } else if (rowEl.id) {
      selectedIds.push(rowEl.id);
    }

    renderSelection();
    inputEl.value = '';
    syncSearchRow(comboboxEl, inputEl);
    setLoading(comboboxEl, popupEl, false);
    filterRows(popupEl, '');
  }

  // ── Popover helpers ───────────────────────────────────────────────────────

  function open() {
    openPopup(inputEl, popupEl);
    syncTip(comboboxEl, inputEl, popupEl);
    syncSearchRow(comboboxEl, inputEl);
    toggleBtn?.setAttribute('aria-expanded', 'true');
  }

  function close() {
    clearTimeout(asyncTimer);
    setLoading(comboboxEl, popupEl, false);
    closePopup(inputEl, popupEl);
    syncTip(comboboxEl, inputEl, popupEl);
    toggleBtn?.setAttribute('aria-expanded', 'false');
  }

  // ── Event listeners ───────────────────────────────────────────────────────

  // Container click focuses input (click-through from selectionEmpty / selectionAddMore)
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

  inputEl.addEventListener('focus', () => {
    addMoreEl.hidden = true;
    open();
  });
  inputEl.addEventListener('blur', () => syncAddMore());
  inputEl.addEventListener('click', () => open());

  inputEl.addEventListener('input', () => {
    syncAddMore();
    open();
    syncTip(comboboxEl, inputEl, popupEl);
    syncSearchRow(comboboxEl, inputEl);
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

    if (event.key === 'ArrowRight') {
      // Move focus from label cell into dismiss button of active row (if dismissible)
      const active = getActiveRow(popupEl);

      if (active?.classList.contains(CLASS_OPTION_DISMISSIBLE)) {
        event.preventDefault();
        const dismissBtn = active.querySelector(SELECTOR_OPTION_DISMISS);

        if (dismissBtn) dismissBtn.focus();
      }

      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      const active = getActiveRow(popupEl);

      if (active) {
        event.preventDefault();

        if (active.hasAttribute(ATTR_SEARCH_ROW)) {
          selectSearchTerm();
        } else if (active.hasAttribute(ATTR_LINK_ROW)) {
          // Follow the link inside the row instead of toggling selection.
          active.querySelector('a')?.click();
        } else {
          toggleRow(active);
        }
      }
    }

    // Delete / Backspace: dismiss active dismissible row (when input is empty)
    if ((event.key === 'Delete' || event.key === 'Backspace') && inputEl.value === '') {
      const active = getActiveRow(popupEl);

      if (active?.classList.contains(CLASS_OPTION_DISMISSIBLE)) {
        event.preventDefault();
        const idx = selectedIds.indexOf(active.id);

        if (idx !== -1) selectedIds.splice(idx, 1);
        active.remove();
        renderSelection();
        syncTip(comboboxEl, inputEl, popupEl);
        clearActive(popupEl);
        inputEl.removeAttribute('aria-activedescendant');
      }
    }
  });

  // ── Popup mouse events ────────────────────────────────────────────────────

  popupEl.addEventListener('mousedown', (event) => {
    // Dismiss button: remove row from list entirely
    const dismissBtn = event.target.closest(SELECTOR_OPTION_DISMISS);

    if (dismissBtn) {
      event.preventDefault();
      event.stopPropagation();
      const row = dismissBtn.closest('[role="row"]');

      if (row) {
        const idx = selectedIds.indexOf(row.id);

        if (idx !== -1) selectedIds.splice(idx, 1);
        row.remove();
        renderSelection();
        syncTip(comboboxEl, inputEl, popupEl);
      }

      return;
    }

    const row = event.target.closest('[role="row"]');

    if (!row || !popupEl.contains(row)) return;

    // Link rows navigate on click — do not prevent default or toggle selection.
    if (row.hasAttribute(ATTR_LINK_ROW)) return;

    event.preventDefault(); // Keep focus on input

    if (row.hasAttribute(ATTR_SEARCH_ROW)) {
      selectSearchTerm();
    } else {
      toggleRow(row);
    }
  });

  popupEl.addEventListener('mousemove', (event) => {
    const row = event.target.closest('[role="row"]');

    if (row && popupEl.contains(row)) setActive(inputEl, row);
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

      getRows(popupEl).forEach((row) => row.setAttribute('aria-selected', 'false'));
      selectedIds.length = 0;
      selectedSearchTerms.length = 0;
      renderSelection();
      inputEl.focus();
    });
  }

  // ── Chevron toggle ────────────────────────────────────────────────────────

  if (toggleBtn) {
    toggleBtn.addEventListener('mousedown', (event) => {
      event.preventDefault(); // keep focus on input; prevent blur → close race
      if (popupEl.classList.contains('is-open')) {
        close();
      } else {
        inputEl.focus();
        open();
      }
    });
  }

  // ── Initial render ────────────────────────────────────────────────────────

  renderSelection();
}

// ─── Entry point ──────────────────────────────────────────────────────────────

export function initComboboxes() {
  document.querySelectorAll(SELECTOR_COMBOBOX).forEach(initCombobox);
}
