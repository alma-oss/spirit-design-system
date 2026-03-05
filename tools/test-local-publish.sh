#!/usr/bin/env bash
# Test that lerna's catalog resolution patch works by publishing to a local Verdaccio registry
# and inspecting the resulting tarballs' package.json for unresolved catalog: refs.
#
# Usage:
#   ./tools/test-local-publish.sh              # full lifecycle (prepack/postpack runs)
#   ./tools/test-local-publish.sh --no-scripts # skip prepack/postpack (isolates catalog resolution)
#
# Requirements: jq, curl, yarn (verdaccio is a devDependency — run yarn install first)
#
# LERNA_NO_PROVENANCE is set automatically — bypasses OIDC provenance requirement
# (all packages have "provenance": true in publishConfig, which requires GitHub Actions OIDC)

set -euo pipefail

REGISTRY="http://localhost:4873"
CONFIG="$(cd "$(dirname "$0")" && pwd)/verdaccio-test.yaml"
STORAGE="/tmp/verdaccio-spirit-storage"
VERDACCIO_PID_FILE="/tmp/verdaccio-spirit.pid"
VERDACCIO_LOG="/tmp/verdaccio-spirit.log"

# ── Helpers ──────────────────────────────────────────────────────────────────

check_deps() {
  for cmd in git jq tar curl yarn; do
    if ! command -v "$cmd" &>/dev/null; then
      echo "ERROR: $cmd not found" >&2
      exit 1
    fi
  done
}

# Kill a PID only if it is actually a Verdaccio process.
kill_if_verdaccio_pid() {
  local pid="$1"
  [[ -z "$pid" ]] && return 0
  if ps -p "$pid" -o comm= 2>/dev/null | grep -q "[v]erdaccio"; then
    echo "Stopping Verdaccio (pid $pid)..."
    kill "$pid" 2>/dev/null || true
  fi
}

stop_verdaccio() {
  # Kill by saved PID only if it still belongs to a Verdaccio process.
  if [[ -f "$VERDACCIO_PID_FILE" ]]; then
    local pid
    pid=$(cat "$VERDACCIO_PID_FILE")
    kill_if_verdaccio_pid "$pid"
    rm -f "$VERDACCIO_PID_FILE"
  fi
  # Also kill any Verdaccio process currently listening on port 4873.
  if command -v lsof &>/dev/null; then
    local port_pid
    port_pid=$(lsof -t -iTCP:4873 -sTCP:LISTEN 2>/dev/null | head -n1 || true)
    [[ -n "$port_pid" ]] && kill_if_verdaccio_pid "$port_pid"
  fi
  sleep 1  # Give the process time to release the port
}

start_verdaccio() {
  # Start fresh: clear storage and in-memory state by restarting
  rm -rf "$STORAGE" /tmp/verdaccio-spirit-htpasswd
  echo "Starting Verdaccio..."
  # Use nohup so Verdaccio persists across subshell invocations from bash
  nohup yarn exec verdaccio --config "$CONFIG" --listen 4873 >"$VERDACCIO_LOG" 2>&1 &
  echo $! >"$VERDACCIO_PID_FILE"
  wait_for_registry
}

wait_for_registry() {
  local retries=60  # 30 seconds total (60 × 0.5s)
  echo "Waiting for Verdaccio to be ready..."
  for i in $(seq 1 $retries); do
    if curl -sf "$REGISTRY/-/ping" &>/dev/null; then
      echo "Verdaccio is ready (attempt $i / ${retries})."
      return 0
    fi
    sleep 0.5
  done
  echo "ERROR: Verdaccio did not start in time. Check $VERDACCIO_LOG" >&2
  cat "$VERDACCIO_LOG" >&2
  return 1
}

restore_package_json() {
  # Restore any package.json files left modified by --no-git-reset
  git checkout -- packages/*/package.json 2>/dev/null || true
}

inspect_all_tarballs() {
  local fail_count=0
  local pass_count=0

  echo ""
  echo "════════════════════════════════════════════════════════════"
  echo "Inspecting published tarballs for unresolved catalog: refs"
  echo "════════════════════════════════════════════════════════════"

  local tgz_files=()
  while IFS= read -r tgz_file; do
    tgz_files+=("$tgz_file")
  done < <(find "$STORAGE" -name "*.tgz" | sort)

  if [[ ${#tgz_files[@]} -eq 0 ]]; then
    echo "ERROR: No tarballs found in $STORAGE" >&2
    return 1
  fi

  for tgz in "${tgz_files[@]}"; do
    local pkg_name
    pkg_name=$(basename "$tgz")
    echo ""
    echo "=== $pkg_name ==="

    local pkg_json
    pkg_json=$(tar -xOf "$tgz" package/package.json)

    local dep_count
    dep_count=$(echo "$pkg_json" | jq '[.dependencies, .peerDependencies, .optionalDependencies] | map(to_entries? // []) | add // [] | length')

    if [[ "$dep_count" -eq 0 ]]; then
      echo "  (no dependencies)"
      pass_count=$((pass_count + 1))
      continue
    fi

    # Print each dep with ✅ or ❌
    echo "$pkg_json" | jq -r '
      [.dependencies, .peerDependencies, .optionalDependencies]
      | map(to_entries? // [])
      | add // []
      | sort_by(.key)
      | .[]
      | "  \(.key): \(.value)\(if (.value | contains("catalog:")) then " ❌ UNRESOLVED" else " ✅" end)"
    '

    local unresolved_count
    unresolved_count=$(echo "$pkg_json" | jq '[.dependencies, .peerDependencies, .optionalDependencies] | map(to_entries? // []) | add // [] | map(select(.value | contains("catalog:"))) | length')

    if [[ "$unresolved_count" -gt 0 ]]; then
      local unresolved_names
      unresolved_names=$(echo "$pkg_json" | jq -r '[.dependencies, .peerDependencies, .optionalDependencies] | map(to_entries? // []) | add // [] | map(select(.value | contains("catalog:"))) | map(.key) | join(", ")')
      echo ""
      echo "FAIL: $unresolved_count unresolved catalog ref(s): $unresolved_names"
      fail_count=$((fail_count + 1))
    else
      pass_count=$((pass_count + 1))
    fi
  done

  echo ""
  echo "────────────────────────────────────────────────────────────"
  echo "Results: ${pass_count} PASS, ${fail_count} FAIL"
  echo "────────────────────────────────────────────────────────────"
  if [[ $fail_count -gt 0 ]]; then
    echo "FAILED: Some packages still have unresolved catalog: refs." >&2
    return 1
  else
    echo "ALL PACKAGES VERIFIED ✅"
  fi
}

# ── Main ─────────────────────────────────────────────────────────────────────

check_deps

# Ensure cleanup on exit
trap 'stop_verdaccio; restore_package_json' EXIT

# Kill any stale Verdaccio from a previous run, then start fresh
# (Verdaccio keeps published packages in memory even if storage is deleted)
stop_verdaccio
start_verdaccio

LERNA_EXTRA_FLAGS=()
if [[ "${1:-}" == "--no-scripts" ]]; then
  LERNA_EXTRA_FLAGS=(--ignore-scripts)
  echo ""
  echo "Note: --no-scripts mode — prepack/postpack lifecycle will be skipped."
  echo "      This isolates catalog resolution from the build pipeline."
fi

echo ""
echo "Publishing all affected packages to local registry..."
echo "Registry: $REGISTRY"
echo ""

# LERNA_NO_PROVENANCE: bypasses "provenance: true" in publishConfig.
# All packages have provenance enabled, which requires GitHub Actions OIDC.
# For local testing we must disable it via this env var (handled by the patch).
#
# --no-git-reset: Skips git checkout after publish. package.json files will be
# left modified on disk; the EXIT trap calls restore_package_json to clean up.
#
# No --scope flag: Removed in lerna v7+. All locally-unpublished packages are
# published automatically based on the registry version check.
export LERNA_NO_PROVENANCE=1
yarn lerna publish from-package \
  --registry "$REGISTRY" \
  --yes \
  --no-git-reset \
  "${LERNA_EXTRA_FLAGS[@]}"

inspect_all_tarballs
