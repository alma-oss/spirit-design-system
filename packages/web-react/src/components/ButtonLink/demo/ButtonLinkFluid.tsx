import React from 'react';
import { DemoButtonComponentColors, DemoEmotionColors, DocsSection } from '../../../../docs';
import { Sizes } from '../../../constants';
import { Grid } from '../../Grid';
import { Icon } from '../../Icon';
import ButtonLink from '../ButtonLink';

const ButtonLinkFluid = () => {
  const sizes = Object.values(Sizes);
  const buttonColors = Object.values(DemoButtonComponentColors);
  const emotionColors = Object.values(DemoEmotionColors);
  const colors = [...buttonColors, ...emotionColors];

  return (
    <Grid cols={{ mobile: 1, desktop: 3 }} spacingY="space-1100">
      {sizes.map((size) => (
        <DocsSection key={size} title={`Size ${size}`} container="none" hasPadding={false}>
          {colors.map((color) => (
            <Grid cols={1} spacing="space-400" key={color}>
              <ButtonLink href="#" size={size} color={color}>
                {`Button ${color}`}
              </ButtonLink>{' '}
              <ButtonLink href="#" size={size} color={color}>
                <Icon name="chevron-left" />
                Return back
              </ButtonLink>
            </Grid>
          ))}
        </DocsSection>
      ))}
    </Grid>
  );
};

export default ButtonLinkFluid;
