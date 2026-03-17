import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import Label from '../Label';

describe('Label', () => {
  stylePropsTest(Label);

  restPropsTest(Label, 'label');

  validHtmlAttributesTest(Label);

  ariaAttributesTest(Label);

  elementTypePropsTest(Label);

  it('should render children', () => {
    const label = 'Label';
    render(<Label data-testid="test">{label}</Label>);

    expect(screen.getByTestId('test')).toHaveTextContent(label);
  });
});
