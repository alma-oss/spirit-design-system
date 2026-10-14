'use client';

import { Avatar, Flex, Icon } from '@alma-oss/spirit-web-react';
import React from 'react';

const AvatarPreview = () => (
  <Flex alignmentY="center" direction="horizontal" spacingX="space-600">
    <Avatar aria-label="Profile of Jiří Bárta" size="medium">
      <Icon name="profile" />
    </Avatar>
    <Avatar aria-label="Profile of Jiří Bárta" size="medium">
      <span aria-hidden="true">JB</span>
    </Avatar>
    <Avatar aria-label="Profile of Jiří Bárta" size="medium">
      {/* The preview uses the same demo portrait as the Avatar docs. It is not a page image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Jiří Bárta" aria-hidden="true" src="https://picsum.photos/id/823/162/162" />
    </Avatar>
  </Flex>
);

export default AvatarPreview;
