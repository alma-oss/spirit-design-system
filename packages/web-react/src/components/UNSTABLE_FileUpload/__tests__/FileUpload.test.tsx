import '@testing-library/jest-dom';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import UNSTABLE_FileUpload from '../UNSTABLE_FileUpload';

jest.mock('../../../hooks/useIcon');

describe('UNSTABLE_FileUpload', () => {
  classNamePrefixProviderTest(UNSTABLE_FileUpload, 'FileUploader');

  stylePropsTest((props) => <UNSTABLE_FileUpload {...props} />);

  restPropsTest(UNSTABLE_FileUpload, 'div');

  validHtmlAttributesTest(UNSTABLE_FileUpload);

  ariaAttributesTest(UNSTABLE_FileUpload);
});
