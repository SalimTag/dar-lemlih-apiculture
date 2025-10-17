#!/usr/bin/env bash
set -euo pipefail

# Usage: ./infra/scripts/db/backup.sh [container=db] [database=darlemlih]
CONTAINER=${1:-darlemlih-db}
DATABASE=${2:-darlemlih}
TS=$(date +%Y%m%d_%H%M%S)
OUTDIR=${OUTDIR:-./backups}
mkdir -p "$OUTDIR"
FILE="$OUTDIR/${DATABASE}_$TS.sql.gz"

echo "Backing up MySQL '$DATABASE' from container '$CONTAINER' to $FILE"
docker exec "$CONTAINER" /bin/sh -c "mysqldump -u \"$MYSQL_USER\" -p\"$MYSQL_PASSWORD\" $DATABASE | gzip -c" > "$FILE"
echo "Backup complete: $FILE"

