import { Flex, Grid, GridItem, Heading, Stack, Text } from '@alma-oss/spirit-web-react';
import Eyebrow from '@local/domains/homepage/Eyebrow';
import homepageStyles from '@local/domains/homepage/Hero.module.scss';
import PageSection from '@local/domains/homepage/PageSection';
import styles from './DesignHero.module.scss';
import ExploreMoreButton from './ExploreMoreButton';
import TokenMarquee from './TokenMarquee';

const DesignHero = () => (
  <PageSection
    size="large"
    paddingBottom="small"
    hasRails={false}
    className={`${homepageStyles.Hero} ${styles.Hero}`}
    backgroundColor="primary"
  >
    <Flex direction="vertical" alignmentX="center" spacing="space-1300" UNSAFE_className={styles.Content}>
      <Grid cols={{ mobile: 1, tablet: 12 }}>
        <GridItem columnStart={{ tablet: 3 }} columnEnd={{ tablet: 11 }} UNSAFE_className={homepageStyles.Intro}>
          <Flex direction="vertical" alignmentX="center" spacing="space-1000">
            <Stack spacing="space-500">
              <Eyebrow isCentered>DESIGN</Eyebrow>
              <Heading elementType="h2" size="xlarge" textAlignment="center" marginBottom="space-0">
                Principles that shape every pixel.
              </Heading>
            </Stack>

            <Text size="large" textColor="secondary" textAlignment="center" marginBottom="space-0">
              Explore the principles, thinking, and decisions that shape our approach to design. Discover how we create
              consistent, purposeful, and inclusive experiences across Alma Career products.
            </Text>

            <ExploreMoreButton />
          </Flex>
        </GridItem>
      </Grid>

      <TokenMarquee />
    </Flex>
  </PageSection>
);

export default DesignHero;
