import React from 'react';
import { ButtonLink } from '../../ButtonLink';
import { Grid } from '../../Grid';
import { Icon } from '../../Icon';
import { PartnerLogo } from '../../PartnerLogo';
import Card from '../Card';
import CardArtwork from '../CardArtwork';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardFooter from '../CardFooter';
import CardLink from '../CardLink';
import CardLogo from '../CardLogo';
import CardMedia from '../CardMedia';
import CardTitle from '../CardTitle';
import { LOGO, MEDIA_IMAGE } from './constants';

const CardContentOptions = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
    <Card isBoxed>
      <CardMedia>{MEDIA_IMAGE}</CardMedia>
      <CardBody>
        <CardEyebrow>Content options</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Image and text</CardLink>
        </CardTitle>
        {/* User content */}
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. Integer lacinia.
          Sed vel lectus.
        </p>
        {/* End user content */}
      </CardBody>
      <CardFooter>
        <ButtonLink href="#" color="primary">
          Primary
        </ButtonLink>
        <ButtonLink href="#" color="secondary">
          Secondary
        </ButtonLink>
      </CardFooter>
    </Card>

    <Card isBoxed>
      <CardMedia>{MEDIA_IMAGE}</CardMedia>
      <CardLogo>
        <PartnerLogo size="medium" hasSafeArea>
          {LOGO}
        </PartnerLogo>
      </CardLogo>
      <CardBody isSelectable>
        <CardEyebrow>Content options</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Image, logo and selectable text</CardLink>
        </CardTitle>
        {/* User content */}
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. Integer lacinia.
          Sed vel lectus.
        </p>
        {/* End user content */}
      </CardBody>
      <CardFooter>
        <ButtonLink href="#" color="primary">
          Primary
        </ButtonLink>
        <ButtonLink href="#" color="secondary">
          Secondary
        </ButtonLink>
      </CardFooter>
    </Card>

    <Card isBoxed>
      <CardMedia size="auto">
        <video
          src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
          poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg"
          controls
          muted
          playsInline
          preload="metadata"
        />
      </CardMedia>
      <CardBody>
        <CardEyebrow>Content options</CardEyebrow>
        <CardTitle isHeading>
          <a href="#video">Video and text</a>
        </CardTitle>
        {/* User content */}
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. Integer lacinia.
          Sed vel lectus.
        </p>
        {/* End user content */}
      </CardBody>
      <CardFooter>
        <ButtonLink href="#" color="primary">
          Primary
        </ButtonLink>
        <ButtonLink href="#" color="secondary">
          Secondary
        </ButtonLink>
      </CardFooter>
    </Card>

    <Card isBoxed>
      <CardArtwork>
        <Icon name="file" />
      </CardArtwork>
      <CardBody>
        <CardEyebrow>Content options</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Artwork and text</CardLink>
        </CardTitle>
        {/* User content */}
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum risus id tortor. Integer lacinia.
          Sed vel lectus.
        </p>
        {/* End user content */}
      </CardBody>
      <CardFooter>
        <ButtonLink href="#" color="primary">
          Primary
        </ButtonLink>
        <ButtonLink href="#" color="secondary">
          Secondary
        </ButtonLink>
      </CardFooter>
    </Card>

    <Card isBoxed>
      <CardBody>
        <CardEyebrow>Content options</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Text</CardLink>
        </CardTitle>
        {/* User content */}
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
        <ul className="pl-1000">
          <li>Lorem ipsum dolor sit amet</li>
          <li>Consectetuer adipiscing elit</li>
          <li>Aenean fermentum risus id tortor</li>
        </ul>
        {/* End user content */}
      </CardBody>
      <CardFooter>
        <ButtonLink href="#" color="primary">
          Primary
        </ButtonLink>
        <ButtonLink href="#" color="secondary">
          Secondary
        </ButtonLink>
      </CardFooter>
    </Card>

    <Card isBoxed>
      <CardBody>
        <CardEyebrow>Content options</CardEyebrow>
        <CardTitle isHeading>Text only</CardTitle>
        {/* User content */}
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
        <ul className="pl-1000">
          <li>Lorem ipsum dolor sit amet</li>
          <li>Consectetuer adipiscing elit</li>
          <li>Aenean fermentum risus id tortor</li>
        </ul>
        {/* End user content */}
      </CardBody>
    </Card>
  </Grid>
);

export default CardContentOptions;
