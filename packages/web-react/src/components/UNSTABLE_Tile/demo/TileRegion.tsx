import React from 'react';
import { UNSTABLE_Tile } from '..';

const TileRegion = () => (
  <UNSTABLE_Tile elementType="section" aria-labelledby="tile-region-heading">
    <h3 id="tile-region-heading">Personal details</h3>
    <p>A tile becomes a named region only when it carries its own heading and an accessible name.</p>
  </UNSTABLE_Tile>
);

export default TileRegion;
