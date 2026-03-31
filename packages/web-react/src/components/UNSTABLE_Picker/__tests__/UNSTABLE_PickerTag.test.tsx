import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import React, { type ComponentProps } from 'react';
import { restPropsTest, stylePropsTest, validHtmlAttributesTest } from '@local/tests';
import { PickerContextProvider } from '../PickerContext';
import UNSTABLE_PickerTag from '../UNSTABLE_PickerTag';

jest.mock('../../../hooks/useIcon');

const PickerTagTest = (props: Partial<ComponentProps<typeof UNSTABLE_PickerTag>>) => {
  const { children, label = 'Czech', onRemove = jest.fn(), removeLabel = 'Remove Czech', ...rest } = props;

  return (
    <PickerContextProvider value={{ size: 'medium' }}>
      <UNSTABLE_PickerTag
        data-testid="picker-tag-test"
        label={label}
        onRemove={onRemove}
        removeLabel={removeLabel}
        {...rest}
      >
        {children}
      </UNSTABLE_PickerTag>
    </PickerContextProvider>
  );
};

describe('UNSTABLE_PickerTag', () => {
  stylePropsTest(PickerTagTest, 'picker-tag-test');

  restPropsTest(PickerTagTest, 'div');

  validHtmlAttributesTest(PickerTagTest);

  it('should render tag row and close button', () => {
    render(
      <PickerContextProvider value={{ size: 'medium' }}>
        <UNSTABLE_PickerTag label="Czech" onRemove={jest.fn()} removeLabel="Remove Czech" />
      </PickerContextProvider>,
    );

    expect(screen.getByRole('row', { name: 'Czech' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove Czech' })).toBeInTheDocument();
  });

  it('should support ReactNode label and normalized aria-label', () => {
    render(
      <PickerContextProvider value={{ size: 'medium' }}>
        <UNSTABLE_PickerTag
          label={
            <>
              {'  Czech '}
              <strong>{'\n Republic\t'}</strong>
            </>
          }
          onRemove={jest.fn()}
          removeLabel="Remove Czech Republic"
        />
      </PickerContextProvider>,
    );

    expect(screen.getByRole('row', { name: 'Czech Republic' })).toBeInTheDocument();
  });

  it('should set row, gridcell, and remove button ARIA attributes', () => {
    render(
      <PickerContextProvider value={{ size: 'medium' }}>
        <UNSTABLE_PickerTag label="Czech" onRemove={jest.fn()} removeLabel="Remove Czech" />
      </PickerContextProvider>,
    );

    const row = screen.getByRole('row', { name: 'Czech' });
    const gridcell = within(row).getByRole('gridcell');

    expect(row).toHaveAttribute('aria-label', 'Czech');
    expect(row).toHaveAttribute('tabIndex', '0');
    expect(gridcell).toHaveAttribute('aria-colindex', '1');
    expect(within(row).getByRole('button', { name: 'Remove Czech' })).toBeInTheDocument();
  });

  it('should set aria-describedby on the tag row when tagDescriptionId is in context', () => {
    render(
      <PickerContextProvider value={{ size: 'medium', tagDescriptionId: 'picker-tag-hint' }}>
        <UNSTABLE_PickerTag label="Czech" onRemove={jest.fn()} removeLabel="Remove Czech" />
      </PickerContextProvider>,
    );

    expect(screen.getByRole('row', { name: 'Czech' })).toHaveAttribute('aria-describedby', 'picker-tag-hint');
  });

  it('should derive remove label from translation when removeLabel is omitted', () => {
    render(
      <PickerContextProvider value={{ size: 'medium' }}>
        <UNSTABLE_PickerTag label="Czech" onRemove={jest.fn()} />
      </PickerContextProvider>,
    );

    expect(screen.getByRole('button', { name: /Czech/i })).toBeInTheDocument();
  });
});
