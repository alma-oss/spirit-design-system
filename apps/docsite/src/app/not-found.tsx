import { NotFound } from '@local/ui/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

const NotFoundPage = () => <NotFound />;

export default NotFoundPage;
