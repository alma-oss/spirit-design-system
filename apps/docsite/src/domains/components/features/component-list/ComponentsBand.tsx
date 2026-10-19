import { type ChildrenProps, Container } from '@alma-oss/spirit-web-react';
import classNames from 'classnames';
import React from 'react';
import './ComponentsBand.scss';

type ComponentsBandVariant = 'header' | 'heading' | 'grid';

interface ComponentsBandProps extends ChildrenProps {
  variant?: ComponentsBandVariant;
}

// A full-width block of the components page. The container inside carries the vertical lines on the whole height of
// the block. The header block is closed with a full-width line.
const ComponentsBand = ({ variant = 'grid', children }: ComponentsBandProps) => (
  <div className={classNames('ComponentsBand', { 'ComponentsBand--header': variant === 'header' })}>
    <Container
      size="xlarge"
      UNSAFE_className={classNames('ComponentsBand__container', {
        'ComponentsBand__container--header': variant === 'header',
        'ComponentsBand__container--heading': variant === 'heading',
        'ComponentsBand__container--grid': variant === 'grid',
      })}
    >
      {children}
    </Container>
  </div>
);

export default ComponentsBand;
