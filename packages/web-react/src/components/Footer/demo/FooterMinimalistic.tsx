import React from 'react';
import { Container } from '../../Container';
import { Flex } from '../../Flex';
import { Grid, GridItem } from '../../Grid';
import { Link } from '../../Link';
import { ProductLogo } from '../../ProductLogo';
import { defaultSvgLogo } from '../../ProductLogo/demo/ProductLogoDefault';
import { Select } from '../../Select';
import Footer from '../Footer';

const FooterMinimalistic = () => (
  <Footer paddingBottom="space-900" paddingTop="space-900">
    <Container>
      {/* Grid with product logo, social media links and language switch */}
      <Grid
        cols={{ mobile: 1, desktop: 12 }}
        alignmentX={{ mobile: 'center', desktop: 'stretch' }}
        alignmentY="center"
        spacingY="space-1100"
      >
        {/* Product logo */}
        <GridItem columnStart={{ desktop: 1 }} columnEnd={{ desktop: 4 }}>
          <div className="text-desktop-left">
            <Link href="https://www.example.com">
              <ProductLogo>{defaultSvgLogo}</ProductLogo>
            </Link>
          </div>
        </GridItem>

        {/* Flex with secondary links */}
        <GridItem columnStart={{ desktop: 4 }} columnEnd={{ desktop: 10 }}>
          <nav className="text-center" aria-label="Secondary links">
            <Flex
              elementType="ul"
              direction={{ mobile: 'column', tablet: 'row' }}
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
        </GridItem>

        {/* Language switch */}
        <GridItem columnStart={{ desktop: 11 }} columnEnd={{ desktop: 13 }}>
          <div className="text-desktop-right">
            <Select id="select-language" name="selectLanguage" label="Language" isLabelHidden>
              <option value="en">English</option>
              <option value="cs">Čeština</option>
            </Select>
          </div>
        </GridItem>
      </Grid>
    </Container>
  </Footer>
);

export default FooterMinimalistic;
