import { type DisclosureAria, type DisclosureState, useDeprecationMessage, useDisclosureAria } from '../../hooks';
import { type BaseCollapseProps, type CollapseProps } from '../../types';

export interface CollapseAria {
  ariaProps: {
    /** trigger returned props */
    trigger: DisclosureAria['triggerProps'];
    /** panel returned props */
    panel: DisclosureAria['panelProps'];
  };
  props: BaseCollapseProps;
}

export const useCollapseAriaProps = (props: CollapseProps): CollapseAria => {
  const { isOpen, ...modifiedProps } = props;

  const state: DisclosureState = {
    isExpanded: isOpen ?? false,
    setExpanded: () => {},
    expand: () => {},
    collapse: () => {},
    toggle: () => {},
  };

  const { triggerProps, panelProps } = useDisclosureAria({ id: modifiedProps.id }, state);

  useDeprecationMessage({
    method: 'custom',
    trigger: !modifiedProps.id,
    componentName: 'Collapse',
    customText: 'The "id" property will be required instead of optional starting from the next major version.',
  });

  return {
    ariaProps: {
      trigger: triggerProps,
      panel: panelProps,
    },
    props: modifiedProps,
  };
};
