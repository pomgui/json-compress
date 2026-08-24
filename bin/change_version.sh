#!/usr/bin/env bash
# @author wpomier 2026-08-24
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd -P)"
VFILE="$ROOT/src/version.ts"
version=$(node -p "require('$ROOT/package.json').version")

echo "export const VERSION = '$version';" > "$VFILE"
