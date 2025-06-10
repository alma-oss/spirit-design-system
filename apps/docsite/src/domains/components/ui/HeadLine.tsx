import { Heading } from '@alma-oss/spirit-web-react';
import { CSSProperties, type ReactNode } from 'react';

interface HeadLineProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

// eslint-disable-next-line react/require-default-props -- passed from parent component
const HeadLine = ({ children, className, style }: HeadLineProps) => (
  <Heading elementType="h1" size="xlarge" emphasis="bold" UNSAFE_className={className} UNSAFE_style={style}>
    {children}
  </Heading>
);

export default HeadLine;
