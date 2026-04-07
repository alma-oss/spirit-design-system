import React from 'react';
import { Grid } from '../../Grid';
import { Icon } from '../../Icon';
import { UNSTABLE_File } from '..';

const noop = () => {};

const FileIconVariant = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }} spacingY="space-1000">
    <section>
      <h3>Default State</h3>
      <ul aria-label="File attachments">
        <UNSTABLE_File
          label="Document.pdf"
          helperText="8,5 kB"
          editText="Edit file name Document.pdf"
          removeText="Remove file Document.pdf from list"
          onDismiss={noop}
          onChange={noop}
        />
      </ul>
    </section>
    <section>
      <h3>Uploading State</h3>
      <ul aria-label="File attachments">
        <UNSTABLE_File
          label="Document.pdf"
          helperText={
            <div>
              <Icon name="spinner" boxSize={16} UNSAFE_className="animation-spin-clockwise" />{' '}
              <span>Uploading your file…</span>
            </div>
          }
          removeText="Remove file Document.pdf from list"
          onDismiss={noop}
        />
      </ul>
    </section>
    <section>
      <h3>Disabled State</h3>
      <ul aria-label="File attachments">
        <UNSTABLE_File
          label="Document.pdf"
          helperText="8,5 kB"
          isDisabled
          removeText="Remove file Document.pdf from list"
          onDismiss={noop}
        />
      </ul>
    </section>
    <section>
      <h3>Success State</h3>
      <ul aria-label="File attachments">
        <UNSTABLE_File
          label="Document.pdf"
          validationState="success"
          hasValidationIcon
          validationText="File uploaded successfully"
          removeText="Remove file Document.pdf from list"
          onDismiss={noop}
        />
      </ul>
    </section>
    <section>
      <h3>Warning State</h3>
      <ul aria-label="File attachments">
        <UNSTABLE_File
          label="Document.pdf"
          validationState="warning"
          hasValidationIcon
          validationText="Large file – may take time"
          removeText="Remove file Document.pdf from list"
          onDismiss={noop}
        />
      </ul>
    </section>
    <section>
      <h3>Danger State</h3>
      <ul aria-label="File attachments">
        <UNSTABLE_File
          label="Document.pdf"
          validationState="danger"
          hasValidationIcon
          validationText="File upload error – please retry"
          removeText="Remove file Document.pdf from list"
          onDismiss={noop}
        />
      </ul>
    </section>
    <section>
      <h3>No action buttons</h3>
      <ul aria-label="File attachments">
        <UNSTABLE_File label="Document.pdf" helperText="8,5 kB" />
      </ul>
    </section>
  </Grid>
);

export default FileIconVariant;
