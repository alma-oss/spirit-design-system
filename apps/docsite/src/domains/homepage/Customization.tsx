'use client';

import { routes } from '../routing/routes';
import FeatureGrid, { type Feature } from './FeatureGrid';
import PageSection from './PageSection';

const features: Feature[] = [
  {
    title: 'Colors with meaning',
    description:
      'Every color has a job. Text, background, state, emotion. You change the meaning, not hex codes, and nothing falls apart.',
    href: `${routes.design}/theme-tokens`,
  },
  {
    title: 'A look of your own',
    description: 'Accent colors and brand gradients. Plenty of room to get juicy, still inside the lines.',
    href: `${routes.design}/color-palette`,
  },
  {
    title: 'Depth and shadows',
    description: 'Set shadows once for the whole system. No hand-clicked drop shadows in every single file.',
    href: `${routes.design}/global-tokens/elevation-and-shadows`,
  },
  {
    title: 'Corners to match the mood',
    description: 'Sharp edges or soft shapes? One value and the whole product changes character. Go on, try it.',
    href: `${routes.design}/global-tokens/radius`,
  },
];

const Customization = () => (
  <PageSection size="xlarge" hasTopLine backgroundColor="primary">
    <FeatureGrid features={features} />
  </PageSection>
);

export default Customization;
