import React from 'react';
import UNSTABLE_Table from '../UNSTABLE_Table';

const UNSTABLE_TableBordered = () => (
  <UNSTABLE_Table isBordered>
    <thead>
      <tr>
        <th>ID</th>
        <th>Status</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>001</td>
        <td>Active</td>
        <td>2025-10-29</td>
      </tr>
      <tr>
        <td>002</td>
        <td>Pending</td>
        <td>2025-10-28</td>
      </tr>
      <tr>
        <td>003</td>
        <td>Completed</td>
        <td>2025-10-27</td>
      </tr>
    </tbody>
  </UNSTABLE_Table>
);

export default UNSTABLE_TableBordered;
