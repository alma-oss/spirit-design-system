import React from 'react';
import { SizesExtended } from '../../../constants';
import { ControlButton } from '../../ControlButton';
import { Icon } from '../../Icon';
import { Tag, TagColorsExtended } from '..';

const sizes = [SizesExtended.XSMALL, SizesExtended.SMALL, SizesExtended.MEDIUM] as const;

const TagWithControlButton = () => (
  <>
    {sizes.map((size) => (
      <Tag key={size} color={TagColorsExtended.SELECTED} size={size} elementType="div">
        <span>Tag {size}</span>
        <ControlButton
          size={size === SizesExtended.XSMALL ? 'small' : size}
          isSymmetrical
          isSubtle
          aria-label={`Remove Tag ${size}`}
        >
          <Icon name="close" boxSize={16} />
        </ControlButton>
      </Tag>
    ))}
  </>
);

export default TagWithControlButton;
