import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Button, ButtonLink, ControlButton, Icon } from '@alma-oss/spirit-web-react';

export const MyComponent = () => (
  <>
    <Button>
      <Icon name="hamburger" marginRight="space-400" />
      Menu
    </Button>
    <Button>
      <Icon name="hamburger" marginRight={{ mobile: 'space-400', tablet: 'space-0' }} />
      Menu
    </Button>
    <Button>
      <Icon name="hamburger" marginLeft="space-400" />
      Menu
    </Button>
    <Button>
      <Icon name="hamburger" marginX="space-400" />
      Menu
    </Button>
    <Button>
      <Icon name="hamburger" marginRight="space-600" />
      Menu
    </Button>
    <Button>
      <Icon name="hamburger" marginRight={{ mobile: 'space-600', tablet: 'space-800' }} />
      Menu
    </Button>
    <Button>
      <Icon name="hamburger" marginRight={{ mobile: 'space-400', tablet: 'space-0' }} />
      Menu
    </Button>
    <ButtonLink href="#">
      <Icon name="link" marginRight="space-400" />
      Link
    </ButtonLink>
    <ButtonLink href="#">
      <Icon name="link" marginRight="space-800" />
      Link
    </ButtonLink>
    <ControlButton>
      <Icon name="close" marginRight="space-400" />
    </ControlButton>
    <ControlButton>
      <Icon name="close" marginRight="space-600" />
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
