import {
  ButtonLink,
  Card,
  CardBody,
  CardEyebrow,
  CardFooter,
  CardLink,
  CardMedia,
  CardTitle,
  Text,
} from '@alma-oss/spirit-web-react';
import React from 'react';

const cardMediaCanvasStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: 'var(--spirit-color-accent-01-background-subtle)',
  backgroundImage: `radial-gradient(
      at 15% 20%,
      color-mix(in srgb, var(--spirit-color-accent-02-background-basic) 55%, transparent) 0,
      transparent 60%
    ),
    radial-gradient(
      at 85% 15%,
      color-mix(in srgb, var(--spirit-color-accent-03-background-basic) 50%, transparent) 0,
      transparent 60%
    ),
    radial-gradient(
      at 80% 85%,
      color-mix(in srgb, var(--spirit-color-accent-04-background-basic) 55%, transparent) 0,
      transparent 60%
    ),
    radial-gradient(
      at 20% 90%,
      color-mix(in srgb, var(--spirit-color-accent-01-background-basic) 45%, transparent) 0,
      transparent 65%
    )`,
};

const CardPreview = () => (
  <div style={{ width: 480 }}>
    <Card direction="horizontal" isBoxed>
      <CardMedia hasFilledHeight size="medium">
        <div style={cardMediaCanvasStyle} />
      </CardMedia>
      <CardBody>
        <CardEyebrow>Eyebrow</CardEyebrow>
        <CardTitle>
          <CardLink href="#">Card label</CardLink>
        </CardTitle>
        <Text>A short description of the card content.</Text>
      </CardBody>
      <CardFooter alignmentX="left">
        <ButtonLink href="#" color="primary" size="small">
          Primary
        </ButtonLink>
        <ButtonLink href="#" color="secondary" size="small">
          Secondary
        </ButtonLink>
      </CardFooter>
    </Card>
  </div>
);

export default CardPreview;
