import React from 'react';
import UNSTABLE_Table from '../UNSTABLE_Table';

const UNSTABLE_TableCompact = () => (
  <UNSTABLE_Table isCompact>
    <thead>
      <tr>
        <th>Code</th>
        <th>Description</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>A1</td>
        <td>First item</td>
        <td>100</td>
      </tr>
      <tr>
        <td>B2</td>
        <td>Second item</td>
        <td>200</td>
      </tr>
      <tr>
        <td>C3</td>
        <td>Third item</td>
        <td>300</td>
      </tr>
    </tbody>
  </UNSTABLE_Table>
);

export default UNSTABLE_TableCompact;
