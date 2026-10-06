'use client';

import { ButtonLink, Flex, Grid, GridItem, Heading, Stack, Text } from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

// The heading with the description take 5 of the 12 columns, the action button is aligned to the right edge.
const SectionHeader = ({ title, description, actionLabel, actionHref }: SectionHeaderProps) => (
  <Grid cols={{ mobile: 1, tablet: 12 }} spacingX="space-800" spacingY="space-900">
    <GridItem columnStart={{ tablet: 1 }} columnEnd={{ tablet: 6 }} UNSAFE_className={styles.Item}>
      <Stack spacing="space-900">
        <Heading elementType="h2" size="large" marginBottom="space-0">
          {title}
        </Heading>
        <Text marginBottom="space-0">{description}</Text>
      </Stack>
    </GridItem>
    <GridItem columnStart={{ tablet: 6 }} columnEnd={{ tablet: 13 }} UNSAFE_className={styles.Item}>
      <Flex alignmentX={{ mobile: 'left', tablet: 'right' }}>
        <ButtonLink elementType={NextLink} href={actionHref} color="secondary">
          {actionLabel}
        </ButtonLink>
      </Flex>
    </GridItem>
  </Grid>
);

export default SectionHeader;
