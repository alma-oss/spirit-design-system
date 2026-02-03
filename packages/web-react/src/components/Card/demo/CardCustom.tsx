import React from 'react';
import { Grid } from '../../Grid';
import { PartnerLogo } from '../../PartnerLogo';
import { Tag } from '../../Tag';
import Card from '../Card';
import CardArtwork from '../CardArtwork';
import CardBody from '../CardBody';
import CardLink from '../CardLink';
import { LOGO } from './constants';

const CardCustom = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }}>
    <Card direction="horizontal-reversed" isBoxed alignmentY="center">
      <CardArtwork>
        <CardLink href="#">
          <PartnerLogo size="small" hasSafeArea={false}>
            {LOGO}
          </PartnerLogo>
        </CardLink>
      </CardArtwork>
      <CardBody>
        {/* User content */}
        <Tag color="neutral" size="small" isSubtle>
          Tag
        </Tag>
        {/* End user content */}
      </CardBody>
    </Card>

    <Card direction="horizontal-reversed" isBoxed alignmentY="center">
      <CardArtwork>
        <CardLink href="#">
          <PartnerLogo size="small" hasSafeArea={false}>
            {LOGO}
          </PartnerLogo>
        </CardLink>
      </CardArtwork>
      <CardBody>
        {/* User content */}
        <Tag color="neutral" size="small" isSubtle>
          Tag
        </Tag>
        {/* End user content */}
      </CardBody>
    </Card>

    <Card direction="horizontal-reversed" isBoxed alignmentY="center">
      <CardArtwork>
        <CardLink href="#">
          <PartnerLogo size="small" hasSafeArea={false}>
            {LOGO}
          </PartnerLogo>
        </CardLink>
      </CardArtwork>
      <CardBody>
        {/* User content */}
        <Tag color="neutral" size="small" isSubtle>
          Tag
        </Tag>
        {/* End user content */}
      </CardBody>
    </Card>

    <Card direction="horizontal-reversed" isBoxed alignmentY="center">
      <CardArtwork>
        <CardLink href="#">
          <PartnerLogo size="small" hasSafeArea={false}>
            {LOGO}
          </PartnerLogo>
        </CardLink>
      </CardArtwork>
      <CardBody>
        {/* User content */}
        <Tag color="neutral" size="small" isSubtle>
          Tag
        </Tag>
        {/* End user content */}
      </CardBody>
    </Card>
  </Grid>
);

export default CardCustom;
