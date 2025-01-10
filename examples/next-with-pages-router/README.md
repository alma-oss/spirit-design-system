# Example Next.js Application with Pages Router

This application is used to demonstrate the configuration of a Next.js application with an App router for use with the Spirit Design System.

## Getting Started

First, run the development server:

```bash
yarn dev
```

In case of error `npm error ERR! code ENOWORKSPACES`, please use `npx another telemetry disable`. For more information see [npm error code ENOWORKSPACES with NextJS][npm-error-enoworkspaces].

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

[npm-error-enoworkspaces]: https://github.com/vercel/turborepo/issues/4183
