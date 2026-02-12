import React from 'react';
import { Hidden } from '../../Hidden';
import { Icon } from '../../Icon';
import { VisuallyHidden } from '../../VisuallyHidden';
import ButtonLink from '../ButtonLink';

const ButtonLinkResponsive = () => (
  <>
    <ButtonLink href="#" isSymmetrical>
      <Icon name="hamburger" />
      <VisuallyHidden>Menu</VisuallyHidden>
    </ButtonLink>

    <ButtonLink href="#" isSymmetrical={{ tablet: true }}>
      <Icon name="hamburger" />
      <VisuallyHidden>Menu</VisuallyHidden>
      <Hidden from="tablet" aria-hidden="true">
        Menu
      </Hidden>
    </ButtonLink>

    <ButtonLink href="#" isSymmetrical={{ desktop: true }}>
      <Icon name="hamburger" />
      <VisuallyHidden>Menu</VisuallyHidden>
      <Hidden from="desktop" aria-hidden="true">
        Menu
      </Hidden>
    </ButtonLink>

    <ButtonLink href="#" isSymmetrical={{ mobile: true, tablet: false }}>
      <Icon name="hamburger" />
      <VisuallyHidden>Menu</VisuallyHidden>
      <Hidden on="mobile" aria-hidden="true">
        Menu
      </Hidden>
    </ButtonLink>

    <ButtonLink href="#" isSymmetrical={{ mobile: true, desktop: false }}>
      <Icon name="hamburger" />
      <VisuallyHidden>Menu</VisuallyHidden>
      <Hidden on={['mobile', 'tablet']} aria-hidden="true">
        Menu
      </Hidden>
    </ButtonLink>

    <ButtonLink href="#" isSymmetrical={{ tablet: true, desktop: false }}>
      <Icon name="hamburger" />
      <VisuallyHidden>Menu</VisuallyHidden>
      <Hidden on="tablet" aria-hidden="true">
        Menu
      </Hidden>
    </ButtonLink>

    <ButtonLink href="#" isSymmetrical={{ mobile: true, desktop: false }}>
      <Icon name="hamburger" hideFrom="desktop" />
      <VisuallyHidden>Menu</VisuallyHidden>
      <Hidden on={['mobile', 'tablet']} aria-hidden="true">
        Menu
      </Hidden>
    </ButtonLink>
  </>
);

export default ButtonLinkResponsive;
