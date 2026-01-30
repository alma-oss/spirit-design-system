import React, { Fragment } from 'react';
import DocsBox from '../../../../docs/DocsBox';
import { Stack } from '../../Stack';

type MatrixItemFactoryProps = {
  hasStack?: boolean;
  itemKey?: string;
  items: string[];
};

const MatrixItemFactory = ({ items, itemKey, hasStack }: MatrixItemFactoryProps) => {
  const Wrapper = hasStack ? Stack : Fragment;

  return (
    <Wrapper {...(hasStack ? { hasSpacing: true } : {})}>
      {items.map((item, index) => {
        const key = `docs-box-${itemKey}-${index}`;

        return (
          <DocsBox key={key} isMultiline>
            {item}
          </DocsBox>
        );
      })}
    </Wrapper>
  );
};
export default MatrixItemFactory;
