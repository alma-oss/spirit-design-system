import React from 'react';
import { UNSTABLE_Tile } from '..';

const TilePadding = () => (
  <>
    <UNSTABLE_Tile padding="space-1200">Uniform padding</UNSTABLE_Tile>
    <UNSTABLE_Tile paddingX="space-1200" paddingY="space-600">
      Padding per axis
    </UNSTABLE_Tile>
    <UNSTABLE_Tile padding={{ mobile: 'space-600', tablet: 'space-1000', desktop: 'space-1200' }}>
      Responsive padding
    </UNSTABLE_Tile>
  </>
);

export default TilePadding;
