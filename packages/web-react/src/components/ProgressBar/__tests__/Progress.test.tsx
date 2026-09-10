import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React, { createRef, type CSSProperties } from 'react';
import { ariaAttributesTest, restPropsTest, validHtmlAttributesTest } from '@local/tests';
import Progress from '../Progress';

const defaultProps = {
  'aria-label': 'Progress',
  value: 60,
};

describe('Progress', () => {
  restPropsTest((props) => <Progress {...defaultProps} {...props} />, 'progress');

  validHtmlAttributesTest((props) => <Progress {...defaultProps} {...props} />);

  ariaAttributesTest((props) => <Progress {...defaultProps} {...props} />);

  it('should render a progress element with value and max', () => {
    render(<Progress {...defaultProps} max={200} value={50} />);

    const element = screen.getByRole('progressbar');

    expect(element).toHaveAttribute('value', '50');
    expect(element).toHaveAttribute('max', '200');
  });

  it('should merge className with styleProps.className', () => {
    render(<Progress {...defaultProps} className="ProgressBar" styleProps={{ className: 'custom-class' }} />);

    expect(screen.getByRole('progressbar')).toHaveClass('ProgressBar', 'custom-class');
  });

  it('should merge style with styleProps.style', () => {
    render(
      <Progress
        {...defaultProps}
        style={{ '--progress-bar-value': '60%' } as CSSProperties}
        styleProps={{ style: { width: '20rem' } }}
      />,
    );

    const element = screen.getByRole('progressbar');

    expect(element.style.getPropertyValue('--progress-bar-value')).toBe('60%');
    expect(element).toHaveStyle({ width: '20rem' });
  });

  it('should forward the ref to the progress element', () => {
    const ref = createRef<HTMLProgressElement>();

    render(<Progress {...defaultProps} ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('progressbar'));
  });
});
