# Use the bookworm distribution as a base image since it already contains many dependencies required by Playwright.
FROM node:20.19.5

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# Non-root user name
ARG USERNAME=node

# Install basic development tools
RUN apt-get update && apt-get install -y --no-install-recommends \
  gh \
  jq \
  sudo \
  vim \
  zsh \
  make \
  docker.io \
  gnupg \
  tig \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Grant passwordless sudo to the non-root user
RUN echo "$USERNAME ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USERNAME \
  && chmod 0440 /etc/sudoers.d/$USERNAME

# Add non-root user to docker group so it can use the forwarded Docker socket
RUN usermod -aG docker $USERNAME

# Ensure default user has access to /usr/local/share and /usr/local/bin (for corepack symlinks)
RUN mkdir -p /usr/local/share/npm-global && \
  chown -R $USERNAME:$USERNAME /usr/local/share /usr/local/bin

# Persist bash history
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  && mkdir /commandhistory \
  && touch /commandhistory/.bash_history \
  && chown -R $USERNAME:$USERNAME /commandhistory

# Create workspace and config directories and set permissions
RUN mkdir -p /workspace/node_modules /workspace/.yarn/cache /home/$USERNAME/.claude /home/$USERNAME/.cache/node/corepack \
      /home/$USERNAME/.gnupg && \
  chmod 700 /home/$USERNAME/.gnupg && \
  chown -R $USERNAME:$USERNAME /workspace /home/$USERNAME/.claude /home/$USERNAME/.cache /home/$USERNAME/.gnupg

WORKDIR /workspace

# Switch to the non-root user
USER $USERNAME

# Set the default shell to zsh rather than sh
ENV SHELL=/bin/zsh

# Install Claude Code
RUN curl -fsSL https://claude.ai/install.sh | bash

# Install Open Code
RUN curl -fsSL https://opencode.ai/install | bash

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Install Powerlevel10k theme
RUN git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
    ${HOME}/.oh-my-zsh/custom/themes/powerlevel10k

# Install community plugins
RUN git clone --depth=1 https://github.com/zsh-users/zsh-autosuggestions \
    ${HOME}/.oh-my-zsh/custom/plugins/zsh-autosuggestions \
 && git clone --depth=1 https://github.com/zsh-users/zsh-syntax-highlighting \
    ${HOME}/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
