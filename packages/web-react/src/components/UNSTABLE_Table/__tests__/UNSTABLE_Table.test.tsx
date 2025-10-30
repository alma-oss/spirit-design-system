import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { classNamePrefixProviderTest } from '../../../../tests/providerTests/classNamePrefixProviderTest';
import { restPropsTest } from '../../../../tests/providerTests/restPropsTest';
import { stylePropsTest } from '../../../../tests/providerTests/stylePropsTest';
import UNSTABLE_Table from '../UNSTABLE_Table';

const tableContent = (
  <tbody>
    <tr>
      <td>Content</td>
    </tr>
  </tbody>
);

describe('UNSTABLE_Table', () => {
  classNamePrefixProviderTest(UNSTABLE_Table, 'UNSTABLE_Table');

  stylePropsTest(UNSTABLE_Table);

  restPropsTest(UNSTABLE_Table, 'table');

  it('should render children', () => {
    const { container } = render(
      <UNSTABLE_Table>
        <thead>
          <tr>
            <th>Header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data</td>
          </tr>
        </tbody>
      </UNSTABLE_Table>,
    );

    expect(container.querySelector('table')).toBeInTheDocument();
    expect(container.querySelector('thead')).toBeInTheDocument();
    expect(container.querySelector('tbody')).toBeInTheDocument();
  });

  it('should have default className', () => {
    const { container } = render(<UNSTABLE_Table>{tableContent}</UNSTABLE_Table>);

    expect(container.querySelector('table')).toHaveClass('UNSTABLE_Table');
  });

  it('should have striped className', () => {
    const { container } = render(<UNSTABLE_Table isStriped>{tableContent}</UNSTABLE_Table>);

    expect(container.querySelector('table')).toHaveClass('UNSTABLE_Table--striped');
  });

  it('should have bordered className', () => {
    const { container } = render(<UNSTABLE_Table isBordered>{tableContent}</UNSTABLE_Table>);

    expect(container.querySelector('table')).toHaveClass('UNSTABLE_Table--bordered');
  });

  it('should have compact className', () => {
    const { container } = render(<UNSTABLE_Table isCompact>{tableContent}</UNSTABLE_Table>);

    expect(container.querySelector('table')).toHaveClass('UNSTABLE_Table--compact');
  });

  it('should have hoverable className', () => {
    const { container } = render(<UNSTABLE_Table isHoverable>{tableContent}</UNSTABLE_Table>);

    expect(container.querySelector('table')).toHaveClass('UNSTABLE_Table--hoverable');
  });

  it('should have responsive className', () => {
    const { container } = render(<UNSTABLE_Table isResponsive>{tableContent}</UNSTABLE_Table>);

    expect(container.querySelector('table')).toHaveClass('UNSTABLE_Table--responsive');
  });

  it('should have multiple modifier classNames', () => {
    const { container } = render(
      <UNSTABLE_Table isStriped isBordered isHoverable>
        {tableContent}
      </UNSTABLE_Table>,
    );

    const table = container.querySelector('table');

    expect(table).toHaveClass('UNSTABLE_Table--striped');
    expect(table).toHaveClass('UNSTABLE_Table--bordered');
    expect(table).toHaveClass('UNSTABLE_Table--hoverable');
  });
});
