import React from 'react';
import UNSTABLE_Table from '../UNSTABLE_Table';

const UNSTABLE_TableDefault = () => (
  <UNSTABLE_Table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>john.doe@example.com</td>
        <td>Developer</td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td>jane.smith@example.com</td>
        <td>Designer</td>
      </tr>
      <tr>
        <td>Bob Johnson</td>
        <td>bob.johnson@example.com</td>
        <td>Manager</td>
      </tr>
    </tbody>
  </UNSTABLE_Table>
);

export default UNSTABLE_TableDefault;
