# Dev Containers (Experimental)

This project supports [Dev Containers][dev-containers] for a consistent, containerized development environment.

- [Prerequisites](#prerequisites)
- [Container Image](#container-image)
- [Getting Started](#getting-started)
- [SSH](#ssh)
- [Git](#git)
- [Running E2E Tests](#running-e2e-tests)
- [Using AI Tools](#using-ai-tools)
- [Mounted Volumes](#mounted-volumes)

## Prerequisites

- [Docker][docker]
- IDE with Dev Container support:
  - **VS Code:** [Dev Containers][vsc-dev-containers] extension
  - **JetBrains IDEs:** [Remote Development][jetbrains-remote-development] plugin (bundled, but must be enabled)

## Container Image

- **Base image:** [`node:20-bookworm`][node-image] — [Debian 12 (Bookworm)][bookworm] with:
  - Node.js 20 LTS
  - OS dependencies required by Playwright
  - Git
  - Make
  - curl
  - etc.
- **Custom Dockerfile:** extends the base image with [Corepack][corepack], [Playwright][playwright] Chromium (+ OS dependencies), and Git safe-directory config pre-baked into the image
- **Dev Container features:** [GitHub CLI][github-cli] (`gh`)
- **Tools installed at build time (Dockerfile):**
  - [Corepack][corepack] (enables Yarn)
  - [Playwright][playwright] OS dependencies (E2E testing)
- **Tools installed upon container creation (`postCreateCommand`):**
  - [Yarn][yarn] project dependencies
  - [Playwright][playwright] Chromium browser

The container automatically forwards ports for:

- Vite web server (3456)
- Storybook (6006)
- Playwright UI (9323)

## Getting Started

1. Open the project in your IDE
2. Use the "Reopen in Container" option
3. Wait for the container to build and dependencies to install
4. Run `make help` to see available commands

## SSH

### VS Code

In VS Code, your local SSH agent is automatically forwarded to the container.
No additional configuration is required.

### JetBrains IDEs

As we consider forwarding SSH to be a security risk, we do not forward SSH
to the container by default. This may change in the future.

## Git

Your Git user name and email are automatically configured inside the container.
Futhermore, GitHub CLI (`gh`) is installed inside the container and can be used
to authenticate with GitHub CLI inside the container.

### VS Code

Your local [SSH](#ssh) agent is automatically forwarded to the container, so
you can use Git commands without any additional configuration.

### JetBrains IDEs

Run `gh auth login` to authenticate with GitHub CLI inside the container.

## Running E2E Tests

Since Playwright is installed in the dev container, you can run end-to-end tests directly:

```bash
yarn test:e2e         # Run all E2E tests
yarn test:e2e:update  # Run all E2E tests and update snapshots
yarn test:e2e:ui      # Run with Playwright UI
```

## Using AI Tools

The Dev Container supports AI-powered coding assistants. You can use tools like [Cursor][cursor], [Claude Code][claude-code],
[Open Code][open-code], or any other AI coding tool that integrates with Dev Containers.

### Authentication

Each AI tool has its own authentication method. Refer to the tool's documentation for setup instructions:

- [Claude Code][claude-code]
- [Open Code][open-code]
- [Cursor][cursor]

## Mounted Volumes

The Dev Container uses [named Docker volumes][docker-volumes] for several directories instead of
syncing them from the host filesystem:

| Volume               | Purpose                   |
| -------------------- | ------------------------- |
| `node_modules`       | Project dependencies      |
| `.yarn/cache`        | Yarn cache                |
| `/commandhistory`    | Bash history persistence  |
| `/home/node/.claude` | Claude Code configuration |

The first two are critical for performance; the others provide convenience across container rebuilds.

Additionally, `.devcontainer/.zshrc` is bind-mounted to `/home/node/.zshrc`. Unlike named volumes,
this is a direct link to the host file — changes take effect immediately without rebuilding the
container (just start a new shell or run `source ~/.zshrc`).

**Why?**

1. **Performance** — Keeping dependencies inside the Docker VM's filesystem avoids the significant
   I/O overhead of Docker's filesystem sharing, especially on macOS and Windows.
2. **Isolation** — The container's `node_modules` won't conflict with any on your host machine
   (which might contain different platform-specific binaries).
3. **Persistence** — Named volumes survive container rebuilds, so `yarn install` only runs when
   dependencies actually change.

**Tradeoffs:**

- `node_modules` won't be visible in your host's file explorer or IDE file tree
- To fully reset dependencies, you need to remove the Docker volumes (not just rebuild the container)

> **Note:** If you see a `node_modules` folder on your host machine, it is **not** the one used by the
> container. The container uses its own `node_modules` stored in a Docker volume. Any `node_modules`
> on the host is ignored inside the container.

[claude-code]: https://docs.anthropic.com/en/docs/claude-code
[cursor]: https://www.cursor.com/
[dev-containers]: https://containers.dev/
[docker-volumes]: https://docs.docker.com/engine/storage/volumes/
[docker]: https://www.docker.com/
[github-cli]: https://cli.github.com/
[open-code]: https://github.com/anthropics/opencode
[bookworm]: https://www.debian.org/releases/bookworm/
[corepack]: https://nodejs.org/api/corepack.html
[node-image]: https://hub.docker.com/_/node
[playwright]: https://playwright.dev/
[jetbrains-remote-development]: https://www.jetbrains.com/help/idea/remote-development-overview.html
[vsc-dev-containers]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers
[yarn]: https://yarnpkg.com/
