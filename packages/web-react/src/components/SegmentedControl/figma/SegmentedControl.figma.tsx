import figma from '@figma/code-connect';
import React from 'react';
import { Icon } from '../../Icon';
import { Truncate } from '../../Truncate';
import SegmentedControl from '../SegmentedControl';
import SegmentedControlItem from '../SegmentedControlItem';

const SEGMENTED_CONTROL_NODE_URL = '<FIGMA_FILE_ID>?node-id=29237%3A2108';

const commonProps = {
  label: 'Fill accessible label',
  name: 'segmented-control-example',
  selectedValue: 'value-1',
  setSelectedValue: () => {},
  isFluid: figma.boolean('Full-width', {
    true: true,
    false: false,
  }),
  variant: figma.enum('Variant', {
    Basic: 'fill',
  }),
};

figma.connect(SegmentedControl, SEGMENTED_CONTROL_NODE_URL, {
  props: commonProps,
  variant: {
    Count: '5',
  },
  example: (props) => (
    <SegmentedControl {...props}>
      <SegmentedControlItem id="segmented-control-full-example-item-1" value="value-1">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
      <SegmentedControlItem id="segmented-control-full-example-item-2" value="value-2">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
      <SegmentedControlItem id="segmented-control-full-example-item-3" value="value-3">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
      <SegmentedControlItem id="segmented-control-full-example-item-4" value="value-4">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
      <SegmentedControlItem id="segmented-control-full-example-item-5" value="value-5">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
    </SegmentedControl>
  ),
});

figma.connect(SegmentedControl, SEGMENTED_CONTROL_NODE_URL, {
  props: commonProps,
  variant: {
    Count: '4',
  },
  example: (props) => (
    <SegmentedControl {...props}>
      <SegmentedControlItem id="segmented-control-full-example-item-1" value="value-1">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
      <SegmentedControlItem id="segmented-control-full-example-item-2" value="value-2">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
      <SegmentedControlItem id="segmented-control-full-example-item-3" value="value-3">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
      <SegmentedControlItem id="segmented-control-full-example-item-4" value="value-4">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
    </SegmentedControl>
  ),
});

figma.connect(SegmentedControl, SEGMENTED_CONTROL_NODE_URL, {
  props: commonProps,
  variant: {
    Count: '3',
  },
  example: (props) => (
    <SegmentedControl {...props}>
      <SegmentedControlItem id="segmented-control-full-example-item-1" value="value-1">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
      <SegmentedControlItem id="segmented-control-full-example-item-2" value="value-2">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
      <SegmentedControlItem id="segmented-control-full-example-item-3" value="value-3">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
    </SegmentedControl>
  ),
});

figma.connect(SegmentedControl, SEGMENTED_CONTROL_NODE_URL, {
  props: commonProps,
  variant: {
    Count: '2',
  },
  example: (props) => (
    <SegmentedControl {...props}>
      <SegmentedControlItem id="segmented-control-full-example-item-1" value="value-1">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
      <SegmentedControlItem id="segmented-control-full-example-item-2" value="value-2">
        <Icon name="placeholder" />
        <Truncate mode="lines" limit={1}>
          Label
        </Truncate>
      </SegmentedControlItem>
    </SegmentedControl>
  ),
});
