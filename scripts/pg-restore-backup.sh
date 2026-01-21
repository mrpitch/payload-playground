#!/usr/bin/env bash
# pg-restore-backup.sh
# Restore schema + data into a remote Postgres using pg_restore --dbname (Postgres connection URL),
# executed INSIDE your local Postgres Docker container (so you don't need pg_restore installed locally).
#
# Assumptions:
# - Your docker-compose mounts ./db-backup to /db-backup in the container:
#     - ./db-backup:/db-backup
# - Your dump files are stored in ./db-backup (host) and visible as /db-backup (container).
#
# Prompts for:
#   - dump filename/path (host path or container path)
#   - DB_URL (postgresql://user@host:port/db?sslmode=require)
#   - PGPASSWORD (if not set)
#
# Optional env vars:
#   CONTAINER_NAME (defaults to payload-playground-db-dev)
#   JOBS (defaults to 4)
#   CLEAN_FLAGS (defaults to "--clean --if-exists"; set to "" to merge)

set -euo pipefail

CONTAINER_NAME="${CONTAINER_NAME:-payload-playground-db-dev}"
CONTAINER_BACKUP_DIR="/db-backup"

CLEAN_FLAGS="${CLEAN_FLAGS:---clean --if-exists}"
JOBS="${JOBS:-4}"

DEFAULT_DUMP_FILE="${1:-}"        # allow passing a dump file as arg
DEFAULT_DB_URL="${DB_URL:-}"

# --- ensure container exists
if ! docker ps --format '{{.Names}}' | grep -qx "${CONTAINER_NAME}"; then
  echo "❌ Container not running: ${CONTAINER_NAME}" >&2
  echo "   Start it with: docker compose up -d" >&2
  exit 1
fi

# --- ensure backup mount exists in container
if ! docker exec -t "${CONTAINER_NAME}" sh -c "test -d '${CONTAINER_BACKUP_DIR}'"; then
  echo "❌ Container cannot access ${CONTAINER_BACKUP_DIR}." >&2
  echo "   Add this to docker-compose volumes and restart:" >&2
  echo "     - ./db-backup:/db-backup" >&2
  exit 1
fi

# --- prompt: dump file
if [[ -n "${DEFAULT_DUMP_FILE}" ]]; then
  read -r -p "Dump file (host ./db-backup/... or container /db-backup/...) [${DEFAULT_DUMP_FILE}]: " DUMP_IN
  DUMP_FILE="${DUMP_IN:-$DEFAULT_DUMP_FILE}"
else
  read -r -p "Dump file (host ./db-backup/... or container /db-backup/...): " DUMP_FILE
fi

# Map host path -> container path if needed
# If user provides "./db-backup/foo.dump" or "db-backup/foo.dump", convert to "/db-backup/foo.dump"
if [[ "${DUMP_FILE}" == ./db-backup/* ]]; then
  DUMP_FILE_IN_CONTAINER="${CONTAINER_BACKUP_DIR}/${DUMP_FILE#./db-backup/}"
elif [[ "${DUMP_FILE}" == db-backup/* ]]; then
  DUMP_FILE_IN_CONTAINER="${CONTAINER_BACKUP_DIR}/${DUMP_FILE#db-backup/}"
elif [[ "${DUMP_FILE}" == "${CONTAINER_BACKUP_DIR}"/* ]]; then
  DUMP_FILE_IN_CONTAINER="${DUMP_FILE}"
else
  # If they provided just a filename, assume it's in /db-backup
  DUMP_FILE_IN_CONTAINER="${CONTAINER_BACKUP_DIR}/${DUMP_FILE}"
fi

# Validate dump exists (inside container)
if ! docker exec -t "${CONTAINER_NAME}" sh -c "test -f '${DUMP_FILE_IN_CONTAINER}'"; then
  echo "❌ Dump file not found in container: ${DUMP_FILE_IN_CONTAINER}" >&2
  echo "   Tip: put the dump into ./db-backup on the host, then reference it here." >&2
  exit 1
fi

# --- prompt: db url
if [[ -n "${DEFAULT_DB_URL}" ]]; then
  read -r -p "Postgres DB_URL [${DEFAULT_DB_URL}]: " DB_URL_INPUT
  DB_URL="${DB_URL_INPUT:-$DEFAULT_DB_URL}"
else
  read -r -p "Postgres DB_URL (e.g. postgresql://user@host:5432/db?sslmode=require): " DB_URL
fi

if [[ -z "${DB_URL}" ]]; then
  echo "❌ DB_URL is required." >&2
  exit 1
fi


echo "==> Restoring '${DUMP_FILE_IN_CONTAINER}' into '${DB_URL}' ..."
echo "    container=${CONTAINER_NAME}"
echo "    jobs=${JOBS}"
echo "    clean_flags='${CLEAN_FLAGS}'"

# Run restore inside the container.
# We pass PGPASSWORD into the container env for this command only.
# shellcheck disable=SC2086
docker exec -t \
  "${CONTAINER_NAME}" \
  pg_restore \
    --dbname="${DB_URL}" \
    ${CLEAN_FLAGS} \
    --no-owner --no-acl \
    -j "${JOBS}" \
    "${DUMP_FILE_IN_CONTAINER}"

echo "✅ Done. Restore completed."
