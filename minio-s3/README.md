## 💾 MinIO for Backups of Postgres and Jenkins

For this portfolio project, I use **MinIO** as S3-compatible storage to back up Postgres and Jenkins data. To simulate a realistic production setup, **MinIO runs outside the Kind cluster** on Docker Desktop. This ensures that even if the Kind cluster is destroyed and recreated, backups remain safe.

### 🖥️ Running MinIO

Start MinIO on Docker Desktop (outside Kind) to persist backups. Data persists on the host, even if Kind is destroyed.

Access the web UI at: http://localhost:9090  
User: `admin`  
Password: `supersecret`

### ⚙️ MinIO Client (mc)

On the machine running Kind or any machine with `kubectl` access, install **mc** to interact with MinIO:

```bash
wget https://dl.min.io/client/mc/release/linux-amd64/mc
chmod +x mc
sudo mv mc /usr/local/bin/
mc --version
Then configure an alias:
mc alias set localminio http://localhost:9000 admin supersecret

📦 Backup Workflow
Dump Postgres and archive Jenkins data from the Kind cluster.

Store locally in folders defined in .env.

Upload to MinIO using mc cp.

Scripts use .env file.


🔁 Flow
Kind Cluster (Postgres / Jenkins)
        │
        │ pg_dump / tar.gz
        ▼
Local host backup folder
        │
        │ mc cp
        ▼
MinIO (Docker Desktop)
        │
        │ Persistent outside Kind
        ▼
Restore anytime
Advantages:

Data persists outside Kind cluster.

S3-compatible storage simulates production.

Easy for others to reproduce and test.

Fully scriptable for CI/CD pipelines.