import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  ariaAttributesTest,
  classNamePrefixProviderTest,
  elementTypePropsTest,
  emotionColorPropsTest,
  restPropsTest,
  sizeExtendedPropsTest,
  stylePropsTest,
  validHtmlAttributesTest,
} from '@local/tests';
import Tag from '../Tag';

describe('Tag', () => {
  classNamePrefixProviderTest(Tag, 'Tag');

  emotionColorPropsTest(Tag, 'Tag--');

  sizeExtendedPropsTest(Tag);

  stylePropsTest(Tag);

  restPropsTest(Tag, 'span');

  validHtmlAttributesTest(Tag);

  ariaAttributesTest(Tag);

  elementTypePropsTest(Tag);

  it('should have neutral classname', () => {
    const dom = render(<Tag />);

    const element = dom.container.querySelector('span') as HTMLElement;

    expect(element).toHaveClass('Tag--neutral');
  });

  it('should render text children', () => {
    const dom = render(<Tag>Tag</Tag>);

    const element = dom.container.querySelector('span') as HTMLElement;

    expect(element.textContent).toBe('Tag');
  });

  it('should render neutral color', () => {
    const dom = render(<Tag color="neutral">333</Tag>);

    const element = dom.container.querySelector('span') as HTMLElement;

    expect(element).toHaveClass('Tag--neutral');
  });
});
