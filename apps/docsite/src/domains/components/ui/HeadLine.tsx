import { Heading } from '@alma-oss/spirit-web-react';
import { type ReactNode } from 'react';

interface HeadLineProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const HeadLine = ({ children, className, style }: HeadLineProps) => (
  <Heading elementType="h1" size="xlarge" emphasis="bold" UNSAFE_className={className} UNSAFE_style={style}>
    {children}
  </Heading>
);

export default HeadLine;
