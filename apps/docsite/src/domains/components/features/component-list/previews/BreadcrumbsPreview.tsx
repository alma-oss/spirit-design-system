'use client';

import { Breadcrumbs } from '@alma-oss/spirit-web-react';
import React from 'react';

const BreadcrumbsPreview = () => (
  <Breadcrumbs items={[{ title: 'Root', url: '#' }, { title: 'Category', url: '#' }, { title: 'Current page' }]} />
);

export default BreadcrumbsPreview;
