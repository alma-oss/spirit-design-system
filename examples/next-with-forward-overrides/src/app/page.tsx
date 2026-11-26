import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Container,
  Flex,
  Grid,
  Heading,
  Tag,
  Text,
} from '@alma-oss/spirit-web-react';
import { NextPage } from 'next';

const THEMES = ['theme-light-default', 'theme-light-on-brand'] as const;
const CARDS = ['First', 'Second', 'Third'];

const Home: NextPage = () => (
  <Container>
    <Heading elementType="h1" size="large" marginY="space-1000">
      Spirit with <code>@forward with</code> token overrides
    </Heading>
    <Flex direction="vertical" spacing="space-800" marginBottom="space-1000">
      {THEMES.map((theme) => (
        <Box key={theme} theme={theme} backgroundColor="primary" padding="space-800" borderRadius="300">
          <Flex direction="vertical" spacing="space-700">
            <Heading elementType="h2" size="small">
              {theme}
            </Heading>
            <Flex alignmentY="center" spacing="space-500" isWrapping>
              <Button>Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Tag color="success" isSubtle>
                Success
              </Tag>
              <Tag color="danger">Danger</Tag>
            </Flex>
            <Grid cols={{ mobile: 1, tablet: 3 }}>
              {CARDS.map((title) => (
                <Card key={title} isBoxed>
                  <CardBody>
                    <CardTitle isHeading>{title} card</CardTitle>
                    <Text>One column below the overridden 64rem tablet breakpoint, three above it.</Text>
                  </CardBody>
                  <CardFooter>
                    <Button>Apply</Button>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Flex>
        </Box>
      ))}
    </Flex>
  </Container>
);

export default Home;
