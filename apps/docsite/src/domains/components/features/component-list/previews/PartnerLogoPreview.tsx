import { PartnerLogo } from '@alma-oss/spirit-web-react';
import React from 'react';

const PartnerLogoPreview = () => (
  <PartnerLogo size="medium" hasSafeArea={false}>
    <svg width="120" height="40" viewBox="0 0 120 40">
      <title>Partner Logo</title>
      <rect width="120" height="40" rx="8" fill="currentColor" opacity="0.15" />
      <text x="60" y="26" textAnchor="middle" fontSize="14" fontFamily="sans-serif" fill="currentColor">
        Partner
      </text>
    </svg>
  </PartnerLogo>
);

export default PartnerLogoPreview;
