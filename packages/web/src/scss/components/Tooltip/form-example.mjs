const trigger = document.getElementById('button-in-form');
const form = document.getElementById('tooltip-in-form-form');
const triggerCountElement = document.getElementById('tooltip-in-form-trigger-count');
const submitCountElement = document.getElementById('tooltip-in-form-submit-count');

let triggerCount = 0;
let submitCount = 0;

trigger.addEventListener('click', () => {
  triggerCount += 1;
  triggerCountElement.textContent = triggerCount;
});

// Keep the demo on the page so the counters stay visible.
form.addEventListener('submit', (event) => {
  event.preventDefault();

  submitCount += 1;
  submitCountElement.textContent = submitCount;
});
