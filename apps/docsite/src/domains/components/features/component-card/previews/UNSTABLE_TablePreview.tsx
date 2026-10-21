import { UNSTABLE_Table } from '@alma-oss/spirit-web-react';
import React from 'react';
import type { PreviewComponent } from '../../component-catalog';
import { PREVIEW_GUIDES } from '../../component-catalog/constants/previewGuides';

const UNSTABLE_TablePreview: PreviewComponent = () => (
  <UNSTABLE_Table UNSAFE_style={{ width: 300 }}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>Developer</td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td>Designer</td>
      </tr>
      <tr>
        <td>Bob Johnson</td>
        <td>Manager</td>
      </tr>
    </tbody>
  </UNSTABLE_Table>
);

UNSTABLE_TablePreview.guides = PREVIEW_GUIDES.VERTICAL;

export default UNSTABLE_TablePreview;
