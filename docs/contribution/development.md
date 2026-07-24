# Developer Handbook

## Table of Contents

- [Getting started](#getting-started)
  - [System requirements](#system-requirements)
  - [Starting up](#starting-up)
- [Common tasks](#common-tasks)

## Getting Started

Spirit is built using a collection of packages all built in the same Git repository.
You might have heard this setup described as a [monorepo][monorepo].

As a result, we use three pieces of tooling to help us manage installing dependencies and publishing our packages.
These include:

- [Yarn workspaces][yarn-workspaces] for handling
  dependencies across all packages
- [Lerna][lerna] and [Nx][nx] for managing the monorepo, running script, publishing packages, tagging versions, and
  more
- [Make][make] for handling multi-technology tasks

### System Requirements

For you to install all the dependencies in this project and successfully develop it, you'll need to:

- [install Node.js][install-nodejs]
- [install Yarn][install-yarn]
- [install Docker][install-docker]
- [install Make][install-make]

### Starting Up

After you have set up all the requirements run the following command in your terminal:

Before installing dependencies, export `GITHUB_TOKEN` with `read:packages`.
Storybook depends on private `@almacareer/*` packages hosted on GitHub Packages.

```bash
make install
```

This will install all of the dependencies for every package in our project.
In addition, it allows us to link between packages that we are developing.

This strategy is particularly useful during development and tooling like Lerna
will pick up on when packages are linked in this way and will automatically
update versions when publishing new versions of packages.

Next up, you'll most likely want to build all of the package files so that
things don't fail while you are working on a package.
To do this, you can run the following command:

```bash
make build
```

Afterwards, you should be good to go!

## Common Tasks

> Note: Most of the scripts are also available in the `package.json` of the each package so you can use `yarn` instead in every package.
> Make only simplifies and utilize work with the monorepo on the root level because we are using multiple scripts across the different technologies in the project.
> Run `make` or `make help` to see all available commands.

While working on Spirit, here are tasks that you might want to run:

| Command      | Level        | Usage                                                                             |
| ------------ | ------------ | --------------------------------------------------------------------------------- |
| `build`      | top, package | Compiles package for the production                                               |
| `start`      | top, package | Start development server if available                                             |
| `format`     | top          | Check if files have been formatted using Prettier                                 |
| `format:fix` | top          | Check if files have been formatted using Prettier, fix formatting issues in files |
| `test`       | top, package | Executes all package(s) tests (linting, types checking, and unit testing)         |
| `test:unit`  | top, package | Executes units tests only                                                         |
| `test:e2e`   | top          | Executes end-to-end tests only                                                    |
| `lint`       | top, package | Executes linting using ESLint                                                     |
| `lint:fix`   | top, package | Executes linting using ESLint , fix linting issues in files                       |
| `types`      | top, package | Executes type checking using TypeScript Compiler                                  |

In addition, you can use `yarn` to run `bin` files using the `yarn <bin>` syntax.
For example, if you wanted to use `lerna` to run a script in every package you could do the following:

```bash
# Access $(yarn bin)/lerna and pass `run build` to the executable
yarn lerna run build
```

[install-docker]: https://docs.docker.com/get-docker/
[install-make]: https://www.gnu.org/software/make/#download
[install-nodejs]: https://nodejs.org/en/download
[install-yarn]: https://yarnpkg.com/en/docs/install
[lerna]: https://lerna.js.org/
[make]: https://www.gnu.org/software/make/manual/make.html
[monorepo]: https://en.wikipedia.org/wiki/Monorepo
[nx]: https://nx.dev/
[yarn-workspaces]: https://yarnpkg.com/lang/en/docs/workspaces/
