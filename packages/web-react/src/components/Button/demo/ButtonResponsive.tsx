import React from 'react';
import { Hidden } from '../../Hidden';
import { Icon } from '../../Icon';
import { VisuallyHidden } from '../../VisuallyHidden';
import Button from '../Button';

const ButtonResponsive = () => (
  <>
    <Button isSymmetrical>
      <Icon name="hamburger" />
      <VisuallyHidden>Menu</VisuallyHidden>
    </Button>

    <Button isSymmetrical={{ tablet: true }}>
      <Icon name="hamburger" marginRight={{ mobile: 'space-400', tablet: 'space-0' }} />
      <VisuallyHidden>Menu</VisuallyHidden>
      <Hidden from="tablet" aria-hidden="true">
        Menu
      </Hidden>
    </Button>

    <Button isSymmetrical={{ desktop: true }}>
      <Icon name="hamburger" marginRight={{ mobile: 'space-400', desktop: 'space-0' }} />
      <VisuallyHidden>Menu</VisuallyHidden>
      <Hidden from="desktop" aria-hidden="true">
        Menu
      </Hidden>
    </Button>

    <Button isSymmetrical={{ mobile: true, tablet: false }}>
      <Icon name="hamburger" marginRight={{ tablet: 'space-400' }} />
      <VisuallyHidden>Menu</VisuallyHidden>
      <Hidden on="mobile" aria-hidden="true">
        Menu
      </Hidden>
    </Button>

    <Button isSymmetrical={{ mobile: true, desktop: false }}>
      <Icon name="hamburger" marginRight={{ desktop: 'space-400' }} />
      <VisuallyHidden>Menu</VisuallyHidden>
      <Hidden on={['mobile', 'tablet']} aria-hidden="true">
        Menu
      </Hidden>
    </Button>

    <Button isSymmetrical={{ tablet: true, desktop: false }}>
      <Icon name="hamburger" marginRight={{ mobile: 'space-400', tablet: 'space-0', desktop: 'space-400' }} />
      <VisuallyHidden>Menu</VisuallyHidden>
      <Hidden on="tablet" aria-hidden="true">
        Menu
      </Hidden>
    </Button>

    <Button isSymmetrical={{ mobile: true, desktop: false }}>
      <Icon name="hamburger" hideFrom="desktop" />
      <VisuallyHidden>Menu</VisuallyHidden>
      <Hidden on={['mobile', 'tablet']} aria-hidden="true">
        Menu
      </Hidden>
    </Button>
  </>
);

export default ButtonResponsive;
