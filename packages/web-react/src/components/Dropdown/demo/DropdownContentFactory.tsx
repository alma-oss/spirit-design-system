import React from 'react';
import { Icon } from '../../Icon';
import { Item } from '../../Item';
import { Label } from '../../Label';

type Props = {
  content: Content[];
};

type Content = {
  icon: string;
  text: string;
};

const DropdownContentFactory = ({ content }: Props) => (
  <>
    {content.map(({ icon, text }) => (
      <Item key={icon} elementType="a" startSlot={<Icon name={icon} />} href={`#${icon}`}>
        <Label>{text}</Label>
      </Item>
    ))}
  </>
);

export default DropdownContentFactory;
