import { render } from '@testing-library/react';
import React from 'react';
import { accessibilityDisabledTest, accessibilityLoadingTest, accessibilityTest, runAxe } from '@local/tests';
import { Hidden } from '../../Hidden';
import { Icon } from '../../Icon';
import { VisuallyHidden } from '../../VisuallyHidden';
import Button from '../Button';

jest.mock('../../../hooks/useIcon');

describe('Button accessibility', () => {
  accessibilityTest((props) => <Button {...props}>Submit</Button>, 'button');

  accessibilityDisabledTest((props) => <Button {...props}>Submit</Button>, 'button');

  accessibilityLoadingTest((props) => <Button {...props}>Loading</Button>, 'button');

  it('should be accessible when rendered as an icon-only action', async () => {
    const { getByRole } = render(
      <Button isSymmetrical>
        <Icon name="hamburger" />
        <VisuallyHidden>Menu</VisuallyHidden>
      </Button>,
    );

    const results = await runAxe(getByRole('button'));

    expect(results).toHaveNoAxeViolations();
  });

  it('should be accessible when rendered as a responsive icon/text action', async () => {
    const { getByRole } = render(
      <Button isSymmetrical={{ tablet: true }}>
        <Icon name="hamburger" marginRight={{ mobile: 'space-400', tablet: 'space-0' }} />
        <VisuallyHidden>Menu</VisuallyHidden>
        <Hidden from="tablet" aria-hidden="true">
          Menu
        </Hidden>
      </Button>,
    );

    const results = await runAxe(getByRole('button'));

    expect(results).toHaveNoAxeViolations();
  });
});
