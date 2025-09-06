FROM python:3.11-alpine

WORKDIR /app

# Copiar archivos estáticos
COPY . .

# Exponer puerto
EXPOSE 5500

# Health check simple
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5500 || exit 1

# Servir con Python
CMD ["python", "-m", "http.server", "5500"]