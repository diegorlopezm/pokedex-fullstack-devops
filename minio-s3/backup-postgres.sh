#!/bin/bash
set -e

# Cargar variables de entorno desde el archivo .env local
export $(grep -v '^#' .env | xargs)

# Crear carpeta local si no existe
mkdir -p "$BACKUP_DIR_POSTGRES"

# Nombre del dump con timestamp
BACKUP_FILE="$BACKUP_DIR_POSTGRES/pokedex_db_$(date +%F_%H%M%S).sql"

# Dump de Postgres desde el pod usando variables de entorno
kubectl exec -n "$POSTGRES_NS" -it deploy/pokedex-postgres -- pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "$BACKUP_FILE"

# Configurar alias de MinIO con variables de entorno
mc alias set "$MINIO_ALIAS" "$MINIO_ENDPOINT" "$MINIO_ACCESS_KEY" "$MINIO_SECRET_KEY"

# Crear bucket si no existe
mc mb --ignore-existing "$MINIO_ALIAS/$MINIO_BUCKET_POSTGRES"

# Subir backup al bucket
mc cp "$BACKUP_FILE" "$MINIO_ALIAS/$MINIO_BUCKET_POSTGRES/"

echo "Backup de Postgres completado: $BACKUP_FILE"

