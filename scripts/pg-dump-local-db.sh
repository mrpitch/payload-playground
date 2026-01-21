#!/usr/bin/env bash
# pg-dump-local-db.sh
# Export schema + data from a local Postgres running in a Docker container to a local .dump file (custom format).
#
# Uses values from .env:
#   DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD
# Optional:
#   DATABASE_CONTAINER_NAME (defaults to payload-playground-db-dev)
#   BACKUP_DIR (defaults to ./db-backup)
#
# Writes the dump into the host-mounted folder (no docker cp needed):
#   <BACKUP_DIR>/<DATABASE_NAME>_<timestamp>.dump
#
# Run:
#   bash ./scripts/pg-dump-local-db.sh .env

set -euo pipefail

ENV_FILE="${1:-.env}"
[[ -f "$ENV_FILE" ]] || { echo "❌ .env not found: $ENV_FILE" >&2; exit 1; }

# --- dotenv-style reader (reads KEY=VALUE only; ignores other lines)
get_env() {
  local key="$1"
  local default="${2:-}"
  local val=""

  # last match wins; strips surrounding quotes
  val="$(grep -E "^[[:space:]]*${key}=" "$ENV_FILE" | tail -n 1 | sed -E "s/^[[:space:]]*${key}=//; s/^[\"'](.*)[\"']$/\1/")"

  if [[ -z "$val" ]]; then
    if [[ -n "$default" ]]; then
      printf '%s' "$default"
      return 0
    fi
    echo "❌ Missing ${key} in ${ENV_FILE}" >&2
    exit 1
  fi

  printf '%s' "$val"
}

DB_NAME="$(get_env DATABASE_NAME)"
DB_USER="$(get_env DATABASE_USERNAME)"
DB_PASSWORD="$(get_env DATABASE_PASSWORD)"
CONTAINER_NAME="$(get_env DATABASE_CONTAINER_NAME payload-playground-db-dev)"
BACKUP_DIR="$(get_env BACKUP_DIR ./db-backup)"

echo "Using:"
echo "  CONTAINER_NAME=$CONTAINER_NAME"
echo "  DB_NAME=$DB_NAME"
echo "  DB_USER=$DB_USER"
echo "  BACKUP_DIR=$BACKUP_DIR"

# Ensure host backup dir exists
mkdir -p "$BACKUP_DIR"

# Resolve BACKUP_DIR to an absolute path for sanity
BACKUP_DIR_ABS="$(cd "$BACKUP_DIR" && pwd)"

# This path must match the bind mount in docker-compose:
#   - ./db-backup:/db-backup
CONTAINER_BACKUP_DIR="/db-backup"

# Quick check: does the container see /db-backup?
if ! docker exec -t "$CONTAINER_NAME" sh -c "test -d '$CONTAINER_BACKUP_DIR'"; then
  echo "❌ Container cannot access ${CONTAINER_BACKUP_DIR}." >&2
  echo "   Add this to docker-compose volumes and restart:" >&2
  echo "     - ./db-backup:/db-backup" >&2
  exit 1
fi

DUMP_BASENAME="${DUMP_BASENAME:-${DB_NAME}_$(date +%Y%m%d_%H%M%S).dump}"
HOST_DUMP_PATH="${BACKUP_DIR_ABS%/}/${DUMP_BASENAME}"
CONTAINER_DUMP_PATH="${CONTAINER_BACKUP_DIR%/}/${DUMP_BASENAME}"

echo "==> Exporting DB '${DB_NAME}' from container '${CONTAINER_NAME}' ..."
echo "    Writing to host: ${HOST_DUMP_PATH}"

docker exec -t \
  -e PGPASSWORD="${DB_PASSWORD}" \
  "${CONTAINER_NAME}" \
  pg_dump -Fc \
    -U "${DB_USER}" \
    -d "${DB_NAME}" \
    --no-owner --no-acl \
    -f "${CONTAINER_DUMP_PATH}"

echo "✅ Done. Dump written to: ${HOST_DUMP_PATH}"
