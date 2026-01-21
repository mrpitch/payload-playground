#!/usr/bin/env bash
set -euo pipefail

REMOTE="${REMOTE:-origin}"
TARGET_BRANCH="${TARGET_BRANCH:-main}"

# --- helpers
die() { echo "❌ $*" >&2; exit 1; }

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"
}

need_cmd git
need_cmd sort
need_cmd awk

echo "➡️  Fetching latest from remote: $REMOTE"
git fetch "$REMOTE" --tags --prune

echo "➡️  Determining latest semver tag (prefers vX.Y.Z, then X.Y.Z)..."
LATEST_TAG="$(
  git tag -l \
    | awk '
        /^[vV]?[0-9]+\.[0-9]+\.[0-9]+$/ { print $0 }
      ' \
    | sort -V \
    | tail -n 1
)"

[[ -n "${LATEST_TAG:-}" ]] || die "No semver tags found (expected vX.Y.Z or X.Y.Z)."

echo "✅ Latest tag detected: ${LATEST_TAG}"

echo "➡️  Checking out ${TARGET_BRANCH} and updating..."
git checkout "${TARGET_BRANCH}"
git pull "${REMOTE}" "${TARGET_BRANCH}"

echo "➡️  Attempting fast-forward merge of ${TARGET_BRANCH} -> ${LATEST_TAG}"
# This will fail if main cannot be fast-forwarded to the tag
git merge --ff-only "${LATEST_TAG}" || die "Cannot fast-forward ${TARGET_BRANCH} to ${LATEST_TAG}. main has diverged. Use a merge commit or reset strategy."

echo "➡️  Pushing ${TARGET_BRANCH} to ${REMOTE}..."
git push "${REMOTE}" "${TARGET_BRANCH}"

echo "🎉 Done. ${TARGET_BRANCH} is now at ${LATEST_TAG}"
