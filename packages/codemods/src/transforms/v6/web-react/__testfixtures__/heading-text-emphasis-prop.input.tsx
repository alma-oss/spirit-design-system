import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Heading, Text } from '@alma-oss/spirit-web-react';

const dynamicEmphasis = 'bold';

export const Example = () => (
  <>
    <Heading emphasis="semibold">Heading</Heading>
    <Heading emphasis="italic">Italic heading</Heading>
    <Heading emphasis="bold" fontWeight="regular">
      Explicit heading
    </Heading>
    <Text emphasis="bold">Text</Text>
    <Text emphasis={'italic'}>Italic text</Text>
    <Text emphasis="italic" isItalic>
      Already italic text
    </Text>
    <Text emphasis={dynamicEmphasis}>Dynamic text</Text>
  </>
);
