import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Heading, Text } from '@alma-oss/spirit-web-react';

const dynamicEmphasis = 'bold';

export const Example = () => (
  <>
    <Heading fontWeight="semibold">Heading</Heading>
    <Heading fontWeight="regular" isItalic>Italic heading</Heading>
    <Heading fontWeight="regular">
      Explicit heading
    </Heading>
    <Text fontWeight="bold">Text</Text>
    <Text isItalic>Italic text</Text>
    <Text isItalic>
      Already italic text
    </Text>
    <Text emphasis={dynamicEmphasis}>Dynamic text</Text>
  </>
);
