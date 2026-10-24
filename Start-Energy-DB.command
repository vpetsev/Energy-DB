#!/bin/zsh
set -e
cd "$(dirname "$0")/client"
# Prefer a normal Node installation; also support this workspace's local runtime.
if ! command -v node >/dev/null 2>&1; then
  energy_local_node="../../../work/node-v22.23.4-darwin-arm64/bin"
  if [[ -x "$energy_local_node/node" ]]; then
    export PATH="$(cd "$energy_local_node" && pwd):$PATH"
  else
    echo "Install Node.js 22 from https://nodejs.org, then run this launcher again."
    read -r "?Press Enter to close."
    exit 1
  fi
fi
if [[ -d ../../../work/npm-cache ]]; then
  export npm_config_cache="$(cd ../../../work/npm-cache && pwd)"
fi
if [[ ! -d node_modules ]]; then npm ci; fi
npm start -- --open
