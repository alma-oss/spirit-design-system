// Because there is no `dist` directory during the CI run

import React from 'react';
import ReactDOM from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import TagDefault from './TagDefault';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DocsSection title="Default" stackAlignment="stretch">
      <TagDefault />
    </DocsSection>
  </React.StrictMode>,
);
