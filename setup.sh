#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v npm >/dev/null 2>&1; then
  echo "Node.js is missing. Install the LTS version from https://nodejs.org then run this file again."
  exit 1
fi

echo "Installing dependencies from package-lock.json..."
npm ci

echo "Starting ClosetIQ..."
npm start -- --open
