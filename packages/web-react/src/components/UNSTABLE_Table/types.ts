import { type SpiritDetailedHTMLProps, type StyleProps, type TransferProps } from '../../types/shared';

export interface UnstableTableProps extends StyleProps, TransferProps {
  isStriped?: boolean;
  isBordered?: boolean;
  isCompact?: boolean;
  isHoverable?: boolean;
  isResponsive?: boolean;
}

export interface SpiritTableProps extends UnstableTableProps, SpiritDetailedHTMLProps<HTMLTableElement> {}
