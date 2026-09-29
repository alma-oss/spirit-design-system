// url=<FIGMA_FILE_ID>?node-id=37905%3A1011
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Timeline/Timeline.tsx
// component=Timeline

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const marker = instance.findInstance('timeline-point');
let markerCode;
let size;
if (marker && marker.type === 'INSTANCE') {
  const result = marker.executeTemplate();
  markerCode = result.example;
  size = result.metadata?.props?.size;
}

export default {
  id: 'Timeline',
  imports: [
    "import { Heading, Text, Timeline, TimelineContent, TimelineHeading, TimelineStep } from '@alma-oss/spirit-web-react';",
  ],
  example: figma.code`
    <Timeline${size ? figma.code` size="${size}"` : ''}>
      <TimelineStep>
        ${markerCode}
        <TimelineHeading>
          <Heading elementType="h3" size="small" fontWeight="semibold">
            Headline
          </Heading>
        </TimelineHeading>
        <TimelineContent>
          <Text textColor="secondary">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered
            alteration in some form, by injected humour, or randomised words which don't look even slightly
            believable.
          </Text>
        </TimelineContent>
      </TimelineStep>
    </Timeline>`,
};
