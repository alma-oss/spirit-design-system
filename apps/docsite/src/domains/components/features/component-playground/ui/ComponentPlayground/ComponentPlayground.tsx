'use client';

import { Button } from '@alma-oss/spirit-web-react';
import classNames from 'classnames';
import { type ComponentType, type ReactNode, useId, useState } from 'react';
import {
  isPlaygroundComponentName,
  type PlaygroundComponentName,
  type PlaygroundConfig,
  type PlaygroundControl,
} from '../../playgroundConfig';
import { buildCode, getSnippetAttributes } from '../../playgroundSnippet';
import { PlaygroundCode } from '../PlaygroundCode';
import { type PlaygroundValue } from '../PlaygroundControlField';
import { PlaygroundDeviceSwitch, type Device } from '../PlaygroundDeviceSwitch';
import { PlaygroundPanel } from '../PlaygroundPanel';
import './ComponentPlayground.scss';

interface PlaygroundComponentProps {
  children?: ReactNode;
  [key: string]: unknown;
}

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

  if (!PlaygroundComponent) {
    return null;
  }

  return (
    <div className="ComponentPlayground">
      <div className="ComponentPlayground__main">
        <PlaygroundDeviceSwitch id={id} device={device} onDeviceChange={setDevice} />

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

        <PlaygroundCode codeLines={codeLines} />
      </div>

      <PlaygroundPanel
        controls={controls}
        id={id}
        values={values}
        resetCount={resetCount}
        storybookUrl={storybookUrl}
        figmaUrl={figmaUrl}
        onReset={resetValues}
        onValueChange={setValue}
      />
    </div>
  );
};

export default ComponentPlayground;
