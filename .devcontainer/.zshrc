# Powerlevel10k instant prompt — must be near the top of .zshrc
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# Oh My Zsh
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="powerlevel10k/powerlevel10k"

plugins=(git node yarn npm zsh-autosuggestions zsh-syntax-highlighting)

source $ZSH/oh-my-zsh.sh

# Persist zsh history across container restarts (SHARE_HISTORY implies append semantics)
[[ -d /commandhistory ]] && export HISTFILE=/commandhistory/.zsh_history
export HISTSIZE=10000
export SAVEHIST=10000
setopt SHARE_HISTORY

# Coloured output
alias ls='ls --color=auto'
alias grep='grep --color=auto'

# Personal aliases (mounted from host)
[[ -f ~/.aliasses/default ]] && source ~/.aliasses/default
[[ -f ~/.aliasses/docker ]] && source ~/.aliasses/docker

# Claude Code wrapper: cc --yolo maps to --permission-mode bypassPermissions
function cc() {
  local args=()
  for arg in "$@"; do
    if [[ "$arg" == "--yolo" ]]; then
      args+=("--permission-mode" "bypassPermissions")
    else
      args+=("$arg")
    fi
  done
  claude "${args[@]}"
}

# Add Claude Code and local binaries to PATH
export PATH="$HOME/.local/bin:$PATH"

# GPG agent forwarded from host
export GPG_TTY=$(tty)
export GNUPGHOME="$HOME/.gnupg"

# Powerlevel10k config (run `p10k configure` to regenerate)
[[ -f ~/.p10k.zsh ]] && source ~/.p10k.zsh
