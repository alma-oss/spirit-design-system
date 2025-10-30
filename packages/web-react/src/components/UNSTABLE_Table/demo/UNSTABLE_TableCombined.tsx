import React from 'react';
import UNSTABLE_Table from '../UNSTABLE_Table';

const UNSTABLE_TableCombined = () => (
  <UNSTABLE_Table isStriped isBordered isHoverable>
    <thead>
      <tr>
        <th>Project</th>
        <th>Client</th>
        <th>Status</th>
        <th>Budget</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Website Redesign</td>
        <td>Acme Corp</td>
        <td>In Progress</td>
        <td>$50,000</td>
      </tr>
      <tr>
        <td>Mobile App</td>
        <td>TechStart Inc</td>
        <td>Planning</td>
        <td>$75,000</td>
      </tr>
      <tr>
        <td>API Integration</td>
        <td>DataFlow Ltd</td>
        <td>Completed</td>
        <td>$30,000</td>
      </tr>
      <tr>
        <td>Brand Guidelines</td>
        <td>Creative Co</td>
        <td>Review</td>
        <td>$15,000</td>
      </tr>
    </tbody>
  </UNSTABLE_Table>
);

export default UNSTABLE_TableCombined;
