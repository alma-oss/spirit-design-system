import { Flex, Pill } from '@alma-oss/spirit-web-react';
import React from 'react';

const PillPreview = () => (
  <Flex alignmentY="center" spacingX="space-600">
    <Pill color="selected">3</Pill>
    <Pill color="danger">99</Pill>
    <Pill color="informative">+3</Pill>
  </Flex>
);

export default PillPreview;
