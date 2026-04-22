import React from 'react';
import { createRoot } from 'react-dom/client';
import Preview from '../preview';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Preview />,
);
