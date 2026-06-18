import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  formFieldHelperTextContextPropsTest,
  formFieldLabelContextPropsTest,
  formFieldValidationTextContextPropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import File from '../File';

jest.mock('../../../hooks/useIcon');

const defaultProps = {
  id: 'unstable-file-1',
  label: 'document.pdf',
  onDismiss: () => {},
};

const fileRowTestId = 'unstable-file-test-root';

const renderInList = (ui: React.ReactElement) => render(<ul>{ui}</ul>);

describe('File', () => {
  classNamePrefixProviderTest(
    (props) => (
      <ul>
        <File {...defaultProps} data-testid={fileRowTestId} {...props} />
      </ul>
    ),
    'File',
    fileRowTestId,
  );

  stylePropsTest(
    (props) => (
      <ul>
        <File {...defaultProps} data-testid={fileRowTestId} {...props} />
      </ul>
    ),
    fileRowTestId,
  );

  restPropsTest(
    (props) => (
      <ul>
        <File {...defaultProps} {...props} />
      </ul>
    ),
    'li',
  );

  validHtmlAttributesTest(File, defaultProps);

  ariaAttributesTest(File, defaultProps);

  formFieldLabelContextPropsTest({
    includeHidden: false,
    includeRequired: false,
    renderComponent: (props) => <File {...defaultProps} {...props} />,
  });

  formFieldHelperTextContextPropsTest({
    renderComponent: (props) => <File {...defaultProps} {...props} />,
  });

  formFieldValidationTextContextPropsTest({
    renderComponent: (props) => <File {...defaultProps} {...props} />,
  });

  it('should render dismiss button with accessible name', () => {
    render(
      <ul>
        <File {...defaultProps} removeText="Remove file" />
      </ul>,
    );

    expect(screen.getByRole('button', { name: 'Remove file' })).toBeInTheDocument();
  });

  it('should call onDismiss when dismiss button is clicked', () => {
    const onDismiss = jest.fn();

    render(
      <ul>
        <File {...defaultProps} onDismiss={onDismiss} removeText="Remove file" />
      </ul>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Remove file' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('should render helper text under file name', () => {
    renderInList(<File {...defaultProps} helperText="2.5 MB" />);

    expect(screen.getByText('2.5 MB')).toBeInTheDocument();
  });

  it('should render previewSlot instead of default file icon', () => {
    renderInList(<File {...defaultProps} previewSlot={<span data-testid="custom-file-preview">Custom</span>} />);

    expect(screen.getByTestId('custom-file-preview')).toHaveTextContent('Custom');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('should render edit and remove buttons when onChange is provided', () => {
    renderInList(<File {...defaultProps} editText="Edit file" removeText="Remove file" onChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'Edit file' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove file' })).toBeInTheDocument();
  });

  it('should call onChange when edit button is clicked', () => {
    const onChange = jest.fn();

    renderInList(<File {...defaultProps} editText="Edit file" removeText="Remove file" onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit file' }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should render no action buttons when onDismiss and onChange are omitted', () => {
    renderInList(<File id={defaultProps.id} label={defaultProps.label} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render only edit button when onChange is provided without onDismiss', () => {
    renderInList(<File id={defaultProps.id} label={defaultProps.label} editText="Edit file" onChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'Edit file' })).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('should add disabled class to dismiss button when isDisabled is true', () => {
    renderInList(<File {...defaultProps} removeText="Remove file" isDisabled />);

    expect(screen.getByRole('button', { name: 'Remove file' })).toHaveClass('disabled');
  });

  it('should add disabled class to edit button when isDisabled is true', () => {
    renderInList(
      <File {...defaultProps} editText="Edit file" removeText="Remove file" onChange={() => {}} isDisabled />,
    );

    expect(screen.getByRole('button', { name: 'Edit file' })).toHaveClass('disabled');
  });

  it('should not add disabled class to action buttons when isDisabled is false', () => {
    renderInList(<File {...defaultProps} editText="Edit file" removeText="Remove file" onChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'Edit file' })).not.toHaveClass('disabled');
    expect(screen.getByRole('button', { name: 'Remove file' })).not.toHaveClass('disabled');
  });
});
