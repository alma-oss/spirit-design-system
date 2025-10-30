import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import UNSTABLE_Table from '../UNSTABLE_Table';

const meta: Meta<typeof UNSTABLE_Table> = {
  title: 'Components/UNSTABLE_Table',
  component: UNSTABLE_Table,
  parameters: {
    docs: {
      description: {
        component: 'The UNSTABLE_Table component provides a styled table element for displaying tabular data.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'object',
    },
    isStriped: {
      control: 'boolean',
      description: 'Add alternating background colors to table rows',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isBordered: {
      control: 'boolean',
      description: 'Add borders to all cells',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isCompact: {
      control: 'boolean',
      description: 'Reduce padding for a more compact appearance',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isHoverable: {
      control: 'boolean',
      description: 'Add hover effect to table rows',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isResponsive: {
      control: 'boolean',
      description: 'Make the table scrollable on small screens',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    isStriped: false,
    isBordered: false,
    isCompact: false,
    isHoverable: false,
    isResponsive: false,
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_Table>;

export const Default: Story = {
  args: {
    children: (
      <>
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
      </>
    ),
  },
};

export const Striped: Story = {
  args: {
    isStriped: true,
    children: (
      <>
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
      </>
    ),
  },
};

export const Bordered: Story = {
  args: {
    isBordered: true,
    children: (
      <>
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
      </>
    ),
  },
};

export const Compact: Story = {
  args: {
    isCompact: true,
    children: (
      <>
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
      </>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    isHoverable: true,
    children: (
      <>
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
      </>
    ),
  },
};

export const Combined: Story = {
  args: {
    isStriped: true,
    isBordered: true,
    isHoverable: true,
    children: (
      <>
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
      </>
    ),
  },
};
