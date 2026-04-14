import React from 'react';
import { DocsStack } from '../../../../docs';
import { Box } from '../../Box';
import { Flex } from '../../Flex';
import { Icon } from '../../Icon';
import ControlButton from '../ControlButton';

const ControlButtonDisabled = () => (
  <DocsStack stackAlignment="start">
    <h3>Color Scheme on Parent</h3>

    <Box
      elementType={Flex}
      alignmentX={{ mobile: 'center', tablet: 'left' }}
      alignmentY="center"
      colorScheme="disabled"
      padding="space-800"
    >
      <ControlButton isSymmetrical isDisabled aria-label="Previous">
        <Icon name="chevron-left" />
      </ControlButton>

      <Box marginX="space-400" elementType="span">
        Disabled content
      </Box>

      <ControlButton isSymmetrical isDisabled aria-label="Next">
        <Icon name="chevron-right" />
      </ControlButton>
    </Box>

    <h3>Color Scheme on Component</h3>

    <Box elementType={Flex} alignmentX={{ mobile: 'center', tablet: 'left' }} alignmentY="center">
      <ControlButton isSymmetrical isSubtle isDisabled aria-label="Close" UNSAFE_className="color-scheme-on-disabled">
        <Icon name="close" />
      </ControlButton>

      <ControlButton isSymmetrical isDisabled aria-label="Close" UNSAFE_className="color-scheme-on-disabled">
        <Icon name="close" />
      </ControlButton>
    </Box>
  </DocsStack>
);

export default ControlButtonDisabled;
