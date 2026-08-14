import React from 'react';
import Text from '../Text';

const TextEmphasis = () => (
  <>
    <Text>Text regular</Text>
    <Text fontWeight="semibold">Text semibold</Text>
    <Text fontWeight="bold">Text bold</Text>
    <Text isItalic>Text regular italic</Text>
    <Text fontWeight="semibold" isItalic>
      Text semibold italic
    </Text>
    <Text fontWeight="bold" isItalic>
      Text bold italic
    </Text>
    <Text isItalic>Text italic</Text>
  </>
);

export default TextEmphasis;
