import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Flex } from '@alma-oss/spirit-web-react';

export const MyComponent = () => (
  <>
    <Flex>Flex</Flex>
    <Flex direction="horizontal">Flex</Flex>
    <Flex direction="vertical">Flex</Flex>
    <Flex direction={{ mobile: 'horizontal', tablet: 'vertical' }}>Flex</Flex>
  </>
);
