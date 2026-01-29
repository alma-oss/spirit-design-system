'use client';

import React, { forwardRef, type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type AccordionHeaderProps, type PolymorphicRef, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { Icon } from '../Icon';
import { useAccordionContext } from './AccordionContext';
import { useAccordionItemContext } from './AccordionItemContext';
import { useAccordionAriaProps } from './useAccordionAriaProps';
import { useAccordionStyleProps } from './useAccordionStyleProps';
import { useOpenItem } from './useOpenItem';

const defaultProps: Partial<AccordionHeaderProps> = {
  elementType: 'h3',
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_AccordionHeader'] }] */
const _AccordionHeader = <T extends ElementType = 'h3'>(
  props: AccordionHeaderProps<T>,
  ref: PolymorphicRef<T>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = 'h3', children, slot, ...restProps } = propsWithDefaults;
  
  const Component = elementType as React.ElementType;
  
  const { classProps } = useAccordionStyleProps();
  const { toggle } = useAccordionContext();
  const { id } = useAccordionItemContext();
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const { isOpen } = useOpenItem(id);
  const { triggerProps, headerProps } = useAccordionAriaProps({ id, isOpen });
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps: classProps.header,
    styleProps,
  });

  const itemToggle = () => {
    if (toggle && id) {
      toggle(id);
    }
  };

  return (
    <Component {...transferProps} {...mergedStyleProps} {...headerProps} ref={ref}>
      <button type="button" className={classProps.toggle} onClick={itemToggle} {...triggerProps}>
        {children}
      </button>
      <span className={classProps.side}>
        {slot && <span className={classProps.slot}>{slot}</span>}
        <span className={classProps.icon}>
          <Icon name="chevron-down" />
        </span>
      </span>
    </Component>
  );
};

const AccordionHeader = forwardRef(_AccordionHeader) as unknown as (<T extends ElementType = 'h3'>(
  props: AccordionHeaderProps<T> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

AccordionHeader.spiritComponent = 'AccordionHeader';
AccordionHeader.displayName = 'AccordionHeader';

export default AccordionHeader;
