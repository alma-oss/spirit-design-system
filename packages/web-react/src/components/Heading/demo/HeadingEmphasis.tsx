import React from 'react';
import Heading from '../Heading';

const HeadingEmphasis = () => (
  <>
    <Heading elementType="h2" fontWeight="regular">
      Heading regular
    </Heading>
    <Heading elementType="h2" fontWeight="semibold">
      Heading semibold
    </Heading>
    <Heading elementType="h2">Heading bold</Heading>
    <Heading elementType="h2" fontWeight="regular" isItalic>
      Heading regular italic
    </Heading>
    <Heading elementType="h2" fontWeight="semibold" isItalic>
      Heading semibold italic
    </Heading>
    <Heading elementType="h2" isItalic>
      Heading bold italic
    </Heading>
    <Heading elementType="h2" fontWeight="regular" isItalic>
      Heading italic
    </Heading>
  </>
);

export default HeadingEmphasis;
