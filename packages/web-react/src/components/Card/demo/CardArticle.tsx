import React from 'react';
import { Grid } from '../../Grid';
import { Stack } from '../../Stack';
import { Truncate } from '../../Truncate';
import Card from '../Card';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardLink from '../CardLink';
import CardMedia from '../CardMedia';
import CardTitle from '../CardTitle';

const CardArticle = () => (
  <Grid cols={{ mobile: 1, tablet: 2 }}>
    <Card direction="horizontal" alignmentY="center">
      <CardMedia size="medium" isExpanded>
        <img src="https://picsum.photos/id/200/180/180" alt="" />
      </CardMedia>
      <CardBody>
        <Stack spacing="space-400">
          <CardEyebrow>Eyebrow</CardEyebrow>
          <CardTitle>
            <CardLink href="/article-123">Article Title</CardLink>
          </CardTitle>
          <Truncate limit={3}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. dolor sit amet
          </Truncate>
          <div className="link-primary">Read more</div>
        </Stack>
      </CardBody>
    </Card>
  </Grid>
);

export default CardArticle;
