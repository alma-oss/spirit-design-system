import React from 'react';
import { AlignmentY } from '../../../constants';
import { Grid } from '../../Grid';
import { IconBox } from '../../IconBox';
import Card from '../Card';
import CardArtwork from '../CardArtwork';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardTitle from '../CardTitle';

const CardAlignment = () => (
  <Grid cols={{ mobile: 1, desktop: 3 }}>
    {Object.values(AlignmentY).map((alignmentY) => (
      <Card key={alignmentY} direction="horizontal" alignmentY={alignmentY} isBoxed>
        <CardArtwork>
          <IconBox iconName="file" />
        </CardArtwork>
        <CardBody>
          <CardEyebrow>Card alignment</CardEyebrow>
          <CardTitle isHeading>Alignment {alignmentY}</CardTitle>
          <p>Lorem ipsum dolor sit amet.</p>
        </CardBody>
      </Card>
    ))}
  </Grid>
);

export default CardAlignment;
