import { type ReactNode } from 'react';
import './MarkdownContent.scss';

interface MarkdownContentProps {
  children: ReactNode;
}

const MarkdownContent = ({ children }: MarkdownContentProps) => <div className="MarkdownContent">{children}</div>;

export default MarkdownContent;
