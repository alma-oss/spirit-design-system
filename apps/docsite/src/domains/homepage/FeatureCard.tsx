'use client';

import { Card, CardArtwork, CardBody, CardFooter, CardLink, CardTitle, Icon, Link } from '@alma-oss/spirit-web-react';
import NextLink from 'next/link';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

const FeatureCard = ({ icon, title, description, href, linkLabel }: FeatureCardProps) => (
  <Card direction="horizontal" isBoxed>
    <CardArtwork>
      <Icon name={icon} />
    </CardArtwork>
    <CardBody>
      <CardTitle isHeading>
        <CardLink elementType={NextLink} href={href}>
          {title}
        </CardLink>
      </CardTitle>
      <p>{description}</p>
    </CardBody>
    <CardFooter alignmentX="right">
      <Link elementType={NextLink} href={href}>
        {linkLabel}
      </Link>
    </CardFooter>
  </Card>
);

export default FeatureCard;
