import { useClassNamePrefix } from '../../hooks';

export const useAccordionStyleProps = () => {
  const accordionClass = useClassNamePrefix('Accordion');
  const accordionItemClass = `${accordionClass}__item`;
  const accordionItemHeaderClass = `${accordionClass}__itemHeader`;
  const accordionItemToggleClass = `${accordionClass}__itemToggle`;
  const accordionItemSideClass = `${accordionClass}__itemSide`;
  const accordionItemSlotClass = `${accordionClass}__itemSlot`;
  const accordionItemIconClass = `${accordionClass}__itemIcon`;
  const accordionItemContentClass = `${accordionClass}__content`;

  return {
    classProps: {
      root: accordionClass,
      item: accordionItemClass,
      header: accordionItemHeaderClass,
      toggle: accordionItemToggleClass,
      side: accordionItemSideClass,
      slot: accordionItemSlotClass,
      icon: accordionItemIconClass,
      content: accordionItemContentClass,
    },
  };
};
