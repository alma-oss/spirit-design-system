import React from 'react';
import { ControlButton } from '../../ControlButton';
import { Flex } from '../../Flex';
import { Icon } from '../../Icon';
import { UNSTABLE_Tile } from '..';

const TileCustomBackground = () => (
  <>
    <UNSTABLE_Tile>
      <Flex alignmentX="space-between" alignmentY="center">
        <div>Default surface</div>
        <ControlButton isSymmetrical aria-label="Close">
          <Icon name="close" />
        </ControlButton>
      </Flex>
    </UNSTABLE_Tile>
    <UNSTABLE_Tile UNSAFE_className="bg-secondary">
      <Flex alignmentX="space-between" alignmentY="center">
        <div>Secondary background from a utility class</div>
        <ControlButton isSymmetrical aria-label="Close">
          <Icon name="close" />
        </ControlButton>
      </Flex>
    </UNSTABLE_Tile>
    <UNSTABLE_Tile UNSAFE_className="bg-tertiary">
      <Flex alignmentX="space-between" alignmentY="center">
        <div>Tertiary background from a utility class</div>
        <ControlButton isSymmetrical aria-label="Close">
          <Icon name="close" />
        </ControlButton>
      </Flex>
    </UNSTABLE_Tile>
  </>
);

export default TileCustomBackground;
