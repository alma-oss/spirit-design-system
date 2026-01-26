import React from 'react';
import type { IconBoxStyleProps } from '../../../types';
import { Flex } from '../../Flex';
import IconBox from '../IconBox';

type IconBoxDemoFactoryProps = IconBoxStyleProps & {
  label: string;
};

const IconBoxDemoFactory = ({ label, ...iconBoxProps }: IconBoxDemoFactoryProps) => (
  <Flex
    direction="vertical"
    spacingY="space-500"
    alignmentX={{ mobile: 'left', desktop: 'center' }}
    alignmentY="center"
  >
    <h3>{label}</h3>
    <IconBox {...iconBoxProps} />
  </Flex>
);

export default IconBoxDemoFactory;
