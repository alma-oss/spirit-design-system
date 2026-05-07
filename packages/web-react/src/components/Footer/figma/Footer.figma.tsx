import figma from '@figma/code-connect';
import React from 'react';
import { ButtonLink } from '../../ButtonLink';
import { Container } from '../../Container';
import { Flex } from '../../Flex';
import { Grid } from '../../Grid';
import { Heading } from '../../Heading';
import { Icon } from '../../Icon';
import { Link } from '../../Link';
import { ProductLogo } from '../../ProductLogo';
import { defaultSvgLogo } from '../../ProductLogo/demo/ProductLogoDefault';
import { Select } from '../../Select';
import { Stack } from '../../Stack';
import { VisuallyHidden } from '../../VisuallyHidden';
import Footer from '../Footer';

const FOOTER_NODE_URL = '<FIGMA_FILE_ID>?node-id=19410%3A3769';

figma.connect(Footer, FOOTER_NODE_URL, {
  variant: { 'Content below links': true },
  props: {
    logo: figma.boolean('Logo', {
      true: (
        <div className="text-desktop-left">
          <Link href="https://www.example.com">
            <ProductLogo>{defaultSvgLogo}</ProductLogo>
          </Link>
        </div>
      ),
      false: undefined,
    }),
    socialIcons: figma.boolean('Social icons', {
      true: (
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
      ),
      false: undefined,
    }),
    language: figma.boolean('Language', {
      true: (
        <div className="text-desktop-right">
          <Select id="select-language" name="selectLanguage" label="Language" isLabelHidden>
            <option value="en">English</option>
            <option value="cs">Čeština</option>
          </Select>
        </div>
      ),
      false: undefined,
    }),
    secondaryLinks: figma.boolean('Secondary links', {
      true: (
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
          </Flex>
        </nav>
      ),
      false: undefined,
    }),
    showRow2: figma.boolean('Show Row 2', {
      true: (
        <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} spacing="space-1000">
          <nav aria-labelledby="footer-navigation-section-2">
            <Heading
              id="footer-navigation-section-2"
              elementType="h3"
              size="xsmall"
              emphasis="semibold"
              marginBottom="space-700"
            >
              Section headline
            </Heading>
            <Stack elementType="ul" spacing="space-600" hasSpacing>
              <li>
                <Link href="https://www.example.com">Link</Link>
              </li>
              <li>
                <Link href="https://www.example.com">Link</Link>
              </li>
              <li>
                <Link href="https://www.example.com">Link</Link>
              </li>
            </Stack>
          </nav>
        </Grid>
      ),
      false: undefined,
    }),
  },
  example: ({ logo, socialIcons, language, secondaryLinks, showRow2 }) => (
    <Footer>
      <Container>
        <Stack spacing="space-1200" hasIntermediateDividers>
          <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} spacing="space-1000">
            <nav aria-labelledby="footer-navigation-section-1">
              <Heading
                id="footer-navigation-section-1"
                elementType="h3"
                size="xsmall"
                emphasis="semibold"
                marginBottom="space-700"
              >
                Section headline
              </Heading>
              <Stack elementType="ul" spacing="space-600" hasSpacing>
                <li>
                  <Link href="https://www.example.com">Link</Link>
                </li>
                <li>
                  <Link href="https://www.example.com">Link</Link>
                </li>
                <li>
                  <Link href="https://www.example.com">Link</Link>
                </li>
              </Stack>
            </nav>
          </Grid>

          {showRow2}

          <Grid
            cols={{ mobile: 1, desktop: 3 }}
            alignmentX={{ mobile: 'center', desktop: 'stretch' }}
            alignmentY="center"
            spacing="space-1100"
          >
            {logo}
            {socialIcons}
            {language}
          </Grid>

          {secondaryLinks}
        </Stack>
      </Container>
    </Footer>
  ),
});

figma.connect(Footer, FOOTER_NODE_URL, {
  variant: { 'Content below links': false },
  props: {
    secondaryLinks: figma.boolean('Secondary links', {
      true: (
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
          </Flex>
        </nav>
      ),
      false: undefined,
    }),
    showRow2: figma.boolean('Show Row 2', {
      true: (
        <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} spacing="space-1000">
          <nav aria-labelledby="footer-navigation-section-2">
            <Heading
              id="footer-navigation-section-2"
              elementType="h3"
              size="xsmall"
              emphasis="semibold"
              marginBottom="space-700"
            >
              Section headline
            </Heading>
            <Stack elementType="ul" spacing="space-600" hasSpacing>
              <li>
                <Link href="https://www.example.com">Link</Link>
              </li>
              <li>
                <Link href="https://www.example.com">Link</Link>
              </li>
              <li>
                <Link href="https://www.example.com">Link</Link>
              </li>
            </Stack>
          </nav>
        </Grid>
      ),
      false: undefined,
    }),
  },
  example: ({ secondaryLinks, showRow2 }) => (
    <Footer>
      <Container>
        <Stack spacing="space-1200" hasIntermediateDividers>
          <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} spacing="space-1000">
            <nav aria-labelledby="footer-navigation-section-1">
              <Heading
                id="footer-navigation-section-1"
                elementType="h3"
                size="xsmall"
                emphasis="semibold"
                marginBottom="space-700"
              >
                Section headline
              </Heading>
              <Stack elementType="ul" spacing="space-600" hasSpacing>
                <li>
                  <Link href="https://www.example.com">Link</Link>
                </li>
                <li>
                  <Link href="https://www.example.com">Link</Link>
                </li>
                <li>
                  <Link href="https://www.example.com">Link</Link>
                </li>
              </Stack>
            </nav>
          </Grid>

          {showRow2}

          {secondaryLinks}
        </Stack>
      </Container>
    </Footer>
  ),
});
