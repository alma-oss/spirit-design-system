import { render } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import { guardMissingSelector } from '../testUtils/guardMissingSelector';
import { type RunAxeOptions, runAxe } from '../testUtils/runAxe';

const DETAILS_TEXT = 'Details text';
const CUSTOM_ID = 'custom-details';

/**
 * Verify the `aria-details` attribute composed via the `useAriaDetails` hook.
 *
 * @param Component - Component factory used in the test. It must spread the received props.
 * @param selector - CSS selector of the element that carries `aria-details`.
 * @param axeOptions - Optional axe configuration overrides.
 */
export const accessibilityAriaDetailsTest = (
  Component: ComponentType<any>,
  selector: string,
  axeOptions?: RunAxeOptions,
) => {
  const renderElement = (props: object = {}) => {
    const result = render(<Component {...props} />);
    const element = result.container.querySelector(selector);

    guardMissingSelector(selector, element);

    return { ...result, element: element as Element };
  };

  describe('aria-details', () => {
    it('should not be set when there are no details', () => {
      const { element } = renderElement();

      expect(element).not.toHaveAttribute('aria-details');
    });

    it('should reference the existing details element', () => {
      const { container, element } = renderElement({ details: DETAILS_TEXT });
      const id = element.getAttribute('aria-details') ?? '';

      expect(id).not.toBe('');
      expect(container.querySelector(`[id="${id}"]`)).toHaveTextContent(DETAILS_TEXT);
    });

    it('should keep the consumer id and append the registered id', () => {
      const { element } = renderElement({ details: DETAILS_TEXT, 'aria-details': CUSTOM_ID });
      const ids = (element.getAttribute('aria-details') ?? '').split(/\s+/);

      expect(ids[0]).toBe(CUSTOM_ID);
      expect(ids).toHaveLength(2);
    });

    it('should remove the registered id when the details disappear', () => {
      const { element, rerender } = renderElement({ details: DETAILS_TEXT, 'aria-details': CUSTOM_ID });

      rerender(<Component aria-details={CUSTOM_ID} />);

      expect(element).toHaveAttribute('aria-details', CUSTOM_ID);
    });

    it('should be accessible with details', async () => {
      const { element } = renderElement({ details: DETAILS_TEXT });

      expect(await runAxe(element, axeOptions)).toHaveNoAxeViolations();
    });
  });
};
