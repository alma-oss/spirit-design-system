import React from 'react';
import { Container } from '../../Container';
import { Divider } from '../../Divider';
import { Flex } from '../../Flex';
import { Grid } from '../../Grid';
import { Heading } from '../../Heading';
import { Link } from '../../Link';
import { ProductLogo } from '../../ProductLogo';
import { defaultSvgLogo } from '../../ProductLogo/demo/ProductLogoDefault';
import { Stack } from '../../Stack';
import Footer from '../Footer';
import FooterLinkFactory from './FooterLinkFactory';

const FooterNested = () => (
  <Footer>
    <Container>
      {/* Grid with navigation links */}
      <Grid cols={{ mobile: 1, tablet: 2, desktop: 6 }} spacing="space-1000">
        {/* Navigation links 1 */}
        <nav aria-labelledby="footer-nested-links-navigation-section-1">
          <Heading elementType="h3" size="xsmall" emphasis="semibold" marginBottom="space-700">
            <Link href="https://www.example.com" id="footer-nested-links-navigation-section-1">
              Section headline
            </Link>
          </Heading>
          <Stack elementType="ul" spacing="space-600" hasSpacing>
            <FooterLinkFactory items={3} label="Link" />
          </Stack>
        </nav>

        {/* Navigation links 2 */}
        <nav aria-labelledby="footer-nested-links-navigation-section-2">
          <Heading elementType="h3" size="xsmall" emphasis="semibold" marginBottom="space-700">
            <Link href="https://www.example.com" id="footer-nested-links-navigation-section-2">
              Section headline
            </Link>
          </Heading>
          <Stack elementType="ul" spacing="space-600" hasSpacing>
            <FooterLinkFactory items={4} label="Link" />
          </Stack>
        </nav>

        {/* Navigation links 3 */}
        <nav aria-labelledby="footer-nested-links-navigation-section-3">
          <Heading elementType="h3" size="xsmall" emphasis="semibold" marginBottom="space-700">
            <Link href="https://www.example.com" id="footer-nested-links-navigation-section-3">
              Section headline
            </Link>
          </Heading>
          <Stack elementType="ul" spacing="space-600" hasSpacing>
            <FooterLinkFactory items={6} label="Link" />
          </Stack>
        </nav>

        {/* Navigation links 4 with nested */}
        <div>
          <nav aria-labelledby="footer-nested-links-navigation-section-4" className="mb-1000">
            <Heading elementType="h3" size="xsmall" emphasis="semibold" marginBottom="space-700">
              <Link href="https://www.example.com" id="footer-nested-links-navigation-section-4">
                Section headline
              </Link>
            </Heading>
            <Stack elementType="ul" spacing="space-600" hasSpacing>
              <FooterLinkFactory items={3} label="Link" />
            </Stack>
          </nav>
          <nav aria-labelledby="footer-nested-links-navigation-section-1">
            <Heading elementType="h3" size="xsmall" emphasis="semibold" marginBottom="space-700">
              <Link href="https://www.example.com" id="footer-nested-links-navigation-section-1">
                Section headline
              </Link>
            </Heading>
            <Stack elementType="ul" spacing="space-600" hasSpacing>
              <FooterLinkFactory items={2} label="Link" />
            </Stack>
          </nav>
        </div>

        {/* Navigation links 5 */}
        <nav aria-labelledby="footer-nested-links-navigation-section-5">
          <Heading elementType="h3" size="xsmall" emphasis="semibold" marginBottom="space-700">
            <Link href="https://www.example.com" id="footer-nested-links-navigation-section-5">
              Section headline
            </Link>
          </Heading>
          <Stack elementType="ul" spacing="space-600" hasSpacing>
            <FooterLinkFactory items={3} label="Link" />
          </Stack>
        </nav>

        {/* Navigation links 6 */}
        <nav aria-labelledby="footer-nested-links-navigation-section-6">
          <Heading elementType="h3" size="xsmall" emphasis="semibold" marginBottom="space-700">
            <Link href="https://www.example.com" id="footer-nested-links-navigation-section-6">
              Section headline
            </Link>
          </Heading>
          <Stack elementType="ul" spacing="space-600" hasSpacing>
            <FooterLinkFactory items={4} label="Link" />
          </Stack>
        </nav>
      </Grid>

      {/* Divider */}
      <Divider marginY="space-1200" />

      {/* Product logo */}
      <div className="text-center">
        <Link href="https://www.example.com">
          <ProductLogo>{defaultSvgLogo}</ProductLogo>
        </Link>
      </div>

      {/* Divider */}
      <Divider marginY="space-1200" />

      {/* Flex with secondary links */}
      <nav aria-label="Secondary links">
        <Flex
          elementType="ul"
          direction={{ mobile: 'vertical', tablet: 'horizontal' }}
          alignmentX={{ mobile: 'stretch', tablet: 'center' }}
          spacingX={{ mobile: 'space-600', tablet: 'space-900' }}
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
  </Footer>
);

export default FooterNested;
