export const PLAYGROUND_COMPONENTS = ['Button'] as const;

export type PlaygroundComponentName = (typeof PLAYGROUND_COMPONENTS)[number];

export const isPlaygroundComponentName = (name: string): name is PlaygroundComponentName =>
  (PLAYGROUND_COMPONENTS as readonly string[]).includes(name);

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
  component: PlaygroundComponentName;
  controls: PlaygroundControl[];
  /** Link to the component's Storybook, shown below the controls. */
  storybookUrl?: string;
  /** Link to the component in Figma, shown below the controls. */
  figmaUrl?: string;
}

export interface PlaygroundFile extends PlaygroundConfig {
  /** Tab route segments (e.g. `web-preview`) that are not offered for this component. */
  hiddenTabs?: string[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isOptionalBoolean = (value: unknown) => value === undefined || typeof value === 'boolean';

const isNamed = (value: Record<string, unknown>) => typeof value.name === 'string' && value.name.length > 0;

const isSelectControl = (value: unknown): value is SelectControl => {
  if (!isRecord(value) || value.type !== 'select' || !isNamed(value) || !isOptionalBoolean(value.isRequired)) {
    return false;
  }

  return (
    Array.isArray(value.options) &&
    value.options.every((option) => typeof option === 'string') &&
    typeof value.defaultValue === 'string' &&
    value.options.includes(value.defaultValue)
  );
};

const isTextControl = (value: unknown): value is TextControl =>
  isRecord(value) &&
  value.type === 'text' &&
  isNamed(value) &&
  typeof value.defaultValue === 'string' &&
  isOptionalBoolean(value.isRequired);

const isBooleanControl = (value: unknown): value is BooleanControl =>
  isRecord(value) && value.type === 'boolean' && isNamed(value) && isOptionalBoolean(value.defaultValue);

const isPlaygroundControl = (value: unknown): value is PlaygroundControl =>
  isSelectControl(value) || isTextControl(value) || isBooleanControl(value);

const isOptionalString = (value: unknown) => value === undefined || typeof value === 'string';

const isHiddenTabs = (value: unknown) =>
  value === undefined || (Array.isArray(value) && value.every((tab) => typeof tab === 'string'));

/**
 * Returns a playground definition, or null when the component is unknown or a control is incomplete.
 *
 * @param value
 */
export const parsePlaygroundFile = (value: unknown): PlaygroundFile | null => {
  if (!isRecord(value) || typeof value.component !== 'string' || !isPlaygroundComponentName(value.component)) {
    return null;
  }

  if (!Array.isArray(value.controls) || !value.controls.every(isPlaygroundControl)) {
    return null;
  }

  if (!isOptionalString(value.storybookUrl) || !isOptionalString(value.figmaUrl) || !isHiddenTabs(value.hiddenTabs)) {
    return null;
  }

  return {
    component: value.component,
    controls: value.controls,
    ...(typeof value.storybookUrl === 'string' ? { storybookUrl: value.storybookUrl } : {}),
    ...(typeof value.figmaUrl === 'string' ? { figmaUrl: value.figmaUrl } : {}),
    ...(Array.isArray(value.hiddenTabs) ? { hiddenTabs: value.hiddenTabs } : {}),
  };
};
