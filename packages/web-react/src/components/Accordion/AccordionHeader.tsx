'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type AccordionHeaderProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritAccordionHeaderProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { Icon } from '../Icon';
import { useAccordionContext } from './AccordionContext';
import { useAccordionItemContext } from './AccordionItemContext';
import { useAccordionAriaProps } from './useAccordionAriaProps';
import { useAccordionStyleProps } from './useAccordionStyleProps';
import { useOpenItem } from './useOpenItem';

const defaultProps: Partial<SpiritAccordionHeaderProps> = {
  elementType: 'h3',
};

const _AccordionHeader = <T extends ElementType = 'h3'>(
  props: SpiritAccordionHeaderProps<T>,
  ref: PolymorphicRef<T>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = 'h3', children, slot, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

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

const AccordionHeader = forwardRef(_AccordionHeader) as unknown as PolymorphicComponent<'h3', AccordionHeaderProps>;

AccordionHeader.spiritComponent = 'AccordionHeader';
AccordionHeader.displayName = 'AccordionHeader';

export default AccordionHeader;
