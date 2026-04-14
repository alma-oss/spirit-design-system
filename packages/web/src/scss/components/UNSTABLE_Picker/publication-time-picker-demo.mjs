// ⚠️ AI-GENERATED CODE, DO NOT COPY-PASTE.

import {
  ID_SELECTION_LABEL_TEMPLATE,
  ID_TAG_TEMPLATE,
  SELECTOR_TAG_ROW,
  SELECTOR_TAG_LABEL,
  SELECTOR_TAG_CLOSE,
  initPopoverBehavior,
} from './picker-demo';

const PICKER_ID = 'demo-picker-publication-time';
const ANY_RADIO_ID = `${PICKER_ID}-any`;
const LABEL = 'Publication time';

function getCheckedRadio(popoverEl) {
  return popoverEl.querySelector('input[type="radio"]:checked');
}

function renderPublicationTimeSelection(selectionEl, popoverEl) {
  const anyRadio = popoverEl.querySelector(`#${ANY_RADIO_ID}`);
  const isDefault = !anyRadio || anyRadio.checked;

  selectionEl.textContent = '';

  if (isDefault) {
    selectionEl.setAttribute('role', 'group');

    const labelEl = document.getElementById(ID_SELECTION_LABEL_TEMPLATE).content.cloneNode(true);

    labelEl.querySelector('[data-spirit-element="selection-label"]').textContent = LABEL;
    selectionEl.appendChild(labelEl);

    return;
  }

  const radio = getCheckedRadio(popoverEl);
  selectionEl.setAttribute('role', 'grid');

  const radioLabel = radio.closest('.Radio')?.querySelector('.Radio__label')?.textContent?.trim() ?? radio.value;
  const tag = document.getElementById(ID_TAG_TEMPLATE).content.cloneNode(true);
  const row = tag.querySelector(SELECTOR_TAG_ROW);

  row.setAttribute('aria-label', radioLabel);
  row.setAttribute('tabindex', '0');
  tag.querySelector(SELECTOR_TAG_LABEL).textContent = radioLabel;
  tag.querySelector(SELECTOR_TAG_CLOSE).setAttribute('aria-label', `Remove ${radioLabel}`);

  const resetToDefault = () => {
    if (anyRadio) anyRadio.checked = true;
    renderPublicationTimeSelection(selectionEl, popoverEl);
  };

  tag.querySelector(SELECTOR_TAG_CLOSE).addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetToDefault();
  });

  row.addEventListener('keydown', (event) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      resetToDefault();
    }
  });

  selectionEl.appendChild(tag);
}

export function initPublicationTimePicker() {
  const selectionEl = document.getElementById(`${PICKER_ID}-selection`);
  const triggerEl = document.getElementById(`${PICKER_ID}-trigger`);
  const popoverEl = document.getElementById(PICKER_ID);

  if (!selectionEl || !triggerEl || !popoverEl) return;

  popoverEl.addEventListener('change', () => renderPublicationTimeSelection(selectionEl, popoverEl));

  initPopoverBehavior(triggerEl, popoverEl);

  renderPublicationTimeSelection(selectionEl, popoverEl);
}
