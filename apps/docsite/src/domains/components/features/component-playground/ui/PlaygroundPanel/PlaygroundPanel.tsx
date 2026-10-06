import { Button, Divider, Flex, Link, Stack, Text } from '@alma-oss/spirit-web-react';
import { type PlaygroundControl } from '../../playgroundConfig';
import { PlaygroundControlField, type PlaygroundValue } from '../PlaygroundControlField';

interface PlaygroundPanelProps {
  controls: PlaygroundControl[];
  id: string;
  values: Record<string, PlaygroundValue>;
  resetCount: number;
  storybookUrl: string;
  figmaUrl: string;
  onReset: () => void;
  onValueChange: (name: string, value: PlaygroundValue) => void;
}

const PlaygroundPanel = ({
  controls,
  id,
  values,
  resetCount,
  storybookUrl,
  figmaUrl,
  onReset,
  onValueChange,
}: PlaygroundPanelProps) => (
  <aside className="ComponentPlayground__panel" aria-label="Properties">
    <Stack spacing="space-900">
      <Flex alignmentX="space-between" alignmentY="center">
        <Text elementType="p" size="small" textColor="secondary" marginBottom="space-0">
          Appearance
        </Text>
        {/* Spirit Link renders a real button here; the a11y rule only sees the component name. */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link elementType="button" type="button" onClick={onReset}>
          Reset
        </Link>
      </Flex>

      <Stack spacing="space-700">
        {controls.map((control) => (
          <PlaygroundControlField
            key={control.name}
            control={control}
            id={`${id}-${control.name}`}
            value={values[control.name] ?? false}
            resetCount={resetCount}
            onValueChange={onValueChange}
          />
        ))}
      </Stack>
    </Stack>

    {(storybookUrl || figmaUrl) && (
      <>
        <Divider />
        <Stack spacing="space-700">
          {figmaUrl && (
            <div className="ComponentPlayground__action">
              <Button elementType="a" href={figmaUrl} target="_blank" rel="noreferrer" color="tertiary" size="small">
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
);

export default PlaygroundPanel;
