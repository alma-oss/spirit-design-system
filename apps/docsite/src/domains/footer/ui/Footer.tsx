import { Container, Footer as SpiritFooter } from '@alma-oss/spirit-web-react';
import { fetchCorporateFooter } from '@local/domains/footer/repositories/footerRepository';

const Footer = async () => {
  const corporateFooter = await fetchCorporateFooter();

  if (corporateFooter === null) {
    return (
      <SpiritFooter marginTop={{ mobile: 'space-1200', tablet: 'space-1200' }} textAlignment="center">
        <Container>© Alma Career Oy and its subsidiaries</Container>
      </SpiritFooter>
    );
  }

  return (
    <div
      // eslint-disable-next-line react/no-danger -- trusted static HTML from the Alma Career footer CDN
      dangerouslySetInnerHTML={{ __html: corporateFooter }}
    />
  );
};

export default Footer;
