import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
  validationTextPropsTest,
} from '@local/tests';
import UNSTABLE_File from '../UNSTABLE_File';

jest.mock('../../../hooks/useIcon');

const defaultProps = {
  id: 'unstable-file-1',
  label: 'document.pdf',
  onDismiss: () => {},
};

const fileRowTestId = 'unstable-file-test-root';

const renderInList = (ui: React.ReactElement) => render(<ul>{ui}</ul>);

describe('UNSTABLE_File', () => {
  classNamePrefixProviderTest(
    (props) => (
      <ul>
        <UNSTABLE_File {...defaultProps} data-testid={fileRowTestId} {...props} />
      </ul>
    ),
    'UNSTABLE_File',
    fileRowTestId,
  );

  stylePropsTest(
    (props) => (
      <ul>
        <UNSTABLE_File {...defaultProps} data-testid={fileRowTestId} {...props} />
      </ul>
    ),
    fileRowTestId,
  );

  restPropsTest(
    (props) => (
      <ul>
        <UNSTABLE_File {...defaultProps} {...props} />
      </ul>
    ),
    'li',
  );

  validHtmlAttributesTest(UNSTABLE_File, defaultProps);

  ariaAttributesTest(UNSTABLE_File, defaultProps);

  validationTextPropsTest(
    (props) => (
      <ul>
        <UNSTABLE_File {...defaultProps} validationState="success" validationText="Validation text" {...props} />
      </ul>
    ),
    '.UNSTABLE_File__validationText',
  );

  it('should render dismiss button with accessible name', () => {
    render(
      <ul>
        <UNSTABLE_File {...defaultProps} removeText="Remove file" />
      </ul>,
    );

    expect(screen.getByRole('button', { name: 'Remove file' })).toBeInTheDocument();
  });

  it('should call onDismiss when dismiss button is clicked', () => {
    const onDismiss = jest.fn();

    render(
      <ul>
        <UNSTABLE_File {...defaultProps} onDismiss={onDismiss} removeText="Remove file" />
      </ul>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Remove file' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('should render helper text under file name', () => {
    renderInList(<UNSTABLE_File {...defaultProps} helperText="2.5 MB" />);

    expect(screen.getByText('2.5 MB')).toBeInTheDocument();
  });

  it('should render previewSlot instead of default file icon', () => {
    renderInList(
      <UNSTABLE_File {...defaultProps} previewSlot={<span data-testid="custom-file-preview">Custom</span>} />,
    );

    expect(screen.getByTestId('custom-file-preview')).toHaveTextContent('Custom');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('should render edit and remove buttons when onChange is provided', () => {
    renderInList(<UNSTABLE_File {...defaultProps} editText="Edit file" removeText="Remove file" onChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'Edit file' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove file' })).toBeInTheDocument();
  });

  it('should call onChange when edit button is clicked', () => {
    const onChange = jest.fn();

    renderInList(<UNSTABLE_File {...defaultProps} editText="Edit file" removeText="Remove file" onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit file' }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should render no action buttons when onDismiss and onChange are omitted', () => {
    renderInList(<UNSTABLE_File id={defaultProps.id} label={defaultProps.label} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render only edit button when onChange is provided without onDismiss', () => {
    renderInList(
      <UNSTABLE_File id={defaultProps.id} label={defaultProps.label} editText="Edit file" onChange={() => {}} />,
    );

    expect(screen.getByRole('button', { name: 'Edit file' })).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('should add color-scheme-on-disabled class to dismiss button when isDisabled is true', () => {
    renderInList(<UNSTABLE_File {...defaultProps} removeText="Remove file" isDisabled />);

    expect(screen.getByRole('button', { name: 'Remove file' })).toHaveClass('color-scheme-on-disabled');
  });

  it('should add color-scheme-on-disabled class to edit button when isDisabled is true', () => {
    renderInList(
      <UNSTABLE_File {...defaultProps} editText="Edit file" removeText="Remove file" onChange={() => {}} isDisabled />,
    );

    expect(screen.getByRole('button', { name: 'Edit file' })).toHaveClass('color-scheme-on-disabled');
  });

  it('should not add color-scheme-on-disabled class to action buttons when isDisabled is false', () => {
    renderInList(<UNSTABLE_File {...defaultProps} editText="Edit file" removeText="Remove file" onChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'Edit file' })).not.toHaveClass('color-scheme-on-disabled');
    expect(screen.getByRole('button', { name: 'Remove file' })).not.toHaveClass('color-scheme-on-disabled');
  });
});
