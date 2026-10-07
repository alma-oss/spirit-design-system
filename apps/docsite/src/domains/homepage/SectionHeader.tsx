'use client';

import { ButtonLink, Flex, Grid, GridItem, Heading, Stack, Text } from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';
import Eyebrow from './Eyebrow';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  /** The short label above the title. */
  eyebrow?: string;
  title: string;
  description: string;
  /** The size of the description, the large one is used with the eyebrow. */
  descriptionSize?: 'medium' | 'large';
  actionLabel: string;
  actionHref: string;
}

// The heading with the description take 5 of the 12 columns, the action button is aligned to the right edge.
const SectionHeader = ({
  eyebrow = undefined,
  title,
  description,
  descriptionSize = 'medium',
  actionLabel,
  actionHref,
}: SectionHeaderProps) => (
  <Grid cols={{ mobile: 1, tablet: 12 }} spacingX="space-800" spacingY="space-900">
    <GridItem columnStart={{ tablet: 1 }} columnEnd={{ tablet: 6 }} UNSAFE_className={styles.Item}>
      <Stack spacing={eyebrow ? 'space-800' : 'space-900'}>
        <Stack spacing="space-500">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Heading elementType="h2" size="large" marginBottom="space-0">
            {title}
          </Heading>
        </Stack>
        <Text size={descriptionSize} textColor={eyebrow ? 'secondary' : undefined} marginBottom="space-0">
          {description}
        </Text>
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
