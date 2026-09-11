import React from 'react';
import {
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
  GridItem,
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
        {/* Header spans 7 of the 12 columns, which is the 696px width used in Figma */}
        <Grid cols={12} spacing="space-1000">
          <GridItem columnEnd={{ mobile: 'span 12', desktop: 'span 7' }}>
            <Flex direction="vertical" spacing="space-700" alignmentX="left">
              <Tag isSubtle size="small">
                Label
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
          </GridItem>
        </Grid>
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
                <p>
                  In this piece, we delve into the fascinating world of user-centered design and its importance in
                  creating effective software.
                </p>
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
                <p>
                  Welcome to our article! Here, we explore the intricacies of design and its impact on user experience.
                </p>
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
                <p>
                  Join us as we discuss the key principles of user experience design and how they can enhance your
                  projects.
                </p>
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
                <p>
                  Join us as we discuss the key principles of user experience design and how they can enhance your
                  projects.
                </p>
              </CardBody>
            </Card>
          </Grid>

          <Flex alignmentX="space-between" alignmentY="center">
            <Button color="secondary" size="large">
              Button
            </Button>
            <Flex spacing="space-600" alignmentY="center">
              <Button isSymmetrical color="secondary" size="large" aria-label="Previous">
                <Icon name="chevron-left" />
              </Button>
              <Button isSymmetrical color="secondary" size="large" aria-label="Next">
                <Icon name="chevron-right" />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  </Section>
);
