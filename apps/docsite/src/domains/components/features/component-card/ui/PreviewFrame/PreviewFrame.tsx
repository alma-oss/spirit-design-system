import React, { ReactNode } from 'react';
import './PreviewFrame.scss';

interface PreviewFrameProps {
  children?: ReactNode;
}

const PreviewFrame = ({ children = undefined }: PreviewFrameProps) => (
  // The preview is a picture only – `inert` removes it from hover, focus and the accessibility tree.
  <div className="PreviewFrame" inert>
    {children ?? <div className="PreviewFrame__placeholder" />}
  </div>
);

export default PreviewFrame;
