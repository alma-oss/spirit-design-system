import { breakpoints } from '@alma-oss/spirit-design-tokens';
import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardLogo,
  CardMedia,
  CardTitle,
  Container,
  Flex,
  Grid,
  Icon,
  Link,
  PartnerLogo,
  Text,
  Truncate,
  VisuallyHidden,
} from '../../../src/components';
import { type GridColumns } from '../../../src/types';

// Employers upload a single cover image through Teamio. Like on Jobs.cz, it is displayed in the 480:300 ratio on
// mobile and in the 1024:300 ratio from the tablet breakpoint up. The crops are requested from the image CDN, so
// CardMedia can display them in their delivered ratio with the `auto` size.
const COVER_BREAKPOINT = `(min-width: ${breakpoints.tablet})`;
const CDN_URL = 'https://xah625or3v.cloudimg.io';

type CoverCrops = { desktop: string; mobile: string };

type Employer = {
  description: string;
  employees: string;
  cover?: CoverCrops;
  logo?: string;
  industry: string;
  name: string;
  offers: number;
};

const EMPLOYERS: Employer[] = [
  {
    cover: {
      desktop: `${CDN_URL}/_freyaimg_prod_/439621670/2666afac-c888-11f1-afe0-0242ac110005.jpg?tl_px=0,3262&br_px=8000,5606&width=2048`,
      mobile: `${CDN_URL}/_freyaimg_prod_/439621670/2666afac-c888-11f1-afe0-0242ac110005.jpg?tl_px=2125,3262&br_px=5875,5606&width=960`,
    },
    description:
      'Moderní loterijní společnost, založená na špičkových technologiích, výjimečná svými produkty a komunikací se zákazníky.',
    employees: '500 - 999',
    industry: 'Obchod a prodej, nákup',
    logo: `${CDN_URL}/_freyaimg_prod_/439621670/57416ab4-f5e2-11f0-bd3b-0242ac110003.png?tl_px=74,147&br_px=2433,812&width=584`,
    name: 'Allwyn Česko a.s.',
    offers: 5,
  },
  {
    cover: {
      desktop: `${CDN_URL}/_cpimg_prod_/20314537/ba77800c-6d06-11ea-8cde-0242ac110010.jpg?tl_px=0,4&br_px=1313,389&width=2048`,
      mobile: `${CDN_URL}/_cpimg_prod_/20314537/ba77800c-6d06-11ea-8cde-0242ac110010.jpg?tl_px=341,0&br_px=971,394&width=960`,
    },
    description:
      'Rodinná firma z Jablonce nad Nisou, která navrhuje a vyrábí šperky už více než dvacet let. V ateliéru kombinujeme tradiční zlatnické řemeslo s moderním designem a prodáváme přes vlastní butiky i e-shop po celé republice.',
    employees: '100 - 199',
    industry: 'Umělecká řemeslná výroba',
    logo: `${CDN_URL}/_cpimg_prod_/20314537/baa8680c-6d06-11ea-a491-0242ac110010.png?width=200&height=100&func=bound`,
    name: 'Mezinárodní společnost pro výrobu a distribuci šperků a bižuterie Jablonec nad Nisou, s.r.o.',
    offers: 1,
  },
  {
    cover: {
      desktop: `${CDN_URL}/_cpimg_prod_/1703023432/575481e4-2c06-11ec-8642-0242ac110005.jpg?tl_px=545,31&br_px=1805,400&width=2048`,
      mobile: `${CDN_URL}/_cpimg_prod_/1703023432/575481e4-2c06-11ec-8642-0242ac110005.jpg?tl_px=880,31&br_px=1470,400&width=960`,
    },
    description: 'Stavíme datové platformy a integrace pro retail, logistiku a veřejnou správu.',
    employees: '10 - 49',
    industry: 'Informační technologie',
    name: 'Datová kovárna',
    offers: 3,
  },
  {
    description: 'Logistické služby a skladování pro e-commerce po celé České republice.',
    employees: '50 - 99',
    industry: 'Doprava a logistika',
    logo: `${CDN_URL}/_freyaimg_prod_/439621670/57416ab4-f5e2-11f0-bd3b-0242ac110003.png?tl_px=74,147&br_px=2433,812&width=584`,
    name: 'Moravská Logistika a.s.',
    offers: 12,
  },
  {
    cover: {
      desktop: `${CDN_URL}/_cpimg_prod_/7910630/ba654d90-88e5-11ec-b6d2-0242ac110007.jpg?tl_px=448,211&br_px=1472,511&width=2048`,
      mobile: `${CDN_URL}/_cpimg_prod_/7910630/ba654d90-88e5-11ec-b6d2-0242ac110007.jpg?tl_px=720,211&br_px=1200,511&width=960`,
    },
    description:
      'Kdo by neznal zeleného mimozemšťana? To, že je Alza leaderem na české a slovenské e-commerce scéně asi taky víš. Jsme ale také stabilní česká firma s tradicí.',
    employees: '2500 - 2999',
    industry: 'Informační technologie',
    logo: `${CDN_URL}/_cpimg_prod_/7910630/db7f211a-59cc-11ec-87b6-0242ac11000c.png?width=200&tl_px=0,9&br_px=350,110`,
    name: 'Alza.cz a.s.',
    offers: 21,
  },
  {
    cover: {
      desktop: `${CDN_URL}/_cpimg_prod_/27512/9d218e70-1242-11f1-9312-0242ac110009.jpg?tl_px=448,0&br_px=1472,300&width=2048`,
      mobile: `${CDN_URL}/_cpimg_prod_/27512/9d218e70-1242-11f1-9312-0242ac110009.jpg?tl_px=720,0&br_px=1200,300&width=960`,
    },
    description:
      'Jsme výrobce nealkoholických nápojů, čajů, kávy, přírodní kosmetiky a provozovatel gastro sítí. Vyrábíme v 15 závodech na 5 evropských trzích.',
    employees: '500 - 999',
    industry: 'Potravinářství',
    logo: `${CDN_URL}/_cpimg_prod_/27512/2626ff42-1430-11ef-aacb-0242ac11000c.png?width=200&tl_px=0,1&br_px=1500,531`,
    name: 'Kofola',
    offers: 29,
  },
  {
    cover: {
      desktop: `${CDN_URL}/_freyaimg_prod_/8228690/f9887724-5fe4-11f1-8025-0242ac110011.png?tl_px=0,0&br_px=1024,300&width=2048`,
      mobile: `${CDN_URL}/_freyaimg_prod_/8228690/f9887724-5fe4-11f1-8025-0242ac110011.png?tl_px=272,0&br_px=752,300&width=960`,
    },
    description:
      'Více než 17 000 kolegů a kolegyň propojuje celé Česko službami, které usnadňují každodenní život lidem, firmám i státu.',
    employees: '10 000 a více',
    industry: 'Pošty, Zasilatelství',
    logo: `${CDN_URL}/_freyaimg_prod_/8228690/50cfd7b4-5fe7-11f1-ac06-0242ac110011.jpg?tl_px=0,0&br_px=714,546&width=584`,
    name: 'Česká pošta, s.p.',
    offers: 15,
  },
  {
    cover: {
      desktop: `${CDN_URL}/_freyaimg_prod_/2285017/9d55a284-4792-11f1-a65d-0242ac110011.jpg?tl_px=0,58&br_px=1389,465&width=2048`,
      mobile: `${CDN_URL}/_freyaimg_prod_/2285017/9d55a284-4792-11f1-a65d-0242ac110011.jpg?tl_px=369,58&br_px=1020,465&width=960`,
    },
    description:
      'Rozhýbejte s námi svět. Jsme jedním z předních poskytovatelů kamionových, leteckých, námořních přeprav i skladové logistiky.',
    employees: '500 - 999',
    industry: 'Logistika',
    logo: `${CDN_URL}/_freyaimg_prod_/2285017/c118a284-4792-11f1-9c5d-0242ac110011.jpg?tl_px=0,0&br_px=593,390&width=584`,
    name: 'DSV Global Transport and Logistics',
    offers: 29,
  },
  {
    cover: {
      desktop: `${CDN_URL}/_cpimg_prod_/77321/f17476d4-43cc-11f1-9cc2-0242ac11000b.jpg?tl_px=940,3038&br_px=3084,3666&width=2048`,
      mobile: `${CDN_URL}/_cpimg_prod_/77321/f17476d4-43cc-11f1-9cc2-0242ac11000b.jpg?tl_px=1509,3038&br_px=2514,3666&width=960`,
    },
    description:
      'Usilujeme o otevřenou, informovanou, angažovanou a zodpovědnou společnost, která není lhostejná k problémům doma ani za hranicemi naší země.',
    employees: '1000 - 1499',
    industry: 'Sociální péče',
    logo: `${CDN_URL}/_cpimg_prod_/77321/dd872c54-08f0-11ed-8ea6-0242ac110007.jpg?width=200&tl_px=0,0&br_px=766,426`,
    name: 'Člověk v tísni, o.p.s.',
    offers: 16,
  },
  {
    cover: {
      desktop: `${CDN_URL}/_cpimg_prod_/233975/91d48698-d69c-11f1-88e8-0242ac110006.png?tl_px=448,1&br_px=1472,301&width=2048`,
      mobile: `${CDN_URL}/_cpimg_prod_/233975/91d48698-d69c-11f1-88e8-0242ac110006.png?tl_px=720,1&br_px=1200,301&width=960`,
    },
    description:
      'ASB Group je dynamická poradenská společnost působící v regionu CEE: v České republice, Polsku, na Slovensku a v Maďarsku.',
    employees: '100 - 199',
    industry: 'Administrativa a správní činnosti',
    logo: `${CDN_URL}/_cpimg_prod_/233975/e91b957e-6d06-11ea-8113-0242ac110010.jpg?width=200&height=100&func=bound`,
    name: 'ASB Czech Republic, s.r.o.',
    offers: 3,
  },
];

const formatOffers = (count: number) => {
  if (count === 1) {
    return '1 nabídka';
  }

  if (count >= 2 && count <= 4) {
    return `${count} nabídky`;
  }

  return `${count} nabídek`;
};

type CardEmployerGalleryProps = {
  gridCols: GridColumns;
  numCards: number;
};

export default {
  title: 'Examples/Compositions/Card',
  argTypes: {
    gridCols: {
      control: 'select',
      name: 'grid columns',
      description: 'Number of columns in the grid from the tablet breakpoint up.',
      options: [1, 2, 3],
    },
    numCards: {
      control: 'select',
      name: 'number of cards',
      description: 'Number of employer cards to display.',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  },
  args: {
    gridCols: 2,
    numCards: 6,
  },
};

export const CardEmployerGallery = (args: CardEmployerGalleryProps) => {
  const { gridCols, numCards } = args;

  return (
    <Container size="large">
      <Grid cols={{ mobile: 1, tablet: gridCols }}>
        {EMPLOYERS.slice(0, numCards).map((employer) => (
          <Card key={employer.name} isBoxed>
            {employer.cover && (
              <CardMedia isExpanded>
                <picture>
                  <source media={COVER_BREAKPOINT} srcSet={employer.cover.desktop} />
                  <img src={employer.cover.mobile} alt="" />
                </picture>
              </CardMedia>
            )}
            {employer.logo && (
              <CardLogo>
                <PartnerLogo size="small">
                  <img src={employer.logo} alt="" />
                </PartnerLogo>
              </CardLogo>
            )}
            <CardBody>
              {/* Both the title and the description can be truncated with Truncate; set the limits as needed. */}
              <CardTitle elementType="h2">
                <Link href="#">{employer.name}</Link>
              </CardTitle>
              <Flex alignmentY="center" spacing="space-600" isWrapping marginBottom="space-700">
                <Text elementType="span" size="small" textColor="secondary">
                  <VisuallyHidden>Obor: </VisuallyHidden>
                  {employer.industry}
                </Text>
                <Flex elementType="span" alignmentY="center" spacing="space-300">
                  <Icon name="profile" boxSize={20} color="secondary" />
                  <Text elementType="span" size="small" textColor="secondary">
                    <VisuallyHidden>Počet zaměstnanců: </VisuallyHidden>
                    {employer.employees}
                  </Text>
                </Flex>
              </Flex>
              <Text size="small" textColor="secondary">
                <Truncate limit={4}>{employer.description}</Truncate>
              </Text>
            </CardBody>
            {/* Without an expanded CardMedia, the footer divider does not span the full width of the card yet.
                This is a known bug tracked in DS-2912 and will be fixed in the Card component. */}
            <CardFooter hasDivider>
              <Text elementType="span" size="small">
                {/* The employer name makes the link purpose clear in a list of links, where the card heading is not read. */}
                <Link href="#">
                  {formatOffers(employer.offers)}
                  <VisuallyHidden> – {employer.name}</VisuallyHidden>
                </Link>
              </Text>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};
