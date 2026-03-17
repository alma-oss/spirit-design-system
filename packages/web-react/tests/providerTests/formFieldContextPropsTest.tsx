import { render, screen } from '@testing-library/react';
import React, { type ReactElement } from 'react';
import { PropsProvider } from '../../src/context';
import { FormFieldVariants } from '../../src/types';

type TestProps = Record<string, unknown>;
type RenderComponent = (props?: TestProps) => ReactElement;

interface BaseFormFieldTestConfig {
  renderComponent: RenderComponent;
}

interface FormFieldContextPropsTestConfig extends BaseFormFieldTestConfig {
  classNamePrefix: string;
  text?: string;
}

interface FormFieldLabelContextPropsTestConfig extends BaseFormFieldTestConfig {
  /** When false, skip the hidden-label test (e.g. FieldGroup hides label by not rendering `Label`). @default true */
  includeHidden?: boolean;
  /** When false, skip the required-label test (e.g. Radio). @default true */
  includeRequired?: boolean;
  /** Props applied for the hidden-label case. @default { isLabelHidden: true } */
  hiddenProps?: TestProps;
  /** Text of the label. @default 'Label' */
  labelText?: string;
  /**
   * Use when `getByText(text)` matches multiple nodes (e.g. FieldGroup legend + visible `Label`).
   *
   * @default screen.getByText(text)
   */
  resolveFieldElement?: (text: string) => HTMLElement;
  /** Props applied for the required-label case. @default { isRequired: true } */
  requiredProps?: TestProps;
}

interface VariantContextProps {
  disabledProps?: TestProps;
  inlineProps?: TestProps;
  itemProps?: TestProps;
}

interface FormFieldHelperTextContextPropsTestConfig extends BaseFormFieldTestConfig, VariantContextProps {
  /** When false, skip inline class test (parents without `formFieldVariant` in context). @default false */
  includeInline?: boolean;
  /** When false, skip item class test. @default false */
  includeItem?: boolean;
  /** Text of the helper text. @default 'Helper' */
  helperText?: string;
  /** Text of the label. @default 'Label' */
  labelText?: string;
}

interface FormFieldValidationTextContextPropsTestConfig extends BaseFormFieldTestConfig, VariantContextProps {
  /** When false, skip disabled validation text test. @default true */
  includeDisabled?: boolean;
  /** When false, skip inline class test (parents without `formFieldVariant` in context). @default false */
  includeInline?: boolean;
  /** When false, skip item class test. @default false */
  includeItem?: boolean;
  labelText?: string;
  stateClass?: string;
  stateProps?: TestProps;
  validationText?: string;
}

const DEFAULT_LABEL_HIDDEN_PROPS: TestProps = { isLabelHidden: true };
const DEFAULT_LABEL_REQUIRED_PROPS: TestProps = { isRequired: true };
const DEFAULT_LABEL_TEXT = 'Label';

const DEFAULT_HELPER_DISABLED_PROPS: TestProps = { isDisabled: true };
const DEFAULT_HELPER_INLINE_PROPS: TestProps = {};
const DEFAULT_HELPER_ITEM_PROPS: TestProps = { isItem: true };
const DEFAULT_HELPER_TEXT = 'Helper';

const DEFAULT_VALIDATION_INLINE_PROPS: TestProps = { validationState: 'danger' };
const DEFAULT_VALIDATION_DISABLED_PROPS: TestProps = { isDisabled: true, validationState: 'danger' };
const DEFAULT_VALIDATION_ITEM_PROPS: TestProps = { isItem: true, validationState: 'danger' };
const DEFAULT_VALIDATION_STATE_CLASS = 'ValidationText--danger';
const DEFAULT_VALIDATION_STATE_PROPS: TestProps = { validationState: 'danger' };
const DEFAULT_VALIDATION_TEXT = 'Invalid';

const renderFieldComponent = (renderComponent: RenderComponent, props?: TestProps) => render(renderComponent(props));

const expectClassForProps = ({
  expectedClassName,
  getElement,
  props,
  renderComponent,
  text,
}: {
  expectedClassName: string;
  getElement?: (text: string) => HTMLElement;
  props: TestProps;
  renderComponent: RenderComponent;
  text: string;
}) => {
  renderFieldComponent(renderComponent, props);

  const element = getElement ? getElement(text) : screen.getByText(text);

  expect(element).toHaveClass(expectedClassName);
};

export const formFieldContextPropsTest = ({
  classNamePrefix,
  renderComponent,
  text = DEFAULT_LABEL_TEXT,
}: FormFieldContextPropsTestConfig) => {
  describe('prop priority (1. direct props, 2. context, 3. defaultProps)', () => {
    it('should use default formFieldVariant when no context and no direct prop', () => {
      renderFieldComponent(renderComponent);
      const element = screen.getByText(text);

      expect(element.className).toMatch(new RegExp(`^${classNamePrefix}\\b`));
      expect(element.className).not.toContain(`${classNamePrefix}--inline`);
      expect(element.className).not.toContain(`${classNamePrefix}--item`);
    });

    it('should use context formFieldVariant when context provides it and no direct prop', () => {
      render(<PropsProvider value={{ formFieldVariant: FormFieldVariants.INLINE }}>{renderComponent()}</PropsProvider>);
      const element = screen.getByText(text);

      expect(element.className).toContain(`${classNamePrefix}--inline`);
    });

    it('should use direct formFieldVariant over context (direct props override context)', () => {
      render(
        <PropsProvider value={{ formFieldVariant: FormFieldVariants.ITEM }}>
          {renderComponent({ formFieldVariant: FormFieldVariants.INLINE })}
        </PropsProvider>,
      );
      const element = screen.getByText(text);

      expect(element.className).toContain(`${classNamePrefix}--inline`);
      expect(element.className).not.toContain(`${classNamePrefix}--item`);
    });

    it('should use context isDisabled when no direct prop', () => {
      render(<PropsProvider value={{ isDisabled: true }}>{renderComponent()}</PropsProvider>);
      const element = screen.getByText(text);

      expect(element.className).toContain(`${classNamePrefix}--disabled`);
    });

    it('should use direct isDisabled over context (direct props override context)', () => {
      render(<PropsProvider value={{ isDisabled: true }}>{renderComponent({ isDisabled: false })}</PropsProvider>);
      const element = screen.getByText(text);

      expect(element.className).not.toContain(`${classNamePrefix}--disabled`);
    });
  });
};

export const formFieldLabelContextPropsTest = ({
  hiddenProps = DEFAULT_LABEL_HIDDEN_PROPS,
  includeHidden = true,
  includeRequired = true,
  labelText = DEFAULT_LABEL_TEXT,
  renderComponent,
  requiredProps = DEFAULT_LABEL_REQUIRED_PROPS,
  resolveFieldElement,
}: FormFieldLabelContextPropsTestConfig) => {
  const getElement = resolveFieldElement ?? ((t: string) => screen.getByText(t));

  describe('label context propagation', () => {
    if (includeRequired) {
      it('should apply required class to nested Label when parent is required', () => {
        expectClassForProps({
          expectedClassName: 'Label--required',
          getElement,
          props: { label: labelText, ...requiredProps },
          renderComponent,
          text: labelText,
        });
      });
    }

    if (includeHidden) {
      it('should apply hidden class to nested Label when parent label is hidden', () => {
        expectClassForProps({
          expectedClassName: 'accessibility-hidden',
          getElement,
          props: { label: labelText, ...hiddenProps },
          renderComponent,
          text: labelText,
        });
      });
    }
  });
};

export const formFieldHelperTextContextPropsTest = ({
  disabledProps = DEFAULT_HELPER_DISABLED_PROPS,
  helperText = DEFAULT_HELPER_TEXT,
  includeInline = false,
  includeItem = false,
  inlineProps = DEFAULT_HELPER_INLINE_PROPS,
  itemProps,
  labelText = DEFAULT_LABEL_TEXT,
  renderComponent,
}: FormFieldHelperTextContextPropsTestConfig) => {
  const resolvedItemProps = itemProps ?? DEFAULT_HELPER_ITEM_PROPS;

  describe('helper text context propagation', () => {
    if (includeInline) {
      it('should apply inline class to nested HelperText', () => {
        expectClassForProps({
          expectedClassName: 'HelperText--inline',
          props: { label: labelText, helperText, ...inlineProps },
          renderComponent,
          text: helperText,
        });
      });
    }

    if (includeItem) {
      it('should apply item class to nested HelperText', () => {
        expectClassForProps({
          expectedClassName: 'HelperText--item',
          props: { label: labelText, helperText, ...resolvedItemProps },
          renderComponent,
          text: helperText,
        });
      });
    }

    it('should apply disabled class to nested HelperText', () => {
      expectClassForProps({
        expectedClassName: 'HelperText--disabled',
        props: { label: labelText, helperText, ...disabledProps },
        renderComponent,
        text: helperText,
      });
    });
  });
};

export const formFieldValidationTextContextPropsTest = ({
  disabledProps = DEFAULT_VALIDATION_DISABLED_PROPS,
  includeDisabled = true,
  includeInline = false,
  includeItem = false,
  inlineProps = DEFAULT_VALIDATION_INLINE_PROPS,
  itemProps,
  labelText = DEFAULT_LABEL_TEXT,
  renderComponent,
  stateClass = DEFAULT_VALIDATION_STATE_CLASS,
  stateProps = DEFAULT_VALIDATION_STATE_PROPS,
  validationText = DEFAULT_VALIDATION_TEXT,
}: FormFieldValidationTextContextPropsTestConfig) => {
  const resolvedItemProps = itemProps ?? DEFAULT_VALIDATION_ITEM_PROPS;

  describe('validation text context propagation', () => {
    if (includeInline) {
      it('should apply inline class to nested ValidationText', () => {
        expectClassForProps({
          expectedClassName: 'ValidationText--inline',
          props: { label: labelText, validationText, ...inlineProps },
          renderComponent,
          text: validationText,
        });
      });
    }

    if (includeItem) {
      it('should apply item class to nested ValidationText', () => {
        expectClassForProps({
          expectedClassName: 'ValidationText--item',
          props: { label: labelText, validationText, ...resolvedItemProps },
          renderComponent,
          text: validationText,
        });
      });
    }

    it('should apply validation state class to nested ValidationText', () => {
      expectClassForProps({
        expectedClassName: stateClass,
        props: { label: labelText, validationText, ...stateProps },
        renderComponent,
        text: validationText,
      });
    });

    if (includeDisabled) {
      it('should apply disabled class to nested ValidationText', () => {
        expectClassForProps({
          expectedClassName: 'ValidationText--disabled',
          props: { label: labelText, validationText, ...disabledProps },
          renderComponent,
          text: validationText,
        });
      });
    }
  });
};
