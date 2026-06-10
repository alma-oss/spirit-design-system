import { renderHook } from '@testing-library/react';
import { Direction, ShapeVariants } from '../../../constants';
import { type SpiritNavigationActionProps } from '../../../types';
import { useNavigationStyleProps } from '../useNavigationStyleProps';

const navigationActionVariantDataProvider = [
  {
    variant: ShapeVariants.BOX,
    className: 'NavigationAction--box',
    description: 'box variant',
  },
  {
    variant: ShapeVariants.PILL,
    className: 'NavigationAction--pill',
    description: 'pill variant',
  },
];

describe('useNavigationStyleProps', () => {
  it('should return defaults', () => {
    const props: SpiritNavigationActionProps = {};
    const { result } = renderHook(() => useNavigationStyleProps(props));

    expect(result.current.classProps.root).toBe('Navigation Navigation--horizontal');
    expect(result.current.classProps.action).toBe('NavigationAction NavigationAction--box');
    expect(result.current.classProps.avatar).toBe('NavigationAvatar');
    expect(result.current.classProps.item).toBe('NavigationItem NavigationItem--alignmentYCenter');
    expect(result.current.classProps.slot).toBe('NavigationAction__slot');
  });

  it.each(navigationActionVariantDataProvider)(
    'should return disabled class for $description',
    ({ variant, className }) => {
      const props: SpiritNavigationActionProps = { isDisabled: true, variant };
      const { result } = renderHook(() => useNavigationStyleProps(props));

      expect(result.current.classProps.action).toBe(`NavigationAction ${className} NavigationAction--disabled`);
    },
  );

  it.each(navigationActionVariantDataProvider)(
    'should return selected class for $description',
    ({ variant, className }) => {
      const props = { isSelected: true, variant };
      const { result } = renderHook(() => useNavigationStyleProps(props));

      expect(result.current.classProps.action).toBe(`NavigationAction ${className} NavigationAction--selected`);
    },
  );

  it('should return pill variant default class', () => {
    const props = { variant: ShapeVariants.PILL };
    const { result } = renderHook(() => useNavigationStyleProps(props));

    expect(result.current.classProps.action).toBe('NavigationAction NavigationAction--pill');
  });

  it('should return square class', () => {
    const props = { isSquare: true };
    const { result } = renderHook(() => useNavigationStyleProps(props));

    expect(result.current.classProps.avatar).toBe('NavigationAvatar NavigationAvatar--square');
  });

  it('should return alignment class', () => {
    const props = { alignmentY: 'stretch' };
    const { result } = renderHook(() => useNavigationStyleProps(props));

    expect(result.current.classProps.item).toBe('NavigationItem NavigationItem--alignmentYStretch');
  });

  it('should return correct class if navigation is vertical', () => {
    const props = { direction: Direction.VERTICAL };
    const { result } = renderHook(() => useNavigationStyleProps(props));

    expect(result.current.classProps.root).toBe('Navigation Navigation--vertical');
  });
});
