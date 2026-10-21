import { type ChildrenProps, Container } from '@alma-oss/spirit-web-react';
import classNames from 'classnames';
import React from 'react';
import { COMPONENTS_BAND_VARIANTS, type ComponentsBandVariant } from './constants';
import './ComponentsBand.scss';

interface ComponentsBandProps extends ChildrenProps {
  variant?: ComponentsBandVariant;
}

// A full-width block of the components page. The container inside carries the vertical lines on the whole height of
// the block. The header block is closed with a full-width line.
const ComponentsBand = ({ variant = COMPONENTS_BAND_VARIANTS.GRID, children }: ComponentsBandProps) => (
  <div
    className={classNames('ComponentsBand', {
      'ComponentsBand--header': variant === COMPONENTS_BAND_VARIANTS.HEADER,
    })}
  >
    <Container
      size="xlarge"
      UNSAFE_className={classNames('ComponentsBand__container', {
        'ComponentsBand__container--header': variant === COMPONENTS_BAND_VARIANTS.HEADER,
        'ComponentsBand__container--heading': variant === COMPONENTS_BAND_VARIANTS.HEADING,
        'ComponentsBand__container--grid': variant === COMPONENTS_BAND_VARIANTS.GRID,
      })}
    >
      {children}
    </Container>
  </div>
);

export default ComponentsBand;
