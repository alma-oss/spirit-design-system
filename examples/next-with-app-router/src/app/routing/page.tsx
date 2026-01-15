import { Heading } from '@alma-oss/spirit-web-react';
import { NextPage } from 'next';
import RouterDemo from './RouterDemo';

const RoutingPage: NextPage = () => (
  <>
    <Heading elementType="h2" size="large">
      RouterProvider demo
    </Heading>
    <RouterDemo />
  </>
);

export default RoutingPage;
