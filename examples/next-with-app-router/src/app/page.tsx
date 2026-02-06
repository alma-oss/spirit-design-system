import { Heading } from '@alma-oss/spirit-web-react';
import { NextPage } from 'next';
import RouterDemo from './RouterDemo';

const Home: NextPage = () => (
  <>
    <Heading elementType="h2" size="large">
      Spirit App Router
    </Heading>
    <RouterDemo />
  </>
);

export default Home;
