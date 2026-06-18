import React from 'react';
import { Grid } from '../../Grid';
import { File } from '..';

const noop = () => {};

const FileTruncatedLabel = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }} spacingY="space-1000">
    <section>
      <h3>Default</h3>
      <ul aria-label="File attachments">
        <File
          label="This_very_long_label_of_document_should_truncate.pdf"
          helperText="8,5 kB"
          editText="Edit file name Document.pdf"
          removeText="Remove file Document.pdf from list"
          onDismiss={noop}
          onChange={noop}
        />
      </ul>
    </section>
    <section>
      <h3>No Action Buttons</h3>
      <ul aria-label="File attachments">
        <File label="This_very_long_label_of_document_should_truncate.pdf" helperText="8,5 kB" />
      </ul>
    </section>
  </Grid>
);

export default FileTruncatedLabel;
