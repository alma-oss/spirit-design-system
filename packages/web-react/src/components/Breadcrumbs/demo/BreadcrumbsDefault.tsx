import React from 'react';
import Breadcrumbs from '../Breadcrumbs';

const BreadcrumbsDefault = () => {
  const items = [
    {
      title: 'Root',
      url: '#rootUrl',
    },
    {
      title: 'Category',
      url: '#categoryUrl',
    },
    {
      title: 'Subcategory',
      url: '#subcategoryUrl',
    },
    {
      title: 'Current page',
      url: '#currentUrl',
    },
  ];

  return <Breadcrumbs items={items} />;
};

export default BreadcrumbsDefault;
