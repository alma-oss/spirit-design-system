import React from 'react';
import UNSTABLE_Table from '../UNSTABLE_Table';

const UNSTABLE_TableStriped = () => (
  <UNSTABLE_Table isStriped>
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Widget A</td>
        <td>$10.00</td>
        <td>5</td>
      </tr>
      <tr>
        <td>Widget B</td>
        <td>$15.00</td>
        <td>3</td>
      </tr>
      <tr>
        <td>Widget C</td>
        <td>$20.00</td>
        <td>7</td>
      </tr>
      <tr>
        <td>Widget D</td>
        <td>$25.00</td>
        <td>2</td>
      </tr>
    </tbody>
  </UNSTABLE_Table>
);

export default UNSTABLE_TableStriped;
