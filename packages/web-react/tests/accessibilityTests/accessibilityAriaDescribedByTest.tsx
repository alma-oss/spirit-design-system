import { render } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import { guardMissingSelector } from '../testUtils/guardMissingSelector';
import { type RunAxeOptions, runAxe } from '../testUtils/runAxe';

const HELPER_TEXT = 'Helper text';
const VALIDATION_TEXT = 'Validation text';
const CUSTOM_ID = 'custom-described-by';

export interface AccessibilityAriaDescribedByOptions extends RunAxeOptions {
  /**
   * Set to `false` for components that render only a helper text and no validation text.
   */
  hasValidationText?: boolean;
}

const getDescribedByIds = (element: Element): string[] =>
  (element.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean);

const getReferencedTexts = (container: HTMLElement, ids: string[]): string[] =>
  ids
    .map((id) => container.querySelector(`[id="${id}"]`))
    .filter((referenced): referenced is Element => referenced !== null)
    .map((referenced) => referenced.textContent ?? '');

/**
 * Verify the `aria-describedby` attribute composed via the `useAriaDescribedBy` hook.
 *
 * @param Component - Component factory used in the test. It must spread the received props.
 * @param selector - CSS selector of the element that carries `aria-describedby`.
 * @param options - Optional `hasValidationText` flag and axe configuration overrides.
 */
export const accessibilityAriaDescribedByTest = (
  Component: ComponentType<any>,
  selector: string,
  options: AccessibilityAriaDescribedByOptions = {},
) => {
  const { hasValidationText = true, ...axeOptions } = options;
  const textProps = {
    helperText: HELPER_TEXT,
    ...(hasValidationText && { validationState: 'danger', validationText: VALIDATION_TEXT }),
  };
  const expectedTexts = [HELPER_TEXT, ...(hasValidationText ? [VALIDATION_TEXT] : [])];

  const renderElement = (props: object = {}) => {
    const result = render(<Component {...props} />);
    const element = result.container.querySelector(selector);

    guardMissingSelector(selector, element);

    return { ...result, element: element as Element };
  };

  describe('aria-describedby', () => {
    it('should not be set when there is no helper or validation text', () => {
      const { element } = renderElement();

      expect(element).not.toHaveAttribute('aria-describedby');
    });

    it('should reference existing helper and validation text elements', () => {
      const { container, element } = renderElement(textProps);
      const ids = getDescribedByIds(element);

      expect(ids).toHaveLength(expectedTexts.length);
      expect(getReferencedTexts(container, ids)).toEqual(expect.arrayContaining(expectedTexts));
    });

    it('should keep the consumer id and append registered ids', () => {
      const { element } = renderElement({ ...textProps, 'aria-describedby': CUSTOM_ID });
      const ids = getDescribedByIds(element);

      expect(ids[0]).toBe(CUSTOM_ID);
      expect(ids).toHaveLength(expectedTexts.length + 1);
    });

    it('should remove registered ids when the texts disappear', () => {
      const { element, rerender } = renderElement({ ...textProps, 'aria-describedby': CUSTOM_ID });

      rerender(<Component aria-describedby={CUSTOM_ID} />);

      expect(element).toHaveAttribute('aria-describedby', CUSTOM_ID);
    });

    it('should be accessible with helper and validation text', async () => {
      const { element } = renderElement(textProps);

      expect(await runAxe(element, axeOptions)).toHaveNoAxeViolations();
    });
  });
};
