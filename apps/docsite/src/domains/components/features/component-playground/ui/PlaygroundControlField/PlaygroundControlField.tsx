import { Select, TextField, Toggle } from '@alma-oss/spirit-web-react';
import { type PlaygroundControl } from '../../playgroundConfig';

export type PlaygroundValue = string | boolean;

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

interface PlaygroundControlFieldProps {
  control: PlaygroundControl;
  id: string;
  value: PlaygroundValue;
  resetCount: number;
  onValueChange: (name: string, value: PlaygroundValue) => void;
}

const PlaygroundControlField = ({ control, id, value, resetCount, onValueChange }: PlaygroundControlFieldProps) => {
  if (control.type === 'boolean') {
    return (
      <Toggle
        key={`${control.name}-${resetCount}`}
        id={id}
        label={control.name}
        isChecked={Boolean(value)}
        onChange={(event) => onValueChange(control.name, event.target.checked)}
      />
    );
  }

  if (control.type === 'select') {
    return (
      <Select
        id={id}
        name={id}
        size="small"
        label={control.name}
        isRequired={control.isRequired}
        value={String(value)}
        onChange={(event) => onValueChange(control.name, (event.target as HTMLSelectElement).value)}
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
      id={id}
      name={id}
      size="small"
      label={control.name}
      isRequired={control.isRequired}
      value={String(value)}
      onChange={(event) => onValueChange(control.name, (event.target as HTMLInputElement).value)}
    />
  );
};

export default PlaygroundControlField;
