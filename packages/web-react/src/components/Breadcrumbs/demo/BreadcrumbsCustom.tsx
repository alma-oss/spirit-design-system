import React, { Fragment } from 'react';
import { Icon } from '../../Icon';
import { Link } from '../../Link';
import Breadcrumbs from '../Breadcrumbs';

const BreadcrumbsCustom = () => {
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

  return (
    <Breadcrumbs>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        const linkParams = {
          underlined: isLastItem ? 'hover' : 'always',
          'aria-current': isLastItem ? 'page' : undefined,
          color: isLastItem ? 'secondary' : 'primary',
        };

        return (
          <Fragment key={`BreadcrumbsItem_${item.title}`}>
            {index === items.length - 2 && (
              <li className="d-tablet-none">
                <Icon name="chevron-left" />
                <Link href={item.url} color="primary" underlined="always">
                  Back
                </Link>
              </li>
            )}
            <li className="d-none d-tablet-flex">
              {index !== 0 && <Icon name="chevron-right" />}
              <Link href={item.url} {...linkParams} underlined={linkParams.underlined as 'hover' | 'always' | 'never' | undefined}>
                {item.title}
              </Link>
            </li>
          </Fragment>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsCustom;
