import { breakpoints } from '@alma-oss/spirit-design-tokens';
import React, { useEffect, useState } from 'react';
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
const COVER_RATIO_MOBILE = { width: 480, height: 300 };
const COVER_RATIO_DESKTOP = { width: 1024, height: 300 };
const CDN_IMAGE_URL = 'https://xah625or3v.cloudimg.io/_freyaimg_prod_/439621670';
const DEFAULT_COVER_CROPS = {
  desktop: `${CDN_IMAGE_URL}/2666afac-c888-11f1-afe0-0242ac110005.jpg?tl_px=0,3262&br_px=8000,5606&width=2048`,
  mobile: `${CDN_IMAGE_URL}/2666afac-c888-11f1-afe0-0242ac110005.jpg?tl_px=2125,3262&br_px=5875,5606&width=960`,
};
const DEFAULT_LOGO = `${CDN_IMAGE_URL}/57416ab4-f5e2-11f0-bd3b-0242ac110003.png?tl_px=74,147&br_px=2433,812&width=584`;

type CoverCrops = typeof DEFAULT_COVER_CROPS;

// Simulates the image CDN for an uploaded cover: crops the centre of the image to the given ratio, without scaling.
const cropToRatio = (image: HTMLImageElement, ratio: { width: number; height: number }) => {
  const targetRatio = ratio.width / ratio.height;
  const { naturalWidth, naturalHeight } = image;
  const width = Math.round(naturalWidth / naturalHeight > targetRatio ? naturalHeight * targetRatio : naturalWidth);
  const height = Math.round(width / targetRatio);
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;
  canvas
    .getContext('2d')
    ?.drawImage(image, (naturalWidth - width) / 2, (naturalHeight - height) / 2, width, height, 0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.9);
};

const useCoverCrops = (src?: string) => {
  const [crops, setCrops] = useState<CoverCrops>(DEFAULT_COVER_CROPS);

  useEffect(() => {
    if (!src) {
      setCrops(DEFAULT_COVER_CROPS);

      return;
    }

    const image = new Image();

    image.onload = () =>
      setCrops({
        desktop: cropToRatio(image, COVER_RATIO_DESKTOP),
        mobile: cropToRatio(image, COVER_RATIO_MOBILE),
      });
    image.src = src;

    // Ignore the pending load when the cover changes or is cleared in the meantime.
    return () => {
      image.onload = null;
    };
  }, [src]);

  return crops;
};

type Employer = {
  description: string;
  employees: string;
  hasCover: boolean;
  hasLogo: boolean;
  industry: string;
  name: string;
  offers: number;
};

const EMPLOYERS: Employer[] = [
  {
    description:
      'Moderní loterijní společnost, založená na špičkových technologiích, výjimečná svými produkty a komunikací se zákazníky.',
    employees: '500 - 999',
    hasCover: true,
    hasLogo: true,
    industry: 'Obchod a prodej, nákup',
    name: 'Allwyn Česko a.s.',
    offers: 5,
  },
  {
    description:
      'Rodinná firma z Jablonce nad Nisou, která navrhuje a vyrábí šperky už více než dvacet let. V ateliéru kombinujeme tradiční zlatnické řemeslo s moderním designem a prodáváme přes vlastní butiky i e-shop po celé republice.',
    employees: '100 - 199',
    hasCover: true,
    hasLogo: true,
    industry: 'Umělecká řemeslná výroba',
    name: 'Mezinárodní společnost pro výrobu a distribuci šperků a bižuterie Jablonec nad Nisou, s.r.o.',
    offers: 1,
  },
  {
    description: 'Stavíme datové platformy a integrace pro retail, logistiku a veřejnou správu.',
    employees: '10 - 49',
    hasCover: true,
    hasLogo: false,
    industry: 'Informační technologie',
    name: 'Datová kovárna',
    offers: 3,
  },
  {
    description: 'Logistické služby a skladování pro e-commerce po celé České republice.',
    employees: '50 - 99',
    hasCover: false,
    hasLogo: true,
    industry: 'Doprava a logistika',
    name: 'Moravská Logistika a.s.',
    offers: 12,
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
  cover: string[];
  gridCols: GridColumns;
  logo: string[];
  numCards: number;
};

export default {
  title: 'Examples/Compositions/Card',
  argTypes: {
    cover: {
      control: { type: 'file', accept: 'image/*' },
      description:
        'Cover image. It is displayed in the 480:300 ratio on mobile and in the 1024:300 ratio from the tablet breakpoint up.',
      name: 'cover',
    },
    gridCols: {
      control: 'select',
      name: 'grid columns',
      description: 'Number of columns in the grid from the tablet breakpoint up.',
      options: [1, 2, 3],
    },
    logo: {
      control: { type: 'file', accept: 'image/*' },
      description: 'Employer logo.',
      name: 'logo',
    },
    numCards: {
      control: 'select',
      name: 'number of cards',
      description: 'Number of employer cards to display.',
      options: [1, 2, 3, 4],
    },
  },
  args: {
    cover: [],
    gridCols: 2,
    logo: [],
    numCards: 4,
  },
};

export const CardEmployerGallery = (args: CardEmployerGalleryProps) => {
  const { cover, gridCols, logo, numCards } = args;
  const coverCrops = useCoverCrops(cover[0]);
  const logoSrc = logo[0] ?? DEFAULT_LOGO;

  return (
    <Container size="large">
      <Grid cols={{ mobile: 1, tablet: gridCols }}>
        {EMPLOYERS.slice(0, numCards).map((employer) => (
          <Card key={employer.name} isBoxed>
            {employer.hasCover && (
              <CardMedia isExpanded>
                <picture>
                  <source media={COVER_BREAKPOINT} srcSet={coverCrops.desktop} />
                  <img src={coverCrops.mobile} alt="" />
                </picture>
              </CardMedia>
            )}
            {employer.hasLogo && (
              <CardLogo>
                <PartnerLogo size="small">
                  <img src={logoSrc} alt="" />
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
