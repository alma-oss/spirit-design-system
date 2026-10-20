import { Container, Footer as SpiritFooter, Grid, GridItem, Link, ProductLogo } from '@alma-oss/spirit-web-react';
import { CookieSettingsLink } from '@local/domains/consent/ui/CookieSettingsLink';
import { fetchCorporateFooter } from '@local/domains/footer/repositories/footerRepository';
import { routes } from '@local/domains/routing/routes';
import SpiritLogo from '@local/ui/SpiritLogo';

const Footer = async () => {
  const corporateFooter = await fetchCorporateFooter();

  return (
    <footer>
      <SpiritFooter elementType="section" paddingBottom="space-900" paddingTop="space-900">
        <Container>
          <Grid
            alignmentX={{ mobile: 'center', desktop: 'stretch' }}
            alignmentY="center"
            cols={{ mobile: 1, desktop: 12 }}
            spacingY="space-1100"
          >
            <GridItem columnEnd={{ desktop: 4 }} columnStart={{ desktop: 1 }}>
              <div className="text-desktop-left">
                <Link aria-label="Spirit Design System" href={routes.homepage}>
                  <ProductLogo>
                    <SpiritLogo />
                  </ProductLogo>
                </Link>
              </div>
            </GridItem>
            <GridItem columnEnd={{ desktop: 13 }} columnStart={{ desktop: 11 }}>
              <nav aria-label="Secondary links" className="text-desktop-right">
                <CookieSettingsLink />
              </nav>
            </GridItem>
          </Grid>
        </Container>
      </SpiritFooter>
      {corporateFooter !== null && (
        <section
          // eslint-disable-next-line react/no-danger -- trusted static HTML from the Alma Career footer CDN
          dangerouslySetInnerHTML={{ __html: corporateFooter }}
        />
      )}
    </footer>
  );
};

export default Footer;
