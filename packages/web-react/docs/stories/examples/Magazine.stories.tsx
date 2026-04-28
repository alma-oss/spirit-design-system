import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardEyebrow,
  CardLink,
  CardMedia,
  CardTitle,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Section,
  Tag,
  Text,
} from '../../../src/components';

export default {
  title: 'Examples/Layout Templates/Magazine',
  tags: ['!autodocs'],
  parameters: {
    controls: { disable: true },
  },
};

export const WithCards = () => (
  <Section size="xlarge" hasContainer={false}>
    <Flex direction="vertical" spacing="space-1400" alignmentX="stretch">
      <Container>
        <Box UNSAFE_style={{ maxWidth: '696px' }}>
          <Flex direction="vertical" spacing="space-700" alignmentX="left">
            <Tag isSubtle size="small">
              Small Tag
            </Tag>
            <Flex direction="vertical" spacing="space-900" alignmentX="left">
              <Heading elementType="h1" size="large" marginBottom="space-0">
                Spirit Design System
              </Heading>
              <Text size="large" textColor="secondary">
                Our mission is to develop a comprehensive design system that can swiftly adapt to any business or
                technological demands, thereby preventing the redundancy of steps when establishing new frontends.
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Container>

      <Container>
        <Flex direction="vertical" spacing="space-1100" alignmentX="stretch">
          <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} spacing="space-1000">
            <Card>
              <CardMedia>
                <img src="https://picsum.photos/seed/magazine1/600/360" alt="" />
              </CardMedia>
              <CardBody>
                <CardEyebrow>Brow Styling Techniques</CardEyebrow>
                <CardTitle isHeading>
                  <CardLink href="#">Exploring the Spirit Design System: A Guide to Modern UI Design</CardLink>
                </CardTitle>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor.</p>
              </CardBody>
            </Card>

            <Card>
              <CardMedia>
                <img src="https://picsum.photos/seed/magazine2/600/360" alt="" />
              </CardMedia>
              <CardBody>
                <CardEyebrow>Eyebrow Innovations</CardEyebrow>
                <CardTitle isHeading>
                  <CardLink href="#">Unveiling the Spirit Design System: Crafting Seamless User Experiences</CardLink>
                </CardTitle>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor.</p>
              </CardBody>
            </Card>

            <Card>
              <CardMedia>
                <img src="https://picsum.photos/seed/magazine3/600/360" alt="" />
              </CardMedia>
              <CardBody>
                <CardEyebrow>Perfecting Your Eyebrows</CardEyebrow>
                <CardTitle isHeading>
                  <CardLink href="#">Crafting Seamless User Experiences</CardLink>
                </CardTitle>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor.</p>
              </CardBody>
            </Card>

            <Card>
              <CardMedia>
                <img src="https://picsum.photos/seed/magazine4/600/360" alt="" />
              </CardMedia>
              <CardBody>
                <CardEyebrow>Perfecting Your Eyebrows</CardEyebrow>
                <CardTitle isHeading>
                  <CardLink href="#">Crafting Seamless User Experiences</CardLink>
                </CardTitle>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor.</p>
              </CardBody>
            </Card>
          </Grid>

          <Flex alignmentX="space-between" alignmentY="center">
            <Button color="secondary" size="large">
              Button
            </Button>
            <Flex spacing="space-300" alignmentY="center">
              <Button isSymmetrical color="secondary" size="large">
                <Icon name="placeholder" />
              </Button>
              <Button isSymmetrical color="secondary" size="large">
                <Icon name="placeholder" />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  </Section>
);
