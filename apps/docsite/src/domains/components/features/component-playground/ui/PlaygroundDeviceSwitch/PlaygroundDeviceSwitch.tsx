import { Flex, SegmentedControl, SegmentedControlItem } from '@alma-oss/spirit-web-react';
import { type ReactNode } from 'react';

const DEVICES = {
  desktop: 'Desktop',
  tablet: 'Tablet',
  mobile: 'Mobile',
} as const;

export type Device = keyof typeof DEVICES;

const iconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

const DEVICE_ICONS: Record<Device, ReactNode> = {
  desktop: (
    <svg {...iconProps}>
      <rect x="1.75" y="2.25" width="12.5" height="8.5" rx="1" />
      <path d="M5.5 13.75h5M8 10.75v3" />
    </svg>
  ),
  tablet: (
    <svg {...iconProps}>
      <rect x="2.75" y="1.75" width="10.5" height="12.5" rx="1.25" />
      <path d="M7 12.25h2" />
    </svg>
  ),
  mobile: (
    <svg {...iconProps}>
      <rect x="4.25" y="1.75" width="7.5" height="12.5" rx="1.25" />
      <path d="M7 12.25h2" />
    </svg>
  ),
};

interface PlaygroundDeviceSwitchProps {
  id: string;
  device: Device;
  onDeviceChange: (device: Device) => void;
}

const PlaygroundDeviceSwitch = ({ id, device, onDeviceChange }: PlaygroundDeviceSwitchProps) => (
  <Flex alignmentX="center">
    <SegmentedControl
      label="Preview size"
      name={`${id}-device`}
      selectedValue={device}
      setSelectedValue={(value: string | string[]) =>
        onDeviceChange((Array.isArray(value) ? value[0] : value) as Device)
      }
      variant="fill"
    >
      {(Object.keys(DEVICES) as Device[]).map((key) => (
        <SegmentedControlItem key={key} id={`${id}-device-${key}`} value={key} aria-label={DEVICES[key]}>
          {DEVICE_ICONS[key]}
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  </Flex>
);

export default PlaygroundDeviceSwitch;
