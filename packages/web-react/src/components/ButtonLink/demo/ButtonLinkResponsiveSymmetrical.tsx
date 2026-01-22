import React from 'react';
import { Icon } from '../../Icon';
import { VisuallyHidden } from '../../VisuallyHidden';
import ButtonLink from '../ButtonLink';

const ButtonLinkResponsiveSymmetrical = () => (
  <>
    <ButtonLink href="#" isSymmetrical>
      <Icon name="hamburger" />
      <VisuallyHidden>Menu</VisuallyHidden>
    </ButtonLink>

    <ButtonLink href="#" isSymmetrical={{ tablet: true }}>
      <Icon name="hamburger" />
      <VisuallyHidden>Menu</VisuallyHidden>
      <span className="d-tablet-none" aria-hidden="true">
        Menu
      </span>
    </ButtonLink>

    <ButtonLink href="#" isSymmetrical={{ desktop: true }}>
      <Icon name="hamburger" />
      <VisuallyHidden>Menu</VisuallyHidden>
      <span className="d-desktop-none" aria-hidden="true">
        Menu
      </span>
    </ButtonLink>

    <ButtonLink href="#" isSymmetrical={{ mobile: true, tablet: false }}>
      <Icon name="hamburger" />
      <VisuallyHidden>Menu</VisuallyHidden>
      <span className="d-none d-tablet-inline" aria-hidden="true">
        Menu
      </span>
    </ButtonLink>

    <ButtonLink href="#" isSymmetrical={{ mobile: true, desktop: false }}>
      <Icon name="hamburger" />
      <VisuallyHidden>Menu</VisuallyHidden>
      <span className="d-none d-desktop-inline" aria-hidden="true">
        Menu
      </span>
    </ButtonLink>

    <ButtonLink href="#" isSymmetrical={{ tablet: true, desktop: false }}>
      <Icon name="hamburger" />
      <VisuallyHidden>Menu</VisuallyHidden>
      <span className="d-tablet-none d-desktop-inline" aria-hidden="true">
        Menu
      </span>
    </ButtonLink>
  </>
);

export default ButtonLinkResponsiveSymmetrical;
