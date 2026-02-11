import React, { type ReactNode } from 'react';
import { Icon } from '../../Icon';
import Avatar from '../Avatar';

const RESPONSIVE_SIZE = { mobile: 'xsmall', tablet: 'medium', desktop: 'xlarge' } as const;
const ARIA_LABEL = 'Profile of Jiří Bárta';
const IMAGE_URL = 'https://picsum.photos/id/823/162/162';

type AvatarConfig = {
  key: string;
  children: ReactNode;
  elementType?: 'a';
  href?: string;
};

const AVATAR_CONFIGS: AvatarConfig[] = [
  {
    key: 'icon',
    children: <Icon name="profile" />,
    elementType: 'a',
    href: '#',
  },
  {
    key: 'text',
    children: <span aria-hidden="true">JB</span>,
    elementType: 'a',
    href: '#',
  },
  {
    key: 'image',
    children: <img src={IMAGE_URL} alt="Jiří Bárta" aria-hidden="true" />,
  },
];

const AvatarResponsiveSizes = () => (
  <>
    <div className="d-flex" style={{ gap: 'var(--spirit-space-500)' }}>
      {AVATAR_CONFIGS.map(({ key, children, elementType, href }) => (
        <Avatar key={key} {...(elementType && { elementType, href })} size={RESPONSIVE_SIZE} aria-label={ARIA_LABEL}>
          {children}
        </Avatar>
      ))}
    </div>
    <div className="d-flex" style={{ gap: 'var(--spirit-space-500)' }}>
      {AVATAR_CONFIGS.map(({ key, children, elementType, href }) => (
        <Avatar
          key={key}
          isSquare
          {...(elementType && { elementType, href })}
          size={RESPONSIVE_SIZE}
          aria-label={ARIA_LABEL}
        >
          {children}
        </Avatar>
      ))}
    </div>
  </>
);

export default AvatarResponsiveSizes;
