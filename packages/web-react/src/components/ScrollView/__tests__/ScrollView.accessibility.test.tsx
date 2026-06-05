import { render } from '@testing-library/react';
import React, { type ReactElement } from 'react';
import { guardMissingSelector, runAxe } from '@local/tests';
import ScrollView from '../ScrollView';

jest.mock('../../../hooks/useIcon');

describe('ScrollView accessibility', () => {
  const contentItemStyle = { width: '200px', height: '100px' };

  const scrollViewContent = (
    <>
      <div style={contentItemStyle}>Content item 1</div>
      <div style={contentItemStyle}>Content item 2</div>
      <div style={contentItemStyle}>Content item 3</div>
    </>
  );

  const testScrollViewAccessibility = async (scrollView: ReactElement) => {
    const { container } = render(scrollView);

    const viewport = container.querySelector('[tabindex="0"]');
    guardMissingSelector('[tabindex="0"]', viewport);

    const element = viewport?.parentElement;
    guardMissingSelector('parent of [tabindex="0"]', element);

    const results = await runAxe(element);

    expect(results).toHaveNoAxeViolations();
  };

  it('should be accessible in its default state', async () => {
    const { container } = render(<ScrollView>{scrollViewContent}</ScrollView>);

    const viewport = container.querySelector('[tabindex="0"]');
    guardMissingSelector('[tabindex="0"]', viewport);

    const results = await runAxe(viewport);

    expect(results).toHaveNoAxeViolations();
  });

  it('should be accessible with controls', async () => {
    await testScrollViewAccessibility(
      <ScrollView hasControls ariaLabelControls={{ start: 'Previous', end: 'Next' }}>
        {scrollViewContent}
      </ScrollView>,
    );
  });

  it('should be accessible in vertical direction', async () => {
    await testScrollViewAccessibility(<ScrollView direction="vertical">{scrollViewContent}</ScrollView>);
  });
});
