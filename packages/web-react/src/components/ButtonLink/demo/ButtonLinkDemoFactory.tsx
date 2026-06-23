import React from 'react';
import { DemoButtonComponentColors, DemoEmotionColors, DocsSection } from '../../../../docs';
import { Sizes } from '../../../constants';
import { type ButtonStyleProps } from '../../../types';
import { Flex } from '../../Flex';
import { Icon } from '../../Icon';
import { VisuallyHidden } from '../../VisuallyHidden';
import ButtonLink from '../ButtonLink';

const ButtonLinkDemoFactory = ({ ...props }: ButtonStyleProps) => {
  const sizes = Object.values(Sizes);
  const buttonColors = Object.values(DemoButtonComponentColors);
  const emotionColors = Object.values(DemoEmotionColors);
  const colors = [...buttonColors, ...emotionColors];

  return (
    <>
      {sizes.map((size) => (
        <DocsSection key={size} title={`Size ${size}`} container="none" hasPadding={false}>
          {colors.map((color) => (
            <Flex key={color} alignmentX="left" spacing="space-300" isWrapping>
              <ButtonLink href="#" size={size} color={color} {...props}>
                {`Button ${color}`}
              </ButtonLink>{' '}
              <ButtonLink href="#" size={size} color={color} {...props}>
                <Icon name="link" />
                Menu
              </ButtonLink>{' '}
              <ButtonLink href="#" size={size} color={color} isSymmetrical {...props}>
                <Icon name="link" />
                <VisuallyHidden>Link</VisuallyHidden>
              </ButtonLink>
            </Flex>
          ))}
        </DocsSection>
      ))}
    </>
  );
};

export default ButtonLinkDemoFactory;
