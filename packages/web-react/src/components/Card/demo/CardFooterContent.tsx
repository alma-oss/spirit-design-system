import React from 'react';
import { Avatar } from '../../Avatar';
import { ButtonLink } from '../../ButtonLink';
import { Flex } from '../../Flex';
import { Grid } from '../../Grid';
import { Icon } from '../../Icon';
import { Link } from '../../Link';
import { Text } from '../../Text';
import { VisuallyHidden } from '../../VisuallyHidden';
import Card from '../Card';
import CardBody from '../CardBody';
import CardEyebrow from '../CardEyebrow';
import CardFooter from '../CardFooter';
import CardLink from '../CardLink';
import CardTitle from '../CardTitle';
import { AVATAR } from './constants';

const CardFooterContent = () => (
  <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
    <Card isBoxed>
      <CardBody>
        <CardEyebrow>Footer content</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Links</CardLink>
        </CardTitle>
        {/* User content */}
        <p>Lorem ipsum dolor sit amet.</p>
        {/* End user content */}
      </CardBody>
      <CardFooter>
        <Link href="#link" color="primary">
          Primary
        </Link>
        <Link href="#link" color="secondary">
          Secondary
        </Link>
      </CardFooter>
    </Card>

    <Card isBoxed>
      <CardBody>
        <CardEyebrow>Footer content</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#">Icon buttons</CardLink>
        </CardTitle>
        {/* User content */}
        <p>Lorem ipsum dolor sit amet.</p>
        {/* End user content */}
      </CardBody>
      <CardFooter>
        <ButtonLink href="#" color="plain" isSymmetrical size="small">
          <VisuallyHidden>Add</VisuallyHidden>
          <Icon name="add" />
        </ButtonLink>
        <ButtonLink href="#" color="plain" isSymmetrical size="small">
          <VisuallyHidden>Edit</VisuallyHidden>
          <Icon name="edit" />
        </ButtonLink>
        <ButtonLink href="#" color="plain" isSymmetrical size="small">
          <VisuallyHidden>Help</VisuallyHidden>
          <Icon name="help" />
        </ButtonLink>
      </CardFooter>
    </Card>

    <Card isBoxed>
      <CardBody>
        <CardEyebrow>Footer content</CardEyebrow>
        <CardTitle isHeading>
          <CardLink href="#jiri-barta">Custom footer</CardLink>
        </CardTitle>
        {/* User content */}
        <p>Lorem ipsum dolor sit amet.</p>
        {/* End user content */}
      </CardBody>
      <CardFooter>
        <Flex>
          <Avatar size="large">{AVATAR}</Avatar>
          <div>
            <Text elementType="div" size="small" textColor="primary" emphasis="semibold">
              Jiří Bárta
            </Text>
            <Text elementType="div" size="small" textColor="tertiary">
              Senior UI Designer
            </Text>
          </div>
        </Flex>
      </CardFooter>
    </Card>
  </Grid>
);

export default CardFooterContent;
