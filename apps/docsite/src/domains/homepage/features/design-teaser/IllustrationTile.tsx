'use client';

import { Box, Flex } from '@alma-oss/spirit-web-react';
import { useState } from 'react';
import HoverLottie from '../../ui/HoverLottie';
import AssetCaption from './AssetCaption';
import { ASSETS_PATH } from './constants';

export interface Illustration {
  /** A static illustration, exported from the design. */
  src?: string;
  /** Path to a Lottie animation in the `public` folder, it plays once on hover. */
  animation?: string;
}

interface IllustrationTileProps extends Illustration {
  caption: string;
}

const IllustrationTile = ({ caption, src = undefined, animation = undefined }: IllustrationTileProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      borderRadius="400"
      padding="space-600"
      UNSAFE_className="AssetGroups__tile"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex direction="vertical" alignmentX="center" spacing="space-700">
        <div className="AssetGroups__illustration">
          {animation ? (
            <HoverLottie path={animation} isHovered={isHovered} className="AssetGroups__image" />
          ) : (
            <img className="AssetGroups__image" src={`${ASSETS_PATH}/illustrations/${src}`} alt="" />
          )}
        </div>
        <AssetCaption>{caption}</AssetCaption>
      </Flex>
    </Box>
  );
};

export default IllustrationTile;
