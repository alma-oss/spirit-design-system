import React from 'react';
import UNSTABLE_Table from '../UNSTABLE_Table';

const UNSTABLE_TableWithCaption = () => (
  <UNSTABLE_Table isStriped>
    <caption className="mb-500 typography-body-medium-semibold">Employee Directory</caption>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Position</th>
        <th scope="col">Department</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Sarah Johnson</th>
        <td>Senior Developer</td>
        <td>Engineering</td>
        <td>sarah.johnson@example.com</td>
      </tr>
      <tr>
        <th scope="row">Michael Chen</th>
        <td>UX Designer</td>
        <td>Design</td>
        <td>michael.chen@example.com</td>
      </tr>
      <tr>
        <th scope="row">Emily Rodriguez</th>
        <td>Product Manager</td>
        <td>Product</td>
        <td>emily.rodriguez@example.com</td>
      </tr>
    </tbody>
  </UNSTABLE_Table>
);

export default UNSTABLE_TableWithCaption;
