'use client';

import { Link, RouterProvider } from '@alma-oss/spirit-web-react';
import { useRouter } from 'next/router';

const RouterDemo = () => {
  const router = useRouter();

  return (
    <div>
      <h3>Link without RouterProvider</h3>
      <p>
        <Link href="/?demo=no-provider">Go without provider</Link>
      </p>
      <p>
        <Link href="https://example.com">External link (https)</Link>
      </p>
      <p>
        <Link href="https://example.com" target="_blank">
          External link (target _blank)
        </Link>
      </p>

      <h3>Link with RouterProvider</h3>
      <RouterProvider value={{ navigate: router.push }}>
        <p>
          <Link href="/?demo=with-provider">Go with provider</Link>
        </p>
        <p>
          <Link href="https://example.com">External link (https)</Link>
        </p>
        <p>
          <Link href="https://example.com" target="_blank">
            External link (target _blank)
          </Link>
        </p>
      </RouterProvider>
    </div>
  );
};

export default RouterDemo;
