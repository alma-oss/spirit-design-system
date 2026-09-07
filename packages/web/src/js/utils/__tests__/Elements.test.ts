import { clearFixture, getFixture } from '../../../../tests/helpers/fixture';
import { isDisabled } from '../Elements';

describe('isDisabled', () => {
  let fixtureEl: Element;

  beforeAll(() => {
    fixtureEl = getFixture();
  });

  afterEach(() => {
    clearFixture();
  });

  it('should return true for a nullish element', () => {
    expect(isDisabled(null)).toBe(true);
    expect(isDisabled(undefined)).toBe(true);
  });

  it('should return true for a non-element node', () => {
    fixtureEl.innerHTML = 'text node';

    expect(isDisabled(fixtureEl.firstChild as unknown as Element)).toBe(true);
  });

  it('should return true for an element with the "disabled" class', () => {
    fixtureEl.innerHTML = '<a class="disabled"></a>';

    expect(isDisabled(fixtureEl.querySelector('a'))).toBe(true);
  });

  it('should return true for a form control with the disabled property set', () => {
    fixtureEl.innerHTML = '<button disabled></button>';

    expect(isDisabled(fixtureEl.querySelector('button'))).toBe(true);
  });

  it('should return false for a form control without the disabled property set', () => {
    fixtureEl.innerHTML = '<button></button>';

    expect(isDisabled(fixtureEl.querySelector('button'))).toBe(false);
  });

  it('should return true for a non-form-control element with the disabled attribute', () => {
    fixtureEl.innerHTML = '<a disabled></a>';

    expect(isDisabled(fixtureEl.querySelector('a'))).toBe(true);
  });

  it('should return false for a non-form-control element with disabled="false"', () => {
    fixtureEl.innerHTML = '<a disabled="false"></a>';

    expect(isDisabled(fixtureEl.querySelector('a'))).toBe(false);
  });

  it('should return true for an element with aria-disabled="true"', () => {
    fixtureEl.innerHTML = '<a aria-disabled="true"></a>';

    expect(isDisabled(fixtureEl.querySelector('a'))).toBe(true);
  });

  it('should return false for a plain, enabled element', () => {
    fixtureEl.innerHTML = '<a></a>';

    expect(isDisabled(fixtureEl.querySelector('a'))).toBe(false);
  });
});
