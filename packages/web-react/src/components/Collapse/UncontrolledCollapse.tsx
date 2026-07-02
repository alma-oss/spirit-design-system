'use client';

import React from 'react';
import { type SpiritUncontrolledCollapseProps } from '../../types';
import Collapse from './Collapse';
import { useCollapse } from './useCollapse';
import { useCollapseAriaProps } from './useCollapseAriaProps';

const defaultProps = {
  isOpen: false,
};

const UncontrolledCollapse = (props: SpiritUncontrolledCollapseProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, isDisposable, renderTrigger, ...restProps } = propsWithDefaults;
  const { isOpen, toggleHandler } = useCollapse(restProps.isOpen);
  const { ariaProps } = useCollapseAriaProps({ ...restProps, isOpen });

  const triggerRenderHandler = () => {
    const showTrigger = isDisposable ? !(isDisposable && isOpen) : true;

    return renderTrigger && showTrigger
      ? renderTrigger({
          isOpen,
          onClick: toggleHandler,
          ...ariaProps.trigger,
        })
      : null;
  };

  return (
    <>
      {triggerRenderHandler()}
      {isDisposable && isOpen ? (
        children
      ) : (
        <Collapse {...restProps} isOpen={isOpen}>
          {children}
        </Collapse>
      )}
    </>
  );
};

UncontrolledCollapse.spiritComponent = 'UncontrolledCollapse';

export default UncontrolledCollapse;
