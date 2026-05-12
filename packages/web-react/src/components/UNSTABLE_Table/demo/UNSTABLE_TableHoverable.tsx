import React from 'react';
import UNSTABLE_Table from '../UNSTABLE_Table';

const UNSTABLE_TableHoverable = () => (
  <UNSTABLE_Table isHoverable>
    <thead>
      <tr>
        <th>Name</th>
        <th>Department</th>
        <th>Location</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alice Williams</td>
        <td>Engineering</td>
        <td>New York</td>
      </tr>
      <tr>
        <td>Charlie Brown</td>
        <td>Sales</td>
        <td>London</td>
      </tr>
      <tr>
        <td>Diana Prince</td>
        <td>Marketing</td>
        <td>Paris</td>
      </tr>
    </tbody>
  </UNSTABLE_Table>
);

export default UNSTABLE_TableHoverable;
