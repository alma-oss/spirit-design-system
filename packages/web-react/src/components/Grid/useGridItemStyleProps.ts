import { type CSSProperties, type ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type GridItemPosition, type GridItemPositionBreakpoints, type SpiritGridItemProps } from '../../types';

interface GridItemCSSProperties extends CSSProperties {
  [key: string]: string | undefined | number;
}

const setStyleProperty = (styleObject: GridItemCSSProperties, propertyName: string, value: string | undefined) => {
  // eslint-disable-next-line no-param-reassign -- Intentional mutation for style object building
  (styleObject as Record<string, string | undefined>)[propertyName] = value;
};

const setGridItemStyle = (styleObject: GridItemCSSProperties, baseVarName: string, propValue: GridItemPosition) => {
  if (typeof propValue === 'object' && propValue !== null) {
    Object.keys(propValue).forEach((key) => {
      const suffix = key === 'mobile' ? '' : `-${key}`;
      const propName = `--${baseVarName}${suffix}`;
      setStyleProperty(styleObject, propName, propValue[key as keyof GridItemPositionBreakpoints]?.toString());
    });
  } else {
    const propName = `--${baseVarName}`;
    setStyleProperty(styleObject, propName, propValue?.toString());
  }
};

export interface GridItemStyle<T> {
  /** className props */
  classProps: string;
  /** Props for the grid element. */
  props: T;
  /** Style props for the grid element */
  styleProps: GridItemCSSProperties;
}

export function useGridItemStyleProps(
  props: SpiritGridItemProps<ElementType>,
): GridItemStyle<SpiritGridItemProps<ElementType>> {
  const gridItemClass = useClassNamePrefix('GridItem');
  const gridItemStyle: GridItemCSSProperties = {};
  const mutableProps = { ...props } as Record<string, unknown> & SpiritGridItemProps<ElementType>;

  const typePropNames = Object.keys(mutableProps).filter(
    (propName) => propName.startsWith('column') || propName.startsWith('row'),
  );

  typePropNames.forEach((propName) => {
    const type = propName.startsWith('column') ? 'column' : 'row';
    const value = mutableProps[propName];

    if (value) {
      setGridItemStyle(
        gridItemStyle,
        `grid-item-${type}-${propName.replace(type, '').toLowerCase()}`,
        value as GridItemPosition,
      );
    }

    delete mutableProps[propName];
  });

  return {
    classProps: gridItemClass,
    props: mutableProps as SpiritGridItemProps<ElementType>,
    styleProps: gridItemStyle,
  };
}
