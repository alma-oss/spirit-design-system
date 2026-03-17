// ⚠️ AI-GENERATED CODE, DO NOT COPY-PASTE.

import {
  ID_SELECTION_LABEL_TEMPLATE,
  ID_TAG_TEMPLATE,
  SELECTOR_TAG_ROW,
  SELECTOR_TAG_LABEL,
  SELECTOR_TAG_CLOSE,
  initPopoverBehavior,
} from './picker-demo';

export function initSalaryPicker() {
  const salarySelection = document.getElementById('picker-salary-selection');
  const salaryTriggerEl = document.querySelector('[data-spirit-target="#picker-salary"]');
  const salaryPopoverEl = document.getElementById('picker-salary');
  const salaryNoLimit = document.getElementById('salary-no-limit');
  const salaryFrom = document.getElementById('salary-from');
  const salaryTextField = document.getElementById('salary-textfield');
  const salarySlider = document.getElementById('salary-slider');
  const salaryTagTemplate = document.getElementById(ID_TAG_TEMPLATE);

  const DEFAULT_SALARY = 3000;

  function formatNumber(value) {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
  }

  function updateSliderPosition() {
    const max = Number(salarySlider.max);
    const value = Number(salarySlider.value);
    const position = max > 0 ? Math.round((value / max) * 100) : 0;

    salarySlider.style.setProperty('--slider-position', `${position}%`);
  }

  function resetToNoLimit() {
    salaryNoLimit.checked = true;
    salaryTextField.value = DEFAULT_SALARY;
    salarySlider.value = DEFAULT_SALARY;
    updateSliderPosition();
    renderSalarySelection();
  }

  function renderSalarySelection() {
    salarySelection.textContent = '';

    if (salaryNoLimit.checked) {
      salarySelection.setAttribute('role', 'group');

      const label = document.getElementById(ID_SELECTION_LABEL_TEMPLATE).content.cloneNode(true);

      label.querySelector('[data-spirit-element="selection-label"]').textContent = 'Salary';
      salarySelection.appendChild(label);

      return;
    }

    salarySelection.setAttribute('role', 'grid');

    const value = Number(salaryTextField.value) || 0;
    const label = value > 0 ? `From ${formatNumber(value)}` : 'From 0';

    const tag = salaryTagTemplate.content.cloneNode(true);
    const row = tag.querySelector(SELECTOR_TAG_ROW);

    row.setAttribute('aria-label', label);
    row.setAttribute('tabindex', '0');
    tag.querySelector(SELECTOR_TAG_LABEL).textContent = label;
    tag.querySelector(SELECTOR_TAG_LABEL).style.fontVariantNumeric = 'tabular-nums';
    tag.querySelector(SELECTOR_TAG_CLOSE).setAttribute('aria-label', `Remove ${label}`);
    tag.querySelector(SELECTOR_TAG_CLOSE).addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      resetToNoLimit();
    });
    row.addEventListener('keydown', function (event) {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        resetToNoLimit();

        return;
      }

      const rows = Array.from(salarySelection.querySelectorAll(SELECTOR_TAG_ROW));
      const index = rows.indexOf(this);

      let target = null;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        target = rows[index + 1] || null;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        target = rows[index - 1] || null;
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

    salarySelection.appendChild(tag);
  }

  salaryNoLimit.addEventListener('change', function () {
    if (this.checked) {
      renderSalarySelection();
    }
  });

  salaryFrom.addEventListener('change', function () {
    if (this.checked) {
      renderSalarySelection();
    }
  });

  salaryTextField.addEventListener('input', function () {
    salaryFrom.checked = true;

    const raw = Number(this.value);

    if (!Number.isNaN(raw) && this.value !== '') {
      const min = Number(salarySlider.min);
      const max = Number(salarySlider.max);

      this.value = Math.min(Math.max(raw, min), max);
    }

    salarySlider.value = this.value || 0;
    updateSliderPosition();
    renderSalarySelection();
  });

  salarySlider.addEventListener('input', function () {
    salaryFrom.checked = true;
    salaryTextField.value = this.value;
    updateSliderPosition();
    renderSalarySelection();
  });

  document.getElementById('salary-apply').addEventListener('click', function () {
    salaryTriggerEl.click();
  });

  initPopoverBehavior(salaryTriggerEl, salaryPopoverEl);

  renderSalarySelection();
}
