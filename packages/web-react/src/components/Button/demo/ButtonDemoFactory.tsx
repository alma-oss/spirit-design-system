import React from 'react';
import { DemoButtonComponentColors, DemoEmotionColors } from '../../../../docs/constants';
import DocsSection from '../../../../docs/DocsSection';
import { Sizes } from '../../../constants';
import { type ButtonBaseProps } from '../../../types';
import { Icon } from '../../Icon';
import { VisuallyHidden } from '../../VisuallyHidden';
import Button from '../Button';

const ButtonDemoFactory = ({ ...props }: ButtonBaseProps) => {
  const sizes = Object.values(Sizes);
  const buttonColors = Object.values(DemoButtonComponentColors);
  const emotionColors = Object.values(DemoEmotionColors);
  const colors = [...buttonColors, ...emotionColors];

  return (
    <>
      {sizes.map((size) => (
        <DocsSection key={size} title={`Size ${size}`} container="none" hasPadding={false}>
          {colors.map((color) => (
            <div key={color}>
              <Button elementType="a" href="#" size={size} color={color} {...props}>
                {`Button ${color}`}
              </Button>{' '}
              <Button size={size} color={color} {...props}>
                <Icon name="hamburger" />
                Menu
              </Button>{' '}
              <Button size={size} color={color} isSymmetrical {...props}>
                <Icon name="hamburger" />
                <VisuallyHidden>Menu</VisuallyHidden>
              </Button>
            </div>
          ))}
        </DocsSection>
      ))}
    </>
  );
};

export default ButtonDemoFactory;
