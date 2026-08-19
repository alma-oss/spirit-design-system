import React, { type ReactNode } from 'react';
import {
  Box,
  Button,
  Card,
  CardArtwork,
  CardBody,
  CardLink,
  CardTitle,
  ControlButton,
  Divider,
  FileUpload,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  Navigation,
  NavigationAction,
  NavigationItem,
  Section,
  Stack,
  Text,
} from '../../../src/components';
import { type SpaceToken } from '../../../src/types';
import IllustrationPublished from './illustrationPublished';

const CV_SECTIONS = [
  'Pracovní zkušenosti',
  'Vzdělání',
  'Jazyky',
  'O mně',
  'Dovednosti',
  // Typo kept from the Figma design ("Certifikáty").
  'Cerifikáty a školení',
  'Řidičský průkaz',
  'Odkazy',
  'Zájmy a koníčky',
];

const MENU_ITEMS = [
  { iconName: 'visibility-on', label: 'Náhled životopisu' },
  // `Icons/Flag CZ Colored` is not part of the Spirit icon set.
  { iconName: 'placeholder', label: 'Změnit jazyk životopisu' },
  { iconName: 'download', label: 'Stáhnout životopis' },
  // `Icons/Delete` is not part of the Spirit icon set.
  { iconName: 'placeholder', label: 'Smazat životopis' },
];

/**
 * The white surface shared by all four panels of the page: background `primary`, 1px `basic` border,
 * `radius-300` and `space-800` padding. The design also carries a static `shadow-100`, which has no
 * Spirit prop (Card applies it on hover only), so it is left out.
 */
const Panel = ({ children, spacing = 'space-900' }: { children: ReactNode; spacing?: SpaceToken }) => (
  <Box
    elementType={Flex}
    direction="vertical"
    alignmentX="stretch"
    spacing={spacing}
    backgroundColor="primary"
    borderColor="basic"
    borderRadius="300"
    borderWidth="100"
    padding="space-800"
  >
    {children}
  </Box>
);

export default {
  title: 'Examples/Pages',
  parameters: {
    layout: 'fullscreen',
  },
};

export const CvEditor = () => (
  <Section size="small" backgroundColor="secondary" containerProps={{ size: 'large' }}>
    <Grid cols={12} spacing="space-1000" alignmentY="top">
      <GridItem columnStart={{ mobile: 'span 12', desktop: 'span 8' }}>
        <Stack spacing="space-1000">

          <Card isBoxed>
            <Flex alignmentX="space-between" alignmentY="center" spacing="space-900" marginBottom="space-900">
              <Heading elementType="h2" size="small" emphasis="semibold" marginBottom="space-0">
                Osobní údaje
              </Heading>
              <ControlButton size="large" isSymmetrical aria-label="Další možnosti">
                <Icon name="more" />
              </ControlButton>
            </Flex>
            <Stack spacing="space-300">
              <Text emphasis="semibold" marginBottom="space-0">
                Jirik Bárta
              </Text>
              <Text size="small" marginBottom="space-0">
                email@gmail.com
              </Text>
              <Text size="small" textColor="secondary" marginBottom="space-0">
                Telefonní číslo nebylo vyplněno
              </Text>
              <Text size="small">Brno</Text>
            </Stack>
          </Card>

          <Card isBoxed>
            <Flex alignmentX="space-between" alignmentY="center" spacing="space-900" marginBottom="space-900">
              <Heading elementType="h2" size="small" emphasis="semibold" marginBottom="space-0">
                Fotka
              </Heading>
            </Flex>
            <Text textColor="secondary">
              Přidejte svoji fotografii. Životopis s fotkou působí osobněji a víc zaujme.
            </Text>
            <FileUpload
              id="cv-photo"
              name="cv-photo"
              label="Fotka"
              isLabelHidden
              isCompact
              inputUploadText="Nahrajte nebo přetáhněte soubor"
              helperText="Maximální velikost souboru 2 MB"
              buttonText="Procházet"
            />
          </Card>

          <Text textColor="secondary">Přidejte si do životopisu další informace, které jsou pro vás důležité.</Text>

          <Grid cols={1} spacing="space-700">
            {CV_SECTIONS.map((section) => (
              <Card key={section} direction="horizontal-reversed" isBoxed>
                {/* Artwork first, as in the Card demos — `CardBody:not(:last-child)` would pick up a 20px gap margin. */}
                <CardArtwork>
                  <Icon name="add" />
                </CardArtwork>
                <CardBody>
                  <CardTitle elementType="h3">
                    <CardLink href="#">{section}</CardLink>
                  </CardTitle>
                </CardBody>
              </Card>
            ))}
          </Grid>

        </Stack>
      </GridItem>

      <GridItem columnStart={{ mobile: 'span 12', desktop: 'span 4' }}>
        <Flex direction="vertical" alignmentX="stretch" spacing="space-1000">
          <Panel spacing="space-800">
            <Flex alignmentX="center">
              <IllustrationPublished />
            </Flex>
            <Flex direction="vertical" alignmentX="stretch" spacing="space-600">
              <Flex direction="vertical" alignmentX="stretch" spacing="space-400">
                <Heading elementType="h2" size="small" emphasis="semibold" marginBottom="space-0">
                  Získejte nabídky bez hledání
                </Heading>
                <Text textColor="secondary">
                  Vystavením životopisu vás mohou oslovit firmy, které právě hledají někoho s vašimi zkušenostmi.
                </Text>
              </Flex>
              <Link href="#" color="secondary" underlined="always">
                Jak to funguje?
              </Link>
            </Flex>
            <Divider marginBottom="space-0" />
            <Text textColor="secondary" textAlignment="center">
              Váš životopis není vystavený
            </Text>
            <Flex alignmentX="stretch">
              <Button>Vystavit pro firmy</Button>
            </Flex>
          </Panel>

          <Box
            backgroundColor="primary"
            borderColor="basic"
            borderRadius="300"
            borderWidth="100"
            padding="space-800"
          >
            <Navigation direction="vertical" aria-label="Správa životopisu">
              {MENU_ITEMS.map(({ iconName, label }) => (
                <NavigationItem key={label}>
                  <NavigationAction href="#" variant="pill" startSlot={<Icon name={iconName} />}>
                    {label}
                  </NavigationAction>
                </NavigationItem>
              ))}
            </Navigation>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  </Section>
);
