import React, { type ReactNode, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardArtwork,
  CardBody,
  CardFooter,
  CardLink,
  CardTitle,
  ControlButton,
  Dropdown,
  DropdownPopover,
  DropdownTrigger,
  FileUpload,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Item,
  Link,
  Navigation,
  NavigationAction,
  NavigationItem,
  Section,
  Stack,
  Text,
  VisuallyHidden,
} from '../../../src/components';
import { type SpaceToken } from '../../../src/types';
import IllustrationPublished from './illustrationPublished';

const CV_SECTIONS = [
  'Pracovní zkušenosti',
  'Vzdělání',
  'Jazyky',
  'O mně',
  'Dovednosti',
  'Certifikáty a školení',
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
 * The white surface shared by all panels of the page: background `primary`, 1px `basic` border,
 * `radius-300` and `space-800` padding. The design also carries a static `shadow-100`, which has no
 * Spirit prop (Card applies it on hover only), so it is left out.
 *
 * `elementType`/`ariaLabelledby` pick the outer surface's semantics; the inner Flex only handles layout,
 * since Box can't carry both a custom tag and Flex's gap-based spacing at once.
 *
 * @param root0
 * @param root0.children
 * @param root0.spacing
 * @param root0.elementType
 * @param root0.ariaLabelledby
 */
const Panel = ({
  children,
  spacing = 'space-900',
  elementType = 'div',
  ariaLabelledby,
}: {
  children: ReactNode;
  spacing?: SpaceToken;
  elementType?: 'div' | 'section';
  ariaLabelledby?: string;
}) => (
  <Box
    elementType={elementType}
    aria-labelledby={ariaLabelledby}
    backgroundColor="primary"
    borderColor="basic"
    borderRadius="300"
    borderWidth="100"
    padding="space-800"
  >
    <Flex direction="vertical" alignmentX="stretch" spacing={spacing}>
      {children}
    </Flex>
  </Box>
);

export default {
  title: 'Examples/Pages',
  parameters: {
    layout: 'fullscreen',
  },
};

export const CvEditor = () => {
  const [isPersonalDetailsDropdownOpen, setPersonalDetailsDropdownOpen] = useState(false);
  const onPersonalDetailsDropdownToggle = () => setPersonalDetailsDropdownOpen(!isPersonalDetailsDropdownOpen);

  return (
    <Section size="small" backgroundColor="secondary" containerProps={{ size: 'large' }}>
      <Grid cols={12} spacing="space-1000" alignmentY="top">
        <GridItem columnEnd={{ desktop: 'span 4' }} columnStart={{ mobile: 'span 12', desktop: 9 }}>
          <Stack spacing="space-1000">
            {/* elementType="section": this is a CTA widget, not standalone/redistributable content, so `article`
                (Card's default) is wrong. `section` still gives CardFooter's <footer> a real sectioning ancestor
                to scope to, unlike `div` — and stays unnamed, so it isn't exposed as a landmark either. */}
            {/* TODO: Card bug? It's possible to pass `color="primary"` to Card and it makes its way into the browser :think:. */}
            {/* TODO: Cannot set textColor on Card, a bug? */}
            <Card isBoxed elementType="section">
              <CardArtwork alignmentX="center">
                <IllustrationPublished />
              </CardArtwork>
              <CardBody>
                <Heading elementType="h2" size="small" emphasis="semibold">
                  Získejte nabídky bez hledání
                </Heading>
                {/* TODO: Cards use secondary color for text by default which makes things like this indistinguishable. */}
                <Text textColor="secondary">
                  Vystavením životopisu vás mohou oslovit firmy, které právě hledají někoho s vašimi zkušenostmi.
                </Text>
                <Link href="#" color="secondary" underlined="always">
                  Jak to funguje?
                </Link>
              </CardBody>
              <CardFooter alignmentX="center" hasDivider>
                <Grid cols={1} spacingY="space-700">
                  <Text textColor="secondary" elementType="div" textAlignment="center">
                    Váš životopis není vystavený
                  </Text>
                  <Button>Vystavit pro firmy</Button>
                </Grid>
              </CardFooter>
            </Card>
            {/* Floating actions, tablet + desktop only. Box is used here so we can use zero padding-x since the padding
                is already provided by NavigationItems.
            */}
            <Box
              backgroundColor="primary"
              borderColor="basic"
              borderRadius="300"
              borderWidth="100"
              hideOn={['mobile', 'tablet']}
              paddingY="space-800"
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
          </Stack>
        </GridItem>
        <GridItem
          columnEnd={{ desktop: 'span 8' }}
          columnStart={{ mobile: 'span 12', desktop: 1 }}
          rowStart={{ desktop: 1 }}
        >
          <Stack spacing="space-1000">
            {/* Panel, not Card: this is a data/settings block, not a Card composition (no CardArtwork/CardBody/
                CardFooter), so a plain surface is the leaner choice. `section` + `aria-labelledby` gives it a
                named landmark, which is genuinely useful here for jumping between editor sections. */}
            <Panel elementType="section" ariaLabelledby="cv-personal-details-heading">
              <Flex alignmentX="space-between" alignmentY="center" spacing="space-900">
                <Heading
                  id="cv-personal-details-heading"
                  elementType="h2"
                  size="small"
                  emphasis="semibold"
                  marginBottom="space-0"
                >
                  Osobní údaje
                </Heading>
                {/* TODO: ControlButton only allows "white" background for primary background context which is not defined here.
                    Should the Card set its background via color scheme to allow this?
                */}
                <Dropdown
                  id="personal-details-actions"
                  isOpen={isPersonalDetailsDropdownOpen}
                  onToggle={onPersonalDetailsDropdownToggle}
                  placement="bottom-end"
                >
                  <DropdownTrigger elementType={ControlButton} size="large" isSymmetrical aria-haspopup="menu">
                    <VisuallyHidden>Zobrazit akce</VisuallyHidden>
                    <Icon name="more" />
                  </DropdownTrigger>
                  <DropdownPopover role="menu" aria-label="Options">
                    <Item elementType="button" role="menuitem" startSlot={<Icon name="edit" />}>
                      Upravit položku
                    </Item>
                    <Item elementType="button" role="menuitem" startSlot={<Icon name="placeholder" />}>
                      Smazat položku
                    </Item>
                  </DropdownPopover>
                </Dropdown>
              </Flex>
              <Stack elementType="dl" spacing="space-300">
                <VisuallyHidden elementType="dt">Jméno a příjmení</VisuallyHidden>
                <Text elementType="dd" emphasis="semibold" marginBottom="space-0">
                  Jirik Bárta
                </Text>
                <VisuallyHidden elementType="dt">E-mail</VisuallyHidden>
                <Text elementType="dd" size="small" marginBottom="space-0">
                  email@gmail.com
                </Text>
                <VisuallyHidden elementType="dt">Telefon</VisuallyHidden>
                <Text elementType="dd" size="small" textColor="secondary" marginBottom="space-0">
                  Telefonní číslo nebylo vyplněno
                </Text>
                <VisuallyHidden elementType="dt">Město</VisuallyHidden>
                <Text elementType="dd" size="small">
                  Brno
                </Text>
              </Stack>
            </Panel>

            <Panel elementType="section" ariaLabelledby="cv-photo-heading">
              <Stack spacing="space-400">
                <Heading id="cv-photo-heading" elementType="h2" size="small" emphasis="semibold" marginBottom="space-0">
                  Fotka
                </Heading>
                <Text textColor="secondary" marginBottom="space-0">
                  Přidejte svoji fotografii. Životopis s fotkou působí osobněji a víc zaujme.
                </Text>
              </Stack>
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
            </Panel>

            <Text textColor="secondary">Přidejte si do životopisu další informace, které jsou pro vás důležité.</Text>

            {/* elementType="ul"/"li": a repeated collection of "add section" links, not article content — see
                the Card README's "Card Grid" list-semantics guidance. */}
            <Grid elementType="ul" cols={1} spacing="space-700">
              {CV_SECTIONS.map((section) => (
                <Card key={section} elementType="li" direction="horizontal-reversed" isBoxed>
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
      </Grid>
    </Section>
  );
};
