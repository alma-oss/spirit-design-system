import React from 'react';
import { ButtonLink } from '../../../src/components/ButtonLink';
import { Container } from '../../../src/components/Container';
import { Divider } from '../../../src/components/Divider';
import { Flex } from '../../../src/components/Flex';
import { Footer } from '../../../src/components/Footer';
import FooterLinkFactory from '../../../src/components/Footer/demo/FooterLinkFactory';
import { Grid } from '../../../src/components/Grid';
import { Heading } from '../../../src/components/Heading';
import { Icon } from '../../../src/components/Icon';
import { Link } from '../../../src/components/Link';
import { ProductLogo } from '../../../src/components/ProductLogo';
import { defaultSvgLogo } from '../../../src/components/ProductLogo/demo/ProductLogoDefault';
import { Select } from '../../../src/components/Select';
import { Stack } from '../../../src/components/Stack';
import { VisuallyHidden } from '../../../src/components/VisuallyHidden';
import { type GridColumns } from '../../../src/types';

type FooterCompositionsProps = {
  headingsWithLink: boolean;
  nestedLinkBlocks: boolean;
  numberOfLinkColumns: GridColumns | number;
  showDividers: boolean;
  showLanguageSwitch: boolean;
  showProductLogo: boolean;
  showSecondaryLinks: boolean;
  showSocialMediaButtons: boolean;
};

export default {
  title: 'Examples/Compositions',
  argTypes: {
    headingsWithLink: {
      control: 'boolean',
      description: 'Headings displayed as links',
      table: {
        defaultValue: { summary: false },
      },
    },
    nestedLinkBlocks: {
      control: 'boolean',
      description: 'Nested menu in **1st column**',
      table: {
        defaultValue: { summary: true },
      },
    },
    numberOfLinkColumns: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      table: {
        defaultValue: { summary: 6 },
      },
      description: 'Number of columns with navigation links',
    },
    showDividers: {
      control: 'boolean',
      description: 'Show dividers between sections',
      table: {
        defaultValue: { summary: true },
      },
    },
    showLanguageSwitch: {
      control: 'boolean',
      description: 'Show language switch',
      table: {
        defaultValue: { summary: true },
      },
    },
    showProductLogo: {
      control: 'boolean',
      description: 'Show product logo',
      table: {
        defaultValue: { summary: true },
      },
    },
    showSecondaryLinks: {
      control: 'boolean',
      description: 'Show secondary links',
      table: {
        defaultValue: { summary: true },
      },
    },
    showSocialMediaButtons: {
      control: 'boolean',
      description: 'Show social media buttons',
      table: {
        defaultValue: { summary: true },
      },
    },
  },
  args: {
    headingsWithLink: false,
    nestedLinkBlocks: true,
    numberOfLinkColumns: 6,
    showDividers: true,
    showLanguageSwitch: true,
    showProductLogo: true,
    showSecondaryLinks: true,
    showSocialMediaButtons: true,
  },
};

type NavLinkColumnFactoryType = {
  id: string;
  headline: JSX.Element | string;
  numOfLinks: number;
  withNestedLinks?: boolean;
};

const NavLinkColumnFactory = ({ id, headline, numOfLinks, withNestedLinks = false }: NavLinkColumnFactoryType) => (
  <nav aria-labelledby={id} className={withNestedLinks ? 'mb-1000' : undefined}>
    <Heading id={id} elementType="h3" size="xsmall" emphasis="semibold" marginBottom="space-700">
      {headline}
    </Heading>
    <Stack elementType="ul" spacing="space-600" hasSpacing>
      <FooterLinkFactory items={numOfLinks} label="Link" />
    </Stack>
  </nav>
);

export const FooterCompositions = (args: FooterCompositionsProps) => {
  const {
    headingsWithLink,
    nestedLinkBlocks,
    numberOfLinkColumns,
    showDividers,
    showLanguageSwitch,
    showProductLogo,
    showSecondaryLinks,
    showSocialMediaButtons,
  } = args;

  const logoRowColumns = () => {
    let count = 0;
    if (showProductLogo) count += 1;
    if (showSocialMediaButtons) count += 1;
    if (showLanguageSwitch) count += 1;

    return count as GridColumns;
  };

  const getElementPosition = (element) => {
    switch (element) {
      case 'socialMediaButtons':
        if (!showProductLogo && showLanguageSwitch) {
          return 'left';
        }

        if (showProductLogo && !showLanguageSwitch) {
          return 'right';
        }

        return 'center';

      case 'languageSwitch':
        if (!showProductLogo && !showSocialMediaButtons) {
          return 'center';
        }

        return 'right';

      case 'productLogo':
        return showSocialMediaButtons || showLanguageSwitch ? 'left' : 'center';

      default:
        return 'center';
    }
  };

  const columnHeading = (text: string) => (headingsWithLink ? <Link href="#">{text}</Link> : text);

  const numOfColumnsOnDesktop = () => {
    if (numberOfLinkColumns > 7) {
      return 6;
    }

    if (numberOfLinkColumns === 7) {
      return 5;
    }

    return numberOfLinkColumns as GridColumns;
  };

  return (
    <Footer UNSAFE_className="bg-secondary pt-1400 pb-1200">
      <Container>
        {/* Grid with navigation links */}
        {numberOfLinkColumns > 0 && (
          <Grid
            cols={{
              mobile: 1,
              tablet: numberOfLinkColumns > 2 ? 2 : (numberOfLinkColumns as GridColumns),
              desktop: numOfColumnsOnDesktop(),
            }}
            spacing="space-1000"
            marginBottom={showDividers ? undefined : 'space-1100'}
          >
            {/* Navigation links 1 */}
            {numberOfLinkColumns >= 1 && (
              <div>
                <NavLinkColumnFactory
                  id="footer-navigation-section-1"
                  headline={columnHeading('Section headline')}
                  numOfLinks={3}
                  withNestedLinks
                />
                {nestedLinkBlocks && (
                  <NavLinkColumnFactory
                    id="footer-nested-links-navigation-section-1"
                    headline={columnHeading('Section headline')}
                    numOfLinks={2}
                  />
                )}
              </div>
            )}

            {/* Navigation links 2 */}
            {numberOfLinkColumns >= 2 && (
              <NavLinkColumnFactory
                id="footer-navigation-section-2"
                headline={columnHeading('Section headline')}
                numOfLinks={4}
              />
            )}

            {/* Navigation links 3 */}
            {numberOfLinkColumns >= 3 && (
              <NavLinkColumnFactory
                id="footer-navigation-section-3"
                headline={columnHeading('Section headline')}
                numOfLinks={6}
              />
            )}

            {/* Navigation links 4 */}
            {numberOfLinkColumns >= 4 && (
              <NavLinkColumnFactory
                id="footer-navigation-section-4"
                headline={columnHeading('Section headline')}
                numOfLinks={3}
              />
            )}

            {/* Navigation links 5 */}
            {numberOfLinkColumns >= 5 && (
              <NavLinkColumnFactory
                id="footer-navigation-section-5"
                headline={columnHeading('Section headline')}
                numOfLinks={3}
              />
            )}

            {/* Navigation links 6 */}
            {numberOfLinkColumns >= 6 && (
              <NavLinkColumnFactory
                id="footer-navigation-section-6"
                headline={columnHeading('Section headline')}
                numOfLinks={4}
              />
            )}

            {/* Navigation links 7 */}
            {numberOfLinkColumns >= 7 && (
              <NavLinkColumnFactory
                id="footer-navigation-section-7"
                headline={columnHeading('Section headline')}
                numOfLinks={3}
              />
            )}

            {/* Navigation links 8 */}
            {numberOfLinkColumns >= 8 && (
              <NavLinkColumnFactory
                id="footer-navigation-section-8"
                headline={columnHeading('Section headline')}
                numOfLinks={2}
              />
            )}

            {/* Navigation links 9 */}
            {numberOfLinkColumns >= 9 && (
              <NavLinkColumnFactory
                id="footer-navigation-section-10"
                headline={columnHeading('Section headline')}
                numOfLinks={2}
              />
            )}

            {/* Navigation links 10 */}
            {numberOfLinkColumns >= 10 && (
              <NavLinkColumnFactory
                id="footer-navigation-section-10"
                headline={columnHeading('Section headline')}
                numOfLinks={2}
              />
            )}

            {/* Navigation links 11 */}
            {numberOfLinkColumns >= 11 && (
              <NavLinkColumnFactory
                id="footer-navigation-section-11"
                headline={columnHeading('Section headline')}
                numOfLinks={2}
              />
            )}

            {/* Navigation links 12 */}
            {numberOfLinkColumns >= 12 && (
              <NavLinkColumnFactory
                id="footer-navigation-section-12"
                headline={columnHeading('Section headline')}
                numOfLinks={2}
              />
            )}
          </Grid>
        )}

        {/* Divider */}
        {showDividers && numberOfLinkColumns > 0 && <Divider marginY="space-1200" />}

        {/* Grid with product logo, social media links and language switch */}
        <Grid
          cols={{ mobile: 1, desktop: logoRowColumns() }}
          alignmentX={{ mobile: 'center', desktop: 'stretch' }}
          alignmentY="center"
          spacing="space-1100"
          marginBottom={showDividers || (!showDividers && !showSecondaryLinks) ? undefined : 'space-1100'}
        >
          {/* Product logo */}
          {showProductLogo && (
            <div className={`text-desktop-${getElementPosition('productLogo')}`}>
              <Link href="https://www.example.com">
                <ProductLogo>{defaultSvgLogo}</ProductLogo>
              </Link>
            </div>
          )}

          {/* Flex with social media links */}
          {showSocialMediaButtons && (
            <Flex elementType="ul" alignmentX={getElementPosition('socialMediaButtons')} alignmentY="center">
              <li>
                <ButtonLink size="medium" color="secondary" isSymmetrical>
                  <VisuallyHidden>Facebook</VisuallyHidden>
                  <Icon name="logo-facebook" />
                </ButtonLink>
              </li>
              <li>
                <ButtonLink size="medium" color="secondary" isSymmetrical>
                  <VisuallyHidden>X</VisuallyHidden>
                  <Icon name="logo-x" />
                </ButtonLink>
              </li>
              <li>
                <ButtonLink size="medium" color="secondary" isSymmetrical>
                  <VisuallyHidden>YouTube</VisuallyHidden>
                  <Icon name="logo-youtube" />
                </ButtonLink>
              </li>
              <li>
                <ButtonLink size="medium" color="secondary" isSymmetrical>
                  <VisuallyHidden>Google</VisuallyHidden>
                  <Icon name="logo-google" />
                </ButtonLink>
              </li>
              <li>
                <ButtonLink size="medium" color="secondary" isSymmetrical>
                  <VisuallyHidden>LinkedIn</VisuallyHidden>
                  <Icon name="logo-linkedin" />
                </ButtonLink>
              </li>
            </Flex>
          )}

          {/* Language switch */}
          {showLanguageSwitch && (
            <div className={`text-desktop-${getElementPosition('languageSwitch')}`}>
              <Select id="select-language" name="selectLanguage" label="Language" isLabelHidden>
                <option value="en">English</option>
                <option value="cs">Čeština</option>
              </Select>
            </div>
          )}
        </Grid>

        {/* Divider */}
        {showDividers && showSecondaryLinks && <Divider marginY="space-1200" />}

        {/* Flex with secondary links */}
        {showSecondaryLinks && (
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
        )}
      </Container>
    </Footer>
  );
};
