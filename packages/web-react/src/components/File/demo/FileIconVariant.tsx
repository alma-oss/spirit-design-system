import React from 'react';
import { Grid } from '../../Grid';
import { HelperText } from '../../HelperText';
import { Icon } from '../../Icon';
import { ProgressBar } from '../../ProgressBar';
import { File } from '..';

const noop = () => {};

const FileIconVariant = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }} spacingY="space-1000">
    <section>
      <h3>Default State</h3>
      <ul aria-label="File attachments">
        <File
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
        <File
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
      <h3>Uploading State with Progress Bar</h3>
      <ul aria-label="File attachments">
        <File label="Document.pdf" onDismiss={noop} removeText="Cancel upload of Document.pdf">
          <ProgressBar
            aria-describedby="file-progress-bar-status"
            aria-label="Uploading Document.pdf"
            value={60}
            valueLabel={'60\u00a0%'}
          />
          <HelperText
            elementType="span"
            helperText="Uploading your file…"
            id="file-progress-bar-status"
            role="status"
          />
        </File>
      </ul>
    </section>
    <section>
      <h3>Disabled State</h3>
      <ul aria-label="File attachments">
        <File
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
        <File
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
        <File
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
        <File
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
      <h3>No Action Buttons</h3>
      <ul aria-label="File attachments">
        <File label="Document.pdf" helperText="8,5 kB" />
      </ul>
    </section>
  </Grid>
);

export default FileIconVariant;
