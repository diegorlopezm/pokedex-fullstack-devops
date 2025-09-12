#!/bin/bash
set -e

# Cargar variables de entorno
export $(grep -v '^#' .env | xargs)

# Crear carpeta local si no existe
mkdir -p $BACKUP_DIR_JENKINS

# Nombre del backup
BACKUP_FILE=jenkins_home_$(date +%F_%H%M%S).tar.gz

# Hacer tar del Jenkins home desde el pod
kubectl exec -n $JENKINS_NS $(kubectl get pods -n $JENKINS_NS -l app=jenkins -o jsonpath="{.items[0].metadata.name}") \
    -- tar czf - -C /var/jenkins_home . > $BACKUP_DIR_JENKINS/$BACKUP_FILE

# Subir al bucket de MinIO
mc alias set $MINIO_ALIAS $MINIO_ENDPOINT $MINIO_ACCESS_KEY $MINIO_SECRET_KEY
mc mb --ignore-existing $MINIO_ALIAS/$MINIO_BUCKET_JENKINS
mc cp $BACKUP_DIR_JENKINS/$BACKUP_FILE $MINIO_ALIAS/$MINIO_BUCKET_JENKINS/

echo "Backup de Jenkins completado: $BACKUP_FILE"
