import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { type ComponentProps, type ReactNode } from 'react';
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
import { Stack, StackItem } from '../../Stack';
import { VisuallyHidden } from '../../VisuallyHidden';
import Footer from '../Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer/Figma',
  component: Footer,
  tags: ['!autodocs', 'figma'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/SPIRIT-DESIGN-SYSTEM--UI-Kit-?node-id=19410%3A3769',
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
            <StackItem>
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
            </StackItem>
          ),
          false: undefined,
        }),
        showRow2: figma.boolean('Show Row 2', {
          true: (
            <StackItem>
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
            </StackItem>
          ),
          false: undefined,
        }),
      },
      examples: [
        { example: 'FigmaContentBelow', variant: { 'Content below links': true } },
        { example: 'FigmaNoContentBelow', variant: { 'Content below links': false } },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

type FooterFigmaProps = ComponentProps<typeof Footer> & {
  logo?: ReactNode;
  socialIcons?: ReactNode;
  language?: ReactNode;
  secondaryLinks?: ReactNode;
  showRow2?: ReactNode;
};

export const FigmaContentBelow: Story = {
  name: 'Content below links',
  render: ({ logo, socialIcons, language, secondaryLinks, showRow2 }: FooterFigmaProps) => (
    <Footer>
      <Container>
        <Stack spacing="space-1200" hasIntermediateDividers>
          <StackItem>
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
          </StackItem>

          {showRow2}

          <StackItem>
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
          </StackItem>

          {secondaryLinks}
        </Stack>
      </Container>
    </Footer>
  ),
};

export const FigmaNoContentBelow: Story = {
  name: 'No content below links',
  render: ({ secondaryLinks, showRow2 }: FooterFigmaProps) => (
    <Footer>
      <Container>
        <Stack spacing="space-1200" hasIntermediateDividers>
          <StackItem>
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
          </StackItem>

          {showRow2}

          {secondaryLinks}
        </Stack>
      </Container>
    </Footer>
  ),
};
