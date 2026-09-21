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
    },
  ];

  return <Breadcrumbs items={items} labelBack="Back" />;
};

export default BreadcrumbsDefault;
