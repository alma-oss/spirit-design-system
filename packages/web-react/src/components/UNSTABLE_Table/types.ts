import { type SpiritDetailedHTMLProps, type StyleProps } from '../../types/shared';

export interface UnstableTableProps extends StyleProps {
  isStriped?: boolean;
  isBordered?: boolean;
  isCompact?: boolean;
  isHoverable?: boolean;
  isResponsive?: boolean;
}

export interface SpiritTableProps extends UnstableTableProps, SpiritDetailedHTMLProps<HTMLTableElement> {}
