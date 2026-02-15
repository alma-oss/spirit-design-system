'use client';

import React, { ReactNode } from 'react';

const DocumentationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default DocumentationLayout;
