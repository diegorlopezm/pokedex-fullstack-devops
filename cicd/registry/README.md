# 📦 Local Docker Registry (for Kind + Jenkins)

This local registry allows you to store Docker images **quickly** without relying on Docker Hub.  
It is used as part of the CI/CD infrastructure with **Jenkins + Kaniko + Kind**.

---

## 🚀 Start the registry

### Option 1: Using Docker Compose (recommended for persistence)

```bash
cd cicd/registry
docker-compose up -d

---

## 🛠️ Extending the Registry

This setup is minimal. You can extend it later with:

- **Authentication** (via htpasswd)  
- **TLS certificates**  
- **Remote storage** (e.g. S3, GCS, Azure Blob)  
- **Proxying Docker Hub**  

### Example extended config:

```yaml
version: 0.1
storage:
  s3:
    bucket: my-registry-bucket
    region: us-east-1
    accesskey: <ACCESS_KEY>
    secretkey: <SECRET_KEY>
http:
  addr: :5000
  tls:
    certificate: /certs/domain.crt
    key: /certs/domain.key
auth:
  htpasswd:
    realm: basic-realm
    path: /auth/htpasswd

✅ With this setup, Jenkins pipelines can push images to your local registry using Kaniko, and then Kind can pull them directly.