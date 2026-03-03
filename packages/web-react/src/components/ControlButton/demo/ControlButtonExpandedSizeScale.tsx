import React, { Fragment } from 'react';
import { SizesExtended } from '../../../constants';
import { Box } from '../../Box';
import { Flex } from '../../Flex';
import { Icon } from '../../Icon';
import ControlButton from '../ControlButton';

const sizes = Object.values(SizesExtended);

const ControlButtonExpandedSizeScale = () => (
  <div className="spirit-feature-enable-v5-control-button-expanded-size-scale">
    <Box
      alignmentX={{ mobile: 'center', tablet: 'left' }}
      alignmentY="center"
      backgroundColor="primary"
      elementType={Flex}
      padding="space-800"
    >
      {sizes.map((size) => (
        <Fragment key={`${size}-subtle`}>
          <ControlButton size={size} isSymmetrical isSubtle aria-label="Close dialog">
            <Icon name="close" />
          </ControlButton>
        </Fragment>
      ))}
      {sizes.map((size) => (
        <Fragment key={`${size}-bordered`}>
          <ControlButton size={size} isSymmetrical aria-label="Close dialog">
            <Icon name="close" />
          </ControlButton>
        </Fragment>
      ))}
    </Box>
  </div>
);

export default ControlButtonExpandedSizeScale;
