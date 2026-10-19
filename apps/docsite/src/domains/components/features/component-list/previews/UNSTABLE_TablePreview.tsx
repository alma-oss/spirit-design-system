import { UNSTABLE_Table } from '@alma-oss/spirit-web-react';
import React from 'react';

const UNSTABLE_TablePreview = () => (
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

export default UNSTABLE_TablePreview;
