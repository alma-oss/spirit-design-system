import React, { type ReactNode, useState } from 'react';
import {
  Box,
  Breadcrumbs,
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
 * The white surface shared by all boxed sections of the page: background `primary`, 1px `basic` border,
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
const Surface = ({
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
    <>
      {/* elementType="div": this composition lands inside the page's <main>, and neither top-level Section
          corresponds to a genuine outline subsection — they're full-bleed background bands, a styling concern,
          not sectioning content. Especially true here: nesting the page's own h1 inside a <section> would read
          as "an anonymous section headed by this h1," implying a subsection boundary that doesn't exist. */}
      <Section
        elementType="div"
        size="small"
        backgroundColor="secondary"
        containerProps={{ size: 'large' }}
        paddingBottom={{ mobile: 'space-0', tablet: 'space-0' }}
      >
        {/* TODO: Breadcrumbs hardcodes aria-label="Breadcrumb" on its root <nav> — the literal is placed after
            the prop spread in the component, so it wins over any aria-label passed in here. Can't localize this
            landmark's name from consumer code; would need a fix in Breadcrumbs itself (src/, out of scope here). */}
        <Breadcrumbs marginBottom="space-1000" items={[{ title: 'Domů', url: '#' }, { title: 'Životopis' }]} />
        <Heading elementType="h1" size="large" emphasis="semibold">
          Můj životopis
        </Heading>
      </Section>
      <Section elementType="div" size="small" backgroundColor="secondary" containerProps={{ size: 'large' }}>
        <Grid cols={12} spacing="space-1000" alignmentY="top">
          <GridItem
            elementType="aside"
            columnEnd={{ desktop: 'span 4' }}
            columnStart={{ mobile: 'span 12', desktop: 9 }}
          >
            <Stack spacing="space-1000">
              {/* elementType="section": this is a CTA widget, not standalone/redistributable content, so `article`
                (Card's default) is wrong. `section` still gives CardFooter's <footer> a real sectioning ancestor
                to scope to, unlike `div` — and stays unnamed, so it isn't exposed as a landmark either. */}
              {/* TODO: Card bug? It's possible to pass `color="primary"` to Card and it makes its way into the browser. */}
              <Card elementType="section" isBoxed>
                <CardArtwork alignmentX="center">
                  <IllustrationPublished />
                </CardArtwork>
                <CardBody>
                  <Heading elementType="h2" size="small" emphasis="semibold" marginBottom="space-400">
                    Získejte nabídky bez hledání
                  </Heading>
                  {/* TODO: Consider making Card more customizable.
                    Cards use secondary color for text by default which makes things like this indistinguishable.
                  */}
                  <Text textColor="secondary" marginBottom="space-600">
                    Vystavením životopisu vás mohou oslovit firmy, které právě hledají někoho s vašimi zkušenostmi.
                  </Text>
                  <Link href="#" color="secondary" underlined="always">
                    Jak to funguje?
                  </Link>
                </CardBody>
                <CardFooter alignmentX="center" hasDivider>
                  <Stack spacing="space-700">
                    <Text textColor="secondary" elementType="div" textAlignment="center">
                      Váš životopis není vystavený
                    </Text>
                    <Button>Vystavit pro firmy</Button>
                  </Stack>
                </CardFooter>
              </Card>
              {/* Floating actions, tablet + desktop only. */}
              {/* TODO: Consider removing the baked-in horizontal padding from NavigationItems.
                  It's why this Box uses zero padding-x and relies on NavigationAction's own pill padding
                  instead of a uniform Box padding like Surface uses elsewhere — a workaround, not a choice.
               */}
              <Box
                backgroundColor="primary"
                borderColor="basic"
                borderRadius="300"
                borderWidth="100"
                hideOn={['mobile', 'tablet']}
                paddingY="space-800"
              >
                {/* role="toolbar": a persistent, always-visible set of CV actions, not a menu (transient,
                    dismissable) or site navigation (Navigation's implicit `nav` role). */}
                {/* TODO: Allow the `toolbar` pattern for Navigation

                    1. The `toolbar` role implies the keyboard accessibility contract, see:
                       https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role#keyboard_interactions
                       https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/

                    2. Allow `elementType` for Navigation and its subcomponents.
                       Not critical since the `toolbar` role overrides the <nav> role of Navigation,
                       and the <ul>/<li> markup inside should be harmless.
                 */}
                <Navigation
                  direction="vertical"
                  aria-orientation="vertical"
                  aria-label="Správa životopisu"
                  {...({ role: 'toolbar' } as Record<string, string>)}
                >
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
              {/* Surface, not Card: this is a data/settings block, not a Card composition (no CardArtwork/CardBody/
                CardFooter), so a plain surface is the leaner choice. `section` + `aria-labelledby` gives it a
                named landmark, which is genuinely useful here for jumping between editor sections. */}
              <Surface elementType="section" ariaLabelledby="cv-personal-details-heading">
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
                  {/* TODO: Allow the `menu` pattern for Dropdown

                      The menu role is a good fit for transient, dismissible contextual actions.

                      Using the `menu` role implies the keyboard accessibility contract, see:
                      https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menu_role#keyboard_interactions
                      https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
                      https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
                   */}
                  <Dropdown
                    id="personal-details-actions"
                    isOpen={isPersonalDetailsDropdownOpen}
                    onToggle={onPersonalDetailsDropdownToggle}
                    placement="bottom-end"
                  >
                    {/* TODO: Consider letting Box declare a background color context

                        ControlButton's "white" background is only offered in the `primary` background context, and
                        `backgroundColor="primary"` (see Surface above) sets the background but not the context, so
                        there is no way to ask for it from here. Should Box set its background via a color scheme?
                    */}
                    <DropdownTrigger elementType={ControlButton} size="large" isSymmetrical aria-haspopup="menu">
                      <VisuallyHidden>Zobrazit akce</VisuallyHidden>
                      <Icon name="more" />
                    </DropdownTrigger>
                    <DropdownPopover role="menu" aria-label="Možnosti">
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
                  <Text elementType="dd" emphasis="semibold">
                    Jirik Bárta
                  </Text>
                  <VisuallyHidden elementType="dt">E-mail</VisuallyHidden>
                  <Text elementType="dd" size="small">
                    email@gmail.com
                  </Text>
                  <VisuallyHidden elementType="dt">Telefon</VisuallyHidden>
                  <Text elementType="dd" size="small" textColor="secondary">
                    Telefonní číslo nebylo vyplněno
                  </Text>
                  <VisuallyHidden elementType="dt">Město</VisuallyHidden>
                  <Text elementType="dd" size="small">
                    Brno
                  </Text>
                </Stack>
              </Surface>

              <Surface elementType="section" ariaLabelledby="cv-photo-heading">
                <Stack spacing="space-400">
                  <Heading id="cv-photo-heading" elementType="h2" size="small" emphasis="semibold">
                    Fotka
                  </Heading>
                  <Text textColor="secondary">
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
              </Surface>

              <Text id="cv-sections-to-complete" textColor="secondary">
                Přidejte si do životopisu další informace, které jsou pro vás důležité.
              </Text>

              {/* elementType="ul"/"li": a repeated collection of "add section" links, not article content — see
                the Card README's "Card Grid" list-semantics guidance. `aria-labelledby` names the list with the
                copy that already introduces it, so the unfilled sections read as one named group. */}
              <Grid elementType="ul" aria-labelledby="cv-sections-to-complete" cols={1} spacing="space-700">
                {CV_SECTIONS.map((section) => (
                  <Card key={section} elementType="li" direction="horizontal-reversed" isBoxed>
                    <CardArtwork>
                      <Icon name="add" />
                    </CardArtwork>
                    <CardBody>
                      <CardTitle elementType="h3">
                        <CardLink href="#">
                          <VisuallyHidden>Přidat </VisuallyHidden>
                          {section}
                        </CardLink>
                      </CardTitle>
                    </CardBody>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </GridItem>
        </Grid>
      </Section>
    </>
  );
};
