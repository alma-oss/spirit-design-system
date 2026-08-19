'use client';

import React from 'react';
import { type SpiritUncontrolledCollapseProps } from '../../types';
import Collapse from './Collapse';
import { useCollapse } from './useCollapse';

const defaultProps = {
  isOpen: false,
};

const UncontrolledCollapse = (props: SpiritUncontrolledCollapseProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, isDisposable, renderTrigger, ...restProps } = propsWithDefaults;
  const { isOpen, toggle, ariaProps } = useCollapse(restProps.isOpen, { id: restProps.id });

  const triggerRenderHandler = () => {
    const showTrigger = isDisposable ? !(isDisposable && isOpen) : true;

    return renderTrigger && showTrigger
      ? renderTrigger({
          isOpen,
          ...ariaProps.trigger,
          onClick: toggle,
        })
      : null;
  };

  return (
    <>
      {triggerRenderHandler()}
      {isDisposable && isOpen ? (
        children
      ) : (
        <Collapse {...restProps} {...ariaProps.panel} isOpen={isOpen}>
          {children}
        </Collapse>
      )}
    </>
  );
};

UncontrolledCollapse.spiritComponent = 'UncontrolledCollapse';

export default UncontrolledCollapse;
