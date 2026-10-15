'use client';

import { Card, CardArtwork, CardBody, CardTitle, Grid, Icon, Link, Stack, Text } from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';

export interface Feature {
  title: string;
  description: string;
  href: string;
}

interface FeatureGridProps {
  features: Feature[];
}

const FeatureGrid = ({ features }: FeatureGridProps) => (
  <Grid cols={{ mobile: 1, tablet: 2 }} spacingX="space-1000" spacingY="space-1100">
    {features.map(({ title, description, href }) => (
      <Card key={title} direction="horizontal">
        <CardArtwork>
          <Icon name="placeholder" color="selected" boxSize={32} />
        </CardArtwork>
        <CardBody>
          <Stack spacing="space-600">
            <Stack spacing="space-500">
              <CardTitle>{title}</CardTitle>
              <Text textColor="secondary">{description}</Text>
            </Stack>
            <Link elementType={NextLink} href={href}>
              Learn more
            </Link>
          </Stack>
        </CardBody>
      </Card>
    ))}
  </Grid>
);

export default FeatureGrid;
