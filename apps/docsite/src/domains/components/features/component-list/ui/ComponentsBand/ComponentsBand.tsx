import { type ChildrenProps, Container } from '@alma-oss/spirit-web-react';
import classNames from 'classnames';
import React from 'react';
import { COMPONENTS_BAND_VARIANTS, type ComponentsBandVariant } from './constants';
import './ComponentsBand.scss';

interface ComponentsBandProps extends ChildrenProps {
  variant?: ComponentsBandVariant;
}

// A full-width block of a components page. The container inside carries the vertical lines on the whole height of
// the block. Listing variants (`header`, `heading`, `grid`) keep their lines. Detail variants add the header that
// flows into the tabs, the tab strip, and content blocks divided inside the container.
const ComponentsBand = ({ variant = COMPONENTS_BAND_VARIANTS.GRID, children }: ComponentsBandProps) => (
  <div
    className={classNames('ComponentsBand', {
      'ComponentsBand--header': variant === COMPONENTS_BAND_VARIANTS.HEADER,
      'ComponentsBand--tabs': variant === COMPONENTS_BAND_VARIANTS.TABS,
      'ComponentsBand--content': variant === COMPONENTS_BAND_VARIANTS.CONTENT,
    })}
  >
    <Container
      size="xlarge"
      UNSAFE_className={classNames('ComponentsBand__container', {
        'ComponentsBand__container--header': variant === COMPONENTS_BAND_VARIANTS.HEADER,
        'ComponentsBand__container--heading': variant === COMPONENTS_BAND_VARIANTS.HEADING,
        'ComponentsBand__container--grid': variant === COMPONENTS_BAND_VARIANTS.GRID,
        'ComponentsBand__container--detailHeader': variant === COMPONENTS_BAND_VARIANTS.DETAIL_HEADER,
        'ComponentsBand__container--tabs': variant === COMPONENTS_BAND_VARIANTS.TABS,
        'ComponentsBand__container--content': variant === COMPONENTS_BAND_VARIANTS.CONTENT,
      })}
    >
      {children}
    </Container>
  </div>
);

export default ComponentsBand;
