'use client';

import React from 'react';
import { useDisclosureState } from '../../hooks';
import { type SpiritUncontrolledCollapseProps } from '../../types';
import Collapse from './Collapse';
import { useCollapseAriaProps } from './useCollapseAriaProps';

const defaultProps = {
  isOpen: false,
};

const UncontrolledCollapse = (props: SpiritUncontrolledCollapseProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    children,
    /** @deprecated "hideOnCollapse" property will be replaced in the next major version. Please use "isDisposable" instead. */
    hideOnCollapse,
    isDisposable,
    renderTrigger,
    ...restProps
  } = propsWithDefaults;
  const { isExpanded, toggle } = useDisclosureState({ defaultExpanded: restProps.isOpen });
  const { ariaProps } = useCollapseAriaProps({ ...restProps, isOpen: isExpanded });

  const isDisposed = hideOnCollapse || isDisposable;

  const triggerRenderHandler = () => {
    const showTrigger = isDisposed ? !(isDisposed && isExpanded) : true;

    return renderTrigger && showTrigger
      ? renderTrigger({
          isOpen: isExpanded,
          ...ariaProps.trigger,
          onClick: toggle,
        })
      : null;
  };

  return (
    <>
      {triggerRenderHandler()}
      {isDisposed && isExpanded ? (
        children
      ) : (
        <Collapse {...restProps} isOpen={isExpanded}>
          {children}
        </Collapse>
      )}
    </>
  );
};

UncontrolledCollapse.spiritComponent = 'UncontrolledCollapse';

export default UncontrolledCollapse;
