// url=<FIGMA_FILE_ID>?node-id=43957%3A3681
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Footer/Footer.tsx
// component=Footer

import figma from 'figma';

export default {
  id: 'Footer',
  imports: [
    "import { ButtonLink, Container, Divider, Flex, Footer, Grid, Heading, Icon, Link, ProductLogo, Select, Stack, VisuallyHidden } from '@alma-oss/spirit-web-react';",
  ],
  example: figma.code`<Footer>
  <Container>
    {/* Grid with navigation links */}
    <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} spacing="space-1000">
      {/* Repeat the <nav> block as many times as needed. */}
      <nav aria-labelledby="footer-navigation-section-1">
        <Heading
          id="footer-navigation-section-1"
          elementType="h3"
          size="xsmall"
          emphasis="semibold"
          marginBottom="space-700"
        >
          Custom headline
        </Heading>
        <Stack elementType="ul" spacing="space-600" hasSpacing>
          <li>
            <Link href="https://www.example.com">Body Link</Link>
          </li>
          <li>
            <Link href="https://www.example.com">Body Link</Link>
          </li>
          <li>
            <Link href="https://www.example.com">Body Link</Link>
          </li>
        </Stack>
      </nav>
    </Grid>

    {/* Divider */}
    <Divider marginY="space-1200" />

    {/* Grid with product logo, social media links and language switch */}
    <Grid
      cols={{ mobile: 1, desktop: 3 }}
      alignmentX={{ mobile: 'center', desktop: 'stretch' }}
      alignmentY="center"
      spacing="space-1100"
    >
      {/* Product logo */}
      <div className="text-desktop-left">
        <Link href="https://www.example.com">
          <ProductLogo>{/*defaultSvgLogo*/}</ProductLogo>
        </Link>
      </div>

      {/* Flex with social media links */}
      <Flex elementType="ul" alignmentX="center" alignmentY="center">
        <li>
          <ButtonLink color="tertiary" isSymmetrical>
            <VisuallyHidden>Facebook</VisuallyHidden>
            <Icon name="logo-facebook" />
          </ButtonLink>
        </li>
        <li>
          <ButtonLink color="tertiary" isSymmetrical>
            <VisuallyHidden>X</VisuallyHidden>
            <Icon name="logo-x" />
          </ButtonLink>
        </li>
        <li>
          <ButtonLink color="tertiary" isSymmetrical>
            <VisuallyHidden>YouTube</VisuallyHidden>
            <Icon name="logo-youtube" />
          </ButtonLink>
        </li>
      </Flex>

      {/* Language switch */}
      <div className="text-desktop-right">
        <Select id="select-language" name="selectLanguage" label="Language" isLabelHidden>
          <option value="en">English</option>
          <option value="cs">Čeština</option>
        </Select>
      </div>
    </Grid>

    {/* Divider */}
    <Divider marginY="space-1200" />

    {/* Flex with secondary links */}
    <nav aria-label="Secondary links">
      <Flex
        elementType="ul"
        direction={{ mobile: 'vertical', tablet: 'horizontal' }}
        alignmentX={{ mobile: 'stretch', tablet: 'center' }}
        spacing={{ mobile: 'space-600', tablet: 'space-900' }}
        isWrapping
      >
        <li>
          <Link href="https://www.example.com" color="secondary">
            Legal notice
          </Link>
        </li>
        <li>
          <Link href="https://www.example.com" color="secondary">
            Terms of service
          </Link>
        </li>
        <li>
          <Link href="https://www.example.com" color="secondary">
            Privacy policy
          </Link>
        </li>
        <li>
          <Link href="https://www.example.com" color="secondary">
            Manage cookies
          </Link>
        </li>
      </Flex>
    </nav>
  </Container>
</Footer>`,
};
