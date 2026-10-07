'use client';

import {
  Button,
  Divider,
  Link,
  Select,
  SegmentedControl,
  SegmentedControlItem,
  TextField,
  Toggle,
} from '@alma-oss/spirit-web-react';
import { type ComponentType, type ReactNode, useId, useState } from 'react';
import styles from './ComponentPlayground.module.scss';

type PlaygroundValue = string | boolean;

interface SelectControl {
  name: string;
  type: 'select';
  options: string[];
  defaultValue: string;
  isRequired?: boolean;
}

interface TextControl {
  name: string;
  type: 'text';
  defaultValue: string;
  isRequired?: boolean;
}

interface BooleanControl {
  name: string;
  type: 'boolean';
  defaultValue?: boolean;
}

export type PlaygroundControl = SelectControl | TextControl | BooleanControl;

export interface PlaygroundConfig {
  component: string;
  controls: PlaygroundControl[];
  /** Link to the component's Storybook, shown below the controls. */
  storybookUrl?: string;
  /** Link to the component in Figma, shown below the controls. */
  figmaUrl?: string;
}

const DEVICES = {
  desktop: { label: 'Desktop', width: '100%' },
  tablet: { label: 'Tablet', width: '48rem' },
  mobile: { label: 'Mobile', width: '23.4375rem' },
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

// Components are looked up by name because MDX props crossing the server/client boundary must be serializable.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registry: Record<string, ComponentType<any>> = { Button };

const getInitialValues = (controls: PlaygroundControl[]) =>
  Object.fromEntries(controls.map((control) => [control.name, control.defaultValue ?? false]));

interface SnippetAttribute {
  name: string;
  value?: string;
}

const getAttributes = (controls: PlaygroundControl[], values: Record<string, PlaygroundValue>): SnippetAttribute[] =>
  controls
    .filter((control) => control.name !== 'children' && values[control.name] !== (control.defaultValue ?? false))
    .map((control) => {
      const value = values[control.name];

      return typeof value === 'boolean' ? { name: control.name } : { name: control.name, value: String(value) };
    });

const formatAttribute = ({ name, value }: SnippetAttribute) => (value === undefined ? name : `${name}="${value}"`);

const importLine = (what: string, from: string) => (what ? `import ${what} from '${from}';` : `import '${from}';`);

const IMPORT_LINES = ['themes', 'foundation', 'components', 'helpers', 'utilities'].map((name) =>
  importLine('', `@alma-oss/spirit-web/css/${name}.css`),
);

const buildCode = (component: string, attributes: SnippetAttribute[], children: string) => {
  const isMultiline = attributes.length > 2;
  const jsx = isMultiline
    ? [
        `<${component}`,
        ...attributes.map((attribute) => `  ${formatAttribute(attribute)}`),
        '>',
        `  ${children}`,
        `</${component}>`,
      ]
    : [`${[`<${component}`, ...attributes.map(formatAttribute)].join(' ')}>${children}</${component}>`];

  return [
    importLine('React', 'react'),
    importLine(`{ ${component} }`, '@alma-oss/spirit-web-react'),
    ...IMPORT_LINES,
    '',
    'export default function Example() {',
    '  return (',
    ...jsx.map((line) => `    ${line}`),
    '  );',
    '}',
  ];
};

const ComponentPlayground = ({ component, controls, storybookUrl = '', figmaUrl = '' }: PlaygroundConfig) => {
  const id = useId();
  const [values, setValues] = useState<Record<string, PlaygroundValue>>(() => getInitialValues(controls));
  const [device, setDevice] = useState<Device>('desktop');
  const [isCopied, setIsCopied] = useState(false);
  // Spirit Toggle keeps its own checked state, so it has to be remounted for the reset to show.
  const [resetCount, setResetCount] = useState(0);

  const Component = registry[component];
  const { children: childrenValue, ...componentProps } = values;
  const codeLines = buildCode(component, getAttributes(controls, values), String(childrenValue ?? ''));

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

  return (
    <div className={styles.ComponentPlayground}>
      <div className={styles.ComponentPlayground__main}>
        <div className={styles.ComponentPlayground__devices}>
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
              <SegmentedControlItem key={key} id={`${id}-device-${key}`} value={key} aria-label={DEVICES[key].label}>
                {DEVICE_ICONS[key]}
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        </div>

        <div className={styles.ComponentPlayground__preview}>
          <div className={styles.ComponentPlayground__stage} style={{ maxWidth: DEVICES[device].width }}>
            <Component {...componentProps}>{String(childrenValue ?? '')}</Component>
          </div>
        </div>

        <div className={styles.ComponentPlayground__code}>
          <pre className={styles.ComponentPlayground__snippet}>
            <code>{codeLines.join('\n')}</code>
          </pre>
          <Button color="secondary" size="small" onClick={copyCode}>
            {isCopied ? 'Copied' : 'Copy code'}
          </Button>
        </div>
      </div>

      <aside className={styles.ComponentPlayground__panel} aria-label="Properties">
        <div className={styles.ComponentPlayground__group}>
          <div className={styles.ComponentPlayground__panelHeader}>
            <h3 className={styles.ComponentPlayground__panelTitle}>Appearance</h3>
            {/* Spirit Link renders a real <button> here, the a11y rule only sees the component name. */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link
              elementType="button"
              type="button"
              onClick={resetValues}
              UNSAFE_className={styles.ComponentPlayground__reset}
            >
              Reset
            </Link>
          </div>

          <div className={styles.ComponentPlayground__controls}>
            {controls.map((control) => {
              const controlId = `${id}-${control.name}`;
              const value = values[control.name];
              const isRequired = control.type !== 'boolean' && control.isRequired;

              return (
                <div key={control.name} className={styles.ComponentPlayground__row}>
                  {control.type === 'boolean' ? (
                    <>
                      <label className={styles.ComponentPlayground__label} htmlFor={controlId}>
                        {control.name}
                      </label>
                      <Toggle
                        key={resetCount}
                        id={controlId}
                        label={control.name}
                        isLabelHidden
                        isChecked={Boolean(value)}
                        onChange={(event) => setValue(control.name, event.target.checked)}
                      />
                    </>
                  ) : (
                    <>
                      <label className={styles.ComponentPlayground__label} htmlFor={controlId}>
                        {control.name}
                        {isRequired && '*'}
                      </label>
                      <div className={styles.ComponentPlayground__field}>
                        {control.type === 'select' ? (
                          <Select
                            id={controlId}
                            name={controlId}
                            isLabelHidden
                            size="small"
                            label={control.name}
                            value={String(value)}
                            onChange={(event) => setValue(control.name, (event.target as HTMLSelectElement).value)}
                          >
                            {control.options.map((option) => (
                              <option key={option} value={option}>
                                {capitalize(option)}
                              </option>
                            ))}
                          </Select>
                        ) : (
                          <TextField
                            id={controlId}
                            name={controlId}
                            isLabelHidden
                            size="small"
                            label={control.name}
                            value={String(value)}
                            onChange={(event) => setValue(control.name, (event.target as HTMLInputElement).value)}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {(storybookUrl || figmaUrl) && (
          <>
            <Divider UNSAFE_className={styles.ComponentPlayground__divider} />
            <div className={styles.ComponentPlayground__links}>
              {figmaUrl && (
                <div className={styles.ComponentPlayground__action}>
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
                <Link href={storybookUrl} target="_blank" rel="noreferrer" underlined="always">
                  Open in Storybook
                </Link>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default ComponentPlayground;
