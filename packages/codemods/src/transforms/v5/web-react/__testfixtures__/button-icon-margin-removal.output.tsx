import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Button, ButtonLink, ControlButton, Icon } from '@alma-oss/spirit-web-react';

export const MyComponent = () => (
  <>
    <Button>
      <Icon name="hamburger" />
      Menu
    </Button>
    <Button
      spacing={{
        mobile: "space-400",
        tablet: "space-0"
      }}>
      <Icon name="hamburger" />
      Menu
    </Button>
    <Button>
      <Icon name="hamburger" />
      Menu
    </Button>
    <Button>
      <Icon name="hamburger" />
      Menu
    </Button>
    <Button spacing="space-600">
      <Icon name="hamburger" />
      Menu
    </Button>
    <Button
      spacing={{
        mobile: "space-600",
        tablet: "space-800"
      }}>
      <Icon name="hamburger" />
      Menu
    </Button>
    <Button
      spacing={{
        mobile: "space-400",
        tablet: "space-0"
      }}>
      <Icon name="hamburger" />
      Menu
    </Button>
    <ButtonLink href="#">
      <Icon name="link" />
      Link
    </ButtonLink>
    <ButtonLink href="#" spacing="space-800">
      <Icon name="link" />
      Link
    </ButtonLink>
    <ControlButton>
      <Icon name="close" />
    </ControlButton>
    <ControlButton spacing="space-600">
      <Icon name="close" />
    </ControlButton>
    <Button>
      <Icon name="hamburger" />
      Menu
    </Button>
    <div>
      <Icon name="hamburger" marginRight="space-400" />
    </div>
  </>
);
