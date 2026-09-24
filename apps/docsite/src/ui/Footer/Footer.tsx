import { Container, Footer as SpiritFooter } from '@alma-oss/spirit-web-react';
import { fetchAlmaCareerFooter } from './fetchAlmaCareerFooter';

const Footer = async () => {
  const html = await fetchAlmaCareerFooter();

  if (html === null) {
    return (
      <SpiritFooter marginTop={{ mobile: 'space-1200', tablet: 'space-1200' }} textAlignment="center">
        <Container>© Alma Career Oy and its subsidiaries</Container>
      </SpiritFooter>
    );
  }

  return (
    <div
      // eslint-disable-next-line react/no-danger -- trusted static HTML from the Alma Career footer CDN
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Footer;
