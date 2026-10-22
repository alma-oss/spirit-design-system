'use client';

import {
  Button,
  Divider,
  Flex,
  Link,
  SegmentedControl,
  SegmentedControlItem,
  Select,
  Stack,
  Text,
  TextField,
  Toggle,
} from '@alma-oss/spirit-web-react';
import classNames from 'classnames';
import { type ComponentType, type ReactNode, useId, useState } from 'react';
import {
  isPlaygroundComponentName,
  type PlaygroundComponentName,
  type PlaygroundConfig,
  type PlaygroundControl,
} from './playgroundConfig';
import { buildCode, getSnippetAttributes } from './playgroundSnippet';
import './ComponentPlayground.scss';

type PlaygroundValue = string | boolean;

interface PlaygroundComponentProps {
  children?: ReactNode;
  [key: string]: unknown;
}

const DEVICES = {
  desktop: 'Desktop',
  tablet: 'Tablet',
  mobile: 'Mobile',
} as const;

type Device = keyof typeof DEVICES;

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

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

// Components are looked up by name because props crossing the server/client boundary must be serializable.
const registry: Record<PlaygroundComponentName, ComponentType<PlaygroundComponentProps>> = {
  Button: Button as ComponentType<PlaygroundComponentProps>,
};

const getInitialValues = (controls: PlaygroundControl[]) =>
  Object.fromEntries(controls.map((control) => [control.name, control.defaultValue ?? false]));

const ComponentPlayground = ({ component, controls, storybookUrl = '', figmaUrl = '' }: PlaygroundConfig) => {
  const id = useId();
  const [values, setValues] = useState<Record<string, PlaygroundValue>>(() => getInitialValues(controls));
  const [device, setDevice] = useState<Device>('desktop');
  const [isCopied, setIsCopied] = useState(false);
  // Spirit Toggle keeps its own checked state, so it has to be remounted for the reset to show.
  const [resetCount, setResetCount] = useState(0);

  const PlaygroundComponent = isPlaygroundComponentName(component) ? registry[component] : undefined;
  const { children: childrenValue, ...componentProps } = values;
  const codeLines = buildCode(component, getSnippetAttributes(controls, values), String(childrenValue ?? ''));

  const setValue = (name: string, value: PlaygroundValue) => setValues((previous) => ({ ...previous, [name]: value }));

  const resetValues = () => {
    setValues(getInitialValues(controls));
    setResetCount((count) => count + 1);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeLines.join('\n'));
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  if (!PlaygroundComponent) {
    return null;
  }

  return (
    <div className="ComponentPlayground">
      <div className="ComponentPlayground__main">
        <Flex alignmentX="center">
          <SegmentedControl
            label="Preview size"
            name={`${id}-device`}
            selectedValue={device}
            setSelectedValue={(value: string | string[]) =>
              setDevice((Array.isArray(value) ? value[0] : value) as Device)
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

        <div className="ComponentPlayground__preview">
          <div
            className={classNames('ComponentPlayground__stage', {
              'ComponentPlayground__stage--tablet': device === 'tablet',
              'ComponentPlayground__stage--mobile': device === 'mobile',
            })}
          >
            <PlaygroundComponent {...componentProps}>{String(childrenValue ?? '')}</PlaygroundComponent>
          </div>
        </div>

        <div className="ComponentPlayground__code">
          <pre className="ComponentPlayground__snippet typography-code-small-regular">
            <code>{codeLines.join('\n')}</code>
          </pre>
          <div className="ComponentPlayground__copy">
            <Button color="secondary" size="small" onClick={copyCode}>
              {isCopied ? 'Copied' : 'Copy code'}
            </Button>
          </div>
        </div>
      </div>

      <aside className="ComponentPlayground__panel" aria-label="Properties">
        <Stack spacing="space-900">
          <Flex alignmentX="space-between" alignmentY="center">
            <Text elementType="p" size="small" textColor="secondary" marginBottom="space-0">
              Appearance
            </Text>
            {/* Spirit Link renders a real button here; the a11y rule only sees the component name. */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link elementType="button" type="button" onClick={resetValues}>
              Reset
            </Link>
          </Flex>

          <Stack spacing="space-700">
            {controls.map((control) => {
              const controlId = `${id}-${control.name}`;
              const value = values[control.name];

              if (control.type === 'boolean') {
                return (
                  <Toggle
                    key={`${control.name}-${resetCount}`}
                    id={controlId}
                    label={control.name}
                    isChecked={Boolean(value)}
                    onChange={(event) => setValue(control.name, event.target.checked)}
                  />
                );
              }

              if (control.type === 'select') {
                return (
                  <Select
                    key={control.name}
                    id={controlId}
                    name={controlId}
                    size="small"
                    label={control.name}
                    isRequired={control.isRequired}
                    value={String(value)}
                    onChange={(event) => setValue(control.name, (event.target as HTMLSelectElement).value)}
                  >
                    {control.options.map((option) => (
                      <option key={option} value={option}>
                        {capitalize(option)}
                      </option>
                    ))}
                  </Select>
                );
              }

              return (
                <TextField
                  key={control.name}
                  id={controlId}
                  name={controlId}
                  size="small"
                  label={control.name}
                  isRequired={control.isRequired}
                  value={String(value)}
                  onChange={(event) => setValue(control.name, (event.target as HTMLInputElement).value)}
                />
              );
            })}
          </Stack>
        </Stack>

        {(storybookUrl || figmaUrl) && (
          <>
            <Divider />
            <Stack spacing="space-700">
              {figmaUrl && (
                <div className="ComponentPlayground__action">
                  <Button
                    elementType="a"
                    href={figmaUrl}
                    target="_blank"
                    rel="noreferrer"
                    color="tertiary"
                    size="small"
                  >
                    Open in Figma
                  </Button>
                </div>
              )}
              {storybookUrl && (
                <Flex alignmentX="center">
                  <Link href={storybookUrl} target="_blank" rel="noreferrer" underlined="always">
                    Open in Storybook
                  </Link>
                </Flex>
              )}
            </Stack>
          </>
        )}
      </aside>
    </div>
  );
};

export default ComponentPlayground;
