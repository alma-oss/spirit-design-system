import React from 'react';
import { Stack } from '../../Stack';
import { UNSTABLE_Tile } from '..';

const TileComposition = () => (
  <>
    <UNSTABLE_Tile>
      <Stack spacing="space-600">
        <div>First block</div>
        <div>Second block</div>
        <div>Third block</div>
      </Stack>
    </UNSTABLE_Tile>
    <UNSTABLE_Tile>
      <div>First block</div>
      <div>Second block</div>
      <div>Third block</div>
    </UNSTABLE_Tile>
  </>
);

export default TileComposition;
