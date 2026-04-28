import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { elementTypePropsTest, restPropsTest, stylePropsTest, validHtmlAttributesTest } from '@local/tests';
import { Button } from '../../Button';
import DropdownTrigger from '../DropdownTrigger';

jest.mock('../../../hooks/useIcon');

describe('DropdownTrigger', () => {
  stylePropsTest(DropdownTrigger);

  restPropsTest(DropdownTrigger, 'button');

  // pass rest props to the default trigger
  restPropsTest((props) => <DropdownTrigger {...props} />, 'button');

  // pass rest props to the custom trigger
  restPropsTest((props) => <DropdownTrigger elementType={Button} {...props} />, 'button');

  validHtmlAttributesTest((props) => <DropdownTrigger {...props} />);

  elementTypePropsTest(DropdownTrigger);

  it('should have children', () => {
    const dom = render(<DropdownTrigger elementType={Button}>Trigger</DropdownTrigger>);
    const trigger = dom.container.querySelector('button') as HTMLElement;

    expect(trigger).toHaveTextContent('Trigger');
  });

  it('should have aria-haspopup="dialog" by default', () => {
    const dom = render(<DropdownTrigger>Trigger</DropdownTrigger>);
    const trigger = dom.container.querySelector('button') as HTMLElement;

    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
  });
});
