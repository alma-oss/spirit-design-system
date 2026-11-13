import React from 'react';
import Avatar from '../Avatar';
import { DEMO_SIZES } from '../constants';

const AvatarImage = () => (
  <>
    <div className="d-flex" style={{ gap: 'var(--spirit-space-500)' }}>
      {DEMO_SIZES.map(({ size }) => (
        <Avatar key={size} elementType="a" href="#" size={size} aria-label="Profile of Jiří Bárta">
          <img src="/assets/images/avatar.svg" alt="Jiří Bárta" aria-hidden="true" />
        </Avatar>
      ))}
    </div>
    <div className="d-flex" style={{ gap: 'var(--spirit-space-500)' }}>
      {DEMO_SIZES.map(({ size }) => (
        <Avatar key={size} isSquare elementType="a" href="#" size={size} aria-label="Profile of Jiří Bárta">
          <img src="/assets/images/avatar.svg" alt="Jiří Bárta" aria-hidden="true" />
        </Avatar>
      ))}
    </div>
  </>
);

export default AvatarImage;
