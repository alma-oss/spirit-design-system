import React from 'react';
import { CloseButton } from '../../CloseButton';
import { Flex } from '../../Flex';
import { UNSTABLE_Tile } from '..';

const TileCustomBackground = () => (
  <>
    <UNSTABLE_Tile>
      <Flex alignmentX="space-between" alignmentY="center">
        <div>Default surface</div>
        <CloseButton />
      </Flex>
    </UNSTABLE_Tile>
    <UNSTABLE_Tile backgroundColor="secondary">
      <Flex alignmentX="space-between" alignmentY="center">
        <div>Secondary background</div>
        <CloseButton />
      </Flex>
    </UNSTABLE_Tile>
    <UNSTABLE_Tile backgroundColor="tertiary">
      <Flex alignmentX="space-between" alignmentY="center">
        <div>Tertiary background</div>
        <CloseButton />
      </Flex>
    </UNSTABLE_Tile>
  </>
);

export default TileCustomBackground;
