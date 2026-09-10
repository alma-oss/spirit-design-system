import React from 'react';
import { Box, Card, CardBody, CardLink, CardTitle, Flex, Grid, Heading, Section, Text } from '../../../src/components';

export default {
  title: 'Examples/Layout Templates/Hero',
  tags: ['!autodocs'],
  parameters: {
    controls: { disable: true },
  },
};

const heroImage = 'https://picsum.photos/seed/hero-banner/1200/460';

export const WithCards = () => (
  <Section size="xlarge">
    <Flex direction="vertical" spacing="space-1400" alignmentX="stretch" alignmentY="top">
      {/* Top row: heading + hero image, 6 + 6 of the 12 column grid */}
      <Grid cols={2} spacing="space-1000" alignmentY="center">
        {/* Left: heading and subtitle */}
        <Box paddingRight={{ mobile: 'space-0', desktop: 'space-1000' }}>
          <Flex direction="vertical" spacing="space-900" alignmentY="top">
            <Heading elementType="h1" size="xlarge" fontWeight="semibold" marginBottom="space-0">
              With us,
              <br />
              you&apos;ll find a company that suits you.
            </Heading>
            <Text elementType="p" size="xlarge" textColor="secondary">
              Browse verified company reviews from employees and use the company compass to find out where your
              interests lie.
            </Text>
          </Flex>
        </Box>

        {/* Right: hero image */}
        <Box borderRadius="300" UNSAFE_style={{ overflow: 'hidden' }}>
          <img
            src={heroImage}
            alt=""
            style={{ display: 'block', width: '100%', height: '460px', objectFit: 'cover' }}
          />
        </Box>
      </Grid>

      {/* Bottom row: 3 feature cards */}
      <Grid cols={{ mobile: 1, desktop: 3 }} spacing="space-1000">
        <Card isBoxed>
          <CardBody>
            <CardTitle isHeading>
              <CardLink href="#">View offers</CardLink>
            </CardTitle>
            <p>Find a job that you will enjoy and a fair employer</p>
          </CardBody>
        </Card>

        <Card isBoxed>
          <CardBody>
            <CardTitle isHeading>
              <CardLink href="#">Find the ideal company</CardLink>
            </CardTitle>
            <p>Browse the company directory and find the one that is just right for you.</p>
          </CardBody>
        </Card>

        <Card isBoxed>
          <CardBody>
            <CardTitle isHeading>
              <CardLink href="#">Rate companies</CardLink>
            </CardTitle>
            <p>With ratings, you and others can browse only the companies that are worth it.</p>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  </Section>
);
