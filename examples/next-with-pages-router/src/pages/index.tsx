import { Heading, Link } from '@alma-oss/spirit-web-react';
import { NextPage } from 'next';

const Home: NextPage = () => (
  <>
    <Heading elementType="h2" size="large">
      Spirit Pages App
    </Heading>
    <p>
      <Link href="/routing">RouterProvider demo (client-side routing)</Link>
    </p>
  </>
);

export default Home;
