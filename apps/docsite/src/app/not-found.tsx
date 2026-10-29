import { NotFoundContent } from '@local/ui/NotFoundContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

const NotFound = () => <NotFoundContent />;

export default NotFound;
