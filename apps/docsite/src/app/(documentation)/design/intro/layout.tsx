import { type ReactNode } from 'react';
import DocsSlugLayout from '../../[...slug]/layout';

const DesignIntroLayout = ({ children }: { children: ReactNode }) => (
  <DocsSlugLayout params={Promise.resolve({ slug: ['design'] })}>{children}</DocsSlugLayout>
);

export default DesignIntroLayout;
