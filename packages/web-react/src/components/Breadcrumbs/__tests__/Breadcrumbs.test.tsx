import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  classNamePrefixProviderTest,
  elementTypePropsTest,
  restPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import Breadcrumbs from '../Breadcrumbs';

jest.mock('../../../hooks/useIcon');

describe('Breadcrumbs', () => {
  classNamePrefixProviderTest(Breadcrumbs, 'Breadcrumbs');

  stylePropsTest(Breadcrumbs);

  restPropsTest(Breadcrumbs, 'nav');

  validHtmlAttributesTest(Breadcrumbs);
  elementTypePropsTest(Breadcrumbs);

  it('should render breadcrumbs with go back title', () => {
    const dom = render(
      <Breadcrumbs
        items={[
          { title: 'test', url: '/test' },
          { title: 'test_2', url: '/test_2' },
        ]}
        goBackTitle="test_title"
      />,
    );

    const element = dom.container.querySelectorAll('ol > li > a')[0] as HTMLElement;

    expect(element).toHaveTextContent('test_title');
  });

  it('should resolve strings.label.back from a translation reference', () => {
    const dom = render(
      <Breadcrumbs
        items={[
          { title: 'test', url: '/test' },
          { title: 'test_2', url: '/test_2' },
        ]}
        strings={{ label: { back: { key: 'breadcrumbs.back' } } }}
      />,
    );

    expect(dom.container.querySelectorAll('ol > li > a')[0]).toHaveTextContent('Go back');
  });

  it('should use the default aria-label on the root element', () => {
    const dom = render(
      <Breadcrumbs
        items={[
          { title: 'test', url: '/test' },
          { title: 'test_2', url: '/test_2' },
        ]}
      />,
    );

    expect(dom.container.querySelector('nav')).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  it('should resolve strings.ariaLabel for the root aria-label', () => {
    const dom = render(
      <Breadcrumbs
        items={[
          { title: 'test', url: '/test' },
          { title: 'test_2', url: '/test_2' },
        ]}
        strings={{ ariaLabel: { nav: 'Drobečková navigace' } }}
      />,
    );

    expect(dom.container.querySelector('nav')).toHaveAttribute('aria-label', 'Drobečková navigace');
  });

  it('should not render the back item without strings.label.back or goBackTitle', () => {
    const dom = render(
      <Breadcrumbs
        items={[
          { title: 'test', url: '/test' },
          { title: 'test_2', url: '/test_2' },
        ]}
      />,
    );

    expect(dom.container.querySelectorAll('ol > li')).toHaveLength(2);
  });
});
