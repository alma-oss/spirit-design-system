'use client';

import { Link, RouterProvider } from '@alma-oss/spirit-web-react';
import { useRouter } from 'next/navigation';

const RouterDemo = () => {
  const router = useRouter();

  return (
    <div>
      <h3>Link without RouterProvider</h3>
      <p>
        <Link href="/routing?demo=no-provider">Go without provider</Link>
      </p>
      <p>
        <Link href="https://example.com">External link (https)</Link>
      </p>
      <p>
        <Link href="https://example.com" target="_blank">
          External link (target _blank)
        </Link>
      </p>
      <p>
        <Link href="#hash-target">Hash link (in-page anchor)</Link>
      </p>

      <h3>Link with RouterProvider</h3>
      <RouterProvider navigate={router.push}>
        <p>
          <Link href="/routing?demo=with-provider">Go with provider</Link>
        </p>
        <p>
          <Link href="/routing?demo=with-options" routerOptions={{ scroll: false }}>
            Go with provider (no scroll)
          </Link>
        </p>
        <p>
          <Link href="https://example.com">External link (https)</Link>
        </p>
        <p>
          <Link href="https://example.com" target="_blank">
            External link (target _blank)
          </Link>
        </p>
        <p>
          <Link href="#hash-target">Hash link with provider (in-page anchor)</Link>
        </p>
      </RouterProvider>

      <div id="hash-target" style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>
        <strong>Hash target</strong>
        <p>If hash navigation works correctly, links above should scroll to this section without router navigation.</p>
      </div>
    </div>
  );
};

export default RouterDemo;
