#!/usr/bin/env bash

set -o errexit

# Defaults
projectRoot=$(cd $(dirname "${BASH_SOURCE}")/../..; pwd)
workingDirectory="$(pwd)"
ui=false
uiPort=43008
testOptions=""
webServerMode="auto"
webServerHost="127.0.0.1"
webServerPort="4200"
fileChangesDetectionSupportMode="auto"
snapshotDir=""
ubuntuVersion="noble"

# Argument parsing
while [[ $# -gt 0 ]]; do
  case "$1" in
    --ui) ui=true ;;
    --uiPort) uiPort="$2"; shift ;;
    --testOptions) testOptions="$2"; shift ;;
    --webServerMode) webServerMode="$2"; shift ;;
    --webServerHost) webServerHost="$2"; shift ;;
    --webServerPort) webServerPort="$2"; shift ;;
    --fileChangesDetectionSupportMode) fileChangesDetectionSupportMode="$2"; shift ;;
    --snapshotDir) snapshotDir="$2"; shift ;;
    *) echo "Unknown parameter: $1" >&2; exit 1 ;;
  esac
  shift
done

get_playwright_version() {
  grep "^[[:space:]]*'@playwright/test':" "$(dirname "$0")/../../.yarnrc.yml" | sed -E "s/^[[:space:]]*'@playwright\/test': *(.+)$/\1/"
}

is_file_changes_detection_supported() {
  if [[ "$fileChangesDetectionSupportMode" == "auto" ]]; then
    if [[ "$(uname -s)" == "Linux" || "$(uname -s)" == "Darwin" ]]; then
      return 0
    fi

    if is_docker_desktop_on_windows_using_wsl2; then
      echo "Detected Docker Desktop running on WSL2. FILE_CHANGES_DETECTION_SUPPORTED=false will be set." >&2
      return 1
    fi
    return 0

  elif [[ "$fileChangesDetectionSupportMode" == "supported" ]]; then
    return 0
  elif [[ "$fileChangesDetectionSupportMode" == "unsupported" ]]; then
    return 1
  else
    echo "Unknown fileChangesDetectionSupportMode: $fileChangesDetectionSupportMode" >&2
    exit 1
  fi
}

is_docker_desktop_on_windows_using_wsl2() {
  if [[ "$(uname -s)" != "Linux" ]]; then
    return 1
  fi

  settings_path="/mnt/c/Users/$(whoami)/AppData/Roaming/Docker/settings.json"
  [[ -f "$settings_path" ]] && jq -e '.wslEngineEnabled == true' "$settings_path" >/dev/null 2>&1
}

use_host_web_server() {
  if [[ "${CI}" == "true" ]]; then
    return 1
  fi

  if [[ "$webServerMode" == "auto" ]]; then
    if timeout 0.5 bash -c "</dev/tcp/$webServerHost/$webServerPort" 2>/dev/null; then
      echo "Detected web server at $webServerHost:$webServerPort. USE_DOCKER_HOST_WEBSERVER=true will be set." >&2
      return 0
    fi
    return 1

  elif [[ "$webServerMode" == "from-host" ]]; then
    return 0
  elif [[ "$webServerMode" == "from-docker" ]]; then
    return 1
  else
    echo "Unknown webServerMode: $webServerMode" >&2
    exit 1
  fi
}

start_playwright_tests() {
  echo -e "\033[36mStarting playwright tests run in docker container...\033[0m"
  echo "options:"
  echo "--testOptions=$testOptions"
  echo "--webServerMode=$webServerMode"
  echo "--webServerHost=$webServerHost"
  echo "--webServerPort=$webServerPort"
  echo "--snapshotDir=$snapshotDir"
  echo

  playwrightVersion=$(get_playwright_version)
  npmInstallCommand=${CI:+yarn install}
  npmInstallCommand=${npmInstallCommand:-yarn install}

  use_host_web_server && useHostWebServer=true || useHostWebServer=false

  export CI=${CI:-false}
  export PLAYWRIGHT_VERSION="$playwrightVersion"
  export PLAYWRIGHT_TEST_OPTIONS="$testOptions"
  export NPM_INSTALL_COMMAND="$npmInstallCommand"
  export USE_DOCKER_HOST_WEBSERVER="$useHostWebServer"
  export SNAPSHOT_DIR="$snapshotDir"
  export UBUNTU_VERSION="$ubuntuVersion"
  export WORKING_DIRECTORY="$workingDirectory"

  echo "Docker env variables:"
  echo "CI=$CI"
  echo "PLAYWRIGHT_VERSION=$PLAYWRIGHT_VERSION"
  echo "UBUNTU_VERSION=$UBUNTU_VERSION"
  echo "PLAYWRIGHT_TEST_OPTIONS=$PLAYWRIGHT_TEST_OPTIONS"
  echo "NPM_INSTALL_COMMAND=$NPM_INSTALL_COMMAND"
  echo "USE_DOCKER_HOST_WEBSERVER=$USE_DOCKER_HOST_WEBSERVER"
  echo "SNAPSHOT_DIR=$SNAPSHOT_DIR"
  echo

  docker compose --file "${projectRoot}/bin/docker/docker-compose-e2e.yml" up --exit-code-from e2e-tests
}

start_playwright_ui() {
  echo -e "\033[36mStarting playwright tests with UI in docker container...\033[0m"
  echo "options:"
  echo "--uiPort=$uiPort"
  echo "--testOptions=$testOptions"
  echo "--webServerMode=$webServerMode"
  echo "--webServerHost=$webServerHost"
  echo "--webServerPort=$webServerPort"
  echo "--fileChangesDetectionSupportMode=$fileChangesDetectionSupportMode"
  echo

  playwrightVersion=$(get_playwright_version)
  npmInstallCommand=${CI:+yarn install}
  npmInstallCommand=${npmInstallCommand:-yarn install}

  use_host_web_server && useHostWebServer=true || useHostWebServer=false
  is_file_changes_detection_supported && fcds=true || fcds=false

  export CI=${CI:-false}
  export PLAYWRIGHT_VERSION="$playwrightVersion"
  export PLAYWRIGHT_TEST_OPTIONS="$testOptions"
  export UBUNTU_VERSION="$ubuntuVersion"
  export WORKING_DIRECTORY="$workingDirectory"
  export NPM_INSTALL_COMMAND="$npmInstallCommand"
  export USE_DOCKER_HOST_WEBSERVER="$useHostWebServer"
  export UI_PORT="$uiPort"
  export FILE_CHANGES_DETECTION_SUPPORTED="$fcds"
  export CHOKIDAR_USEPOLLING=$([[ "$fcds" == "false" ]] && echo "true" || echo "false")

  echo "Docker env variables:"
  echo "CI=$CI"
  echo "PLAYWRIGHT_VERSION=$PLAYWRIGHT_VERSION"
  echo "PLAYWRIGHT_TEST_OPTIONS=$PLAYWRIGHT_TEST_OPTIONS"
  echo "NPM_INSTALL_COMMAND=$NPM_INSTALL_COMMAND"
  echo "USE_DOCKER_HOST_WEBSERVER=$USE_DOCKER_HOST_WEBSERVER"
  echo "UI_PORT=$UI_PORT"
  echo "FILE_CHANGES_DETECTION_SUPPORTED=$FILE_CHANGES_DETECTION_SUPPORTED"
  echo "CHOKIDAR_USEPOLLING=$CHOKIDAR_USEPOLLING"
  echo

  echo -e "\033[36mStarting docker container with UI mode...\033[0m"
  echo -e "\033[36mOn success the UI will be available at: http://localhost:$uiPort\033[0m"
  echo

  docker compose --file "${projectRoot}/bin/docker/docker-compose-e2e.ui.yml" up
}

main() {
  if [[ "$ui" == "true" ]]; then
    start_playwright_ui
  else
    start_playwright_tests
  fi
}

main
