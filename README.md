<img width="1902" height="913" alt="image" src="https://github.com/user-attachments/assets/f47f7c91-717f-4bfe-8dbd-9c019bd89063" />

# Pokedex FullStack DevOps Platform

A modern cloud-native Pokémon search application demonstrating **full DevOps practices**, from local development to a scalable Kubernetes deployment.  
This project showcases my skills in **containerization, orchestration, CI/CD, and infrastructure as code**.

A modern **cloud-native Pokémon search application** demonstrating complete DevOps practices from development to production Kubernetes deployment.

## 🚀 Next Phase: Production Readiness

### 🔗 External Access & Ingress
- [x] Deployed **Nginx Ingress Controller** for routing.
- [ ] Configure LoadBalancer support via **MetalLB**.
- [ ] Set up SSL/TLS certificates with **Cert-Manager**.
- [ ] Configure Windows hosts file for external DNS resolution.

### 🔄 CI/CD Pipeline
- [x] Tested **Jenkins** pipeline deployment on Kind.
- [x] Implemented logic with **Kustomization** to redeploy the cluster easily.
- [x] Successfully used `kubectl set image` to update **pokedex-frontend** deployment with commit-specific Docker tags (frontend header updated to "Pokedex v3").
- [ ] Implement automated deployment workflows.
- [ ] Configure blue-green deployment strategy.
- [ ] Set up automated rollback procedures.
- [ ] **Future improvement:** implement logic to detect backend/frontend code changes via `git diff` or similar, to decide which Docker images need to be rebuilt, saving pipeline execution time.

### 📊 Observability & Monitoring
- [ ] Implement **Prometheus** for metrics collection.
- [ ] Configure **Alertmanager** for notifications.
- [ ] Deploy **Grafana** for dashboards and visualization.
- [ ] Set up comprehensive logging stack (**Loki**, **Fluentd**).

### 🛡️ Security Hardening
- [ ] Implement **network policies** for pod-to-pod communication.
- [ ] Configure **RBAC** with least privilege principles.
- [ ] Set up **secret management** using external vaults.
- [ ] Enable **pod security standards**.

### 💾 Storage Optimization & Backups
- [x] Created a **local Docker registry** accessible by Kind for faster image pulls.
- [x] Implemented **MinIO** as S3-compatible storage outside the Kind cluster to persist **Postgres** and **Jenkins** data.
- [ ] Evaluate and test **NFS provisioner** for shared storage.
- [x] Implement backup scripts for persistent data outside the cluster using `kubectl exec`, `pg_dump`, `tar`, and `mc`.
- [ ] Configure storage class policies for different workloads.

<img width="1912" height="1000" alt="image" src="https://github.com/user-attachments/assets/bb3709bc-7d3a-4096-9403-f81dbd1ba60c" />

## 🔄 Smart Data Flow
User → Frontend → Backend → [Redis Cache?] → Pokémon API → 📊 PostgreSQL + Redis

**Intelligent Caching Workflow:**
1. User searches Pokémon
2. Backend checks Redis cache first
3. Cache miss → fetches from [PokeAPI](https://pokeapi.co)
4. Stores in Redis (cache) + PostgreSQL (analytics)
5. Returns formatted data to user

## 🏗️ Architecture

**Microservices Architecture:**
- **Frontend**: NGINX + Vanilla JS (responsive web interface)
- **Backend**: FastAPI (Python) with async endpoints  
- **Cache**: Redis (in-memory data store)
- **Database**: PostgreSQL (persistent analytics storage)
- **Orchestration**: Kubernetes - Kind (production deployment)

## 🚀 Key Features

- **⚡ High Performance**: Redis caching for <100ms responses
- **📈 Analytics Ready**: PostgreSQL structured for Grafana dashboards
- **🔍 Search History**: Local storage maintains user patterns
- **🎨 Responsive UI**: Mobile-friendly modern interface
- **🩺 Health Monitoring**: Kubernetes-ready health checks
- **🐳 Cloud Native**: Designed for container orchestration

## 🛠️ Tech Stack

```yaml
frontend: 
  - nginx:1.25
  - vanilla javascript
  - responsive css

backend:
  - fastapi
  - python 3.11+
  - async/await

infrastructure:
  - kubernetes
  - docker
  - redis
  - postgresql

---
```

## 🔧 CI/CD Setup
<img width="1902" height="910" alt="image" src="https://github.com/user-attachments/assets/52608fa1-88dc-4b0f-9139-1998c43d5df5" />

**Jenkins Pipeline with Kubernetes Agents**

### Jenkins Plugins Used
- Docker Pipeline
- Kubernetes CLI
- GitHub Integration

### Pipeline Agents
- **Kaniko Agent Pod**: builds Docker images for backend and frontend  
- **kubectl Agent Pod**: handles deployments to the Kubernetes cluster

### Deployment & Cluster Management
- Administered via terminal (`kubectl`) and **Lens IDE** (Kubernetes IDE)

### Pipeline Flow
1. Checkout code from GitHub
2. Build and push Docker images with Kaniko
3. Deploy microservices to Kubernetes using `kubectl`
4. Verify deployment status
> This setup allows building images **without Docker-in-Docker**, fully containerized, safe, and integrated with Kubernetes.

###💾 MinIO (AWS S3-compatible object storage solution)
<img width="1917" height="910" alt="image" src="https://github.com/user-attachments/assets/d5bb809c-082a-4741-aac0-47758f56e92f" />
I am using MinIO, a free and S3-compatible object storage solution, as an alternative to Amazon S3. I utilize it to store backups of my PostgreSQL database as well as the Jenkins workspace and related volumes, ensuring that all critical data is safely persisted and easily accessible for automation and recovery purposes.

## ❌ Problem with Minikube + Jenkins in Docker

When using **Minikube** together with **Jenkins running in Docker**, the last deployment step in Jenkins kept failing:

- **Authentication issues:** Jenkins couldn't properly communicate with the Minikube cluster because the Dockerized Jenkins instance was isolated from Minikube's Docker environment
- CI/CD tools running outside the Kubernetes node environment cannot access the cluster API or Docker socket without extra configuration

> As a result, deployments would fail at the final step

---

## ✅ Migrating to Kind - COMPLETED

Successfully migrated to **Kind** for several advantages:

- 🐳 Kind runs Kubernetes **inside Docker**, enabling seamless Jenkins integration
- 🎯 **Multi-node clusters** provide realistic testing environment
- 🔧 **Stable cluster** with functional DNS resolution and service discovery
- 🌐 **Networking stack** fully operational with CoreDNS

---

## ✅ Storage Implementation - COMPLETED

**Local-path provisioner** configured and operational:

- ✅ Simple and ideal for development environments  
- ✅ Data persists node-locally (doesn't move with pods)
- ✅ PostgreSQL and Redis using persistent volumes successfully

> *For production: NFS or Ceph would be implemented for shared storage*

---

## ✅ Core Infrastructure - COMPLETED

**All foundational components operational:**

- ✅ **DNS Resolution** - CoreDNS fully functional
- ✅ **Service Discovery** - Microservices communicating successfully  
- ✅ **Health Monitoring** - Comprehensive probes and checks implemented
- ✅ **Resource Optimization** - Uvicorn configured for containerized environment
- ✅ **Namespace Isolation** - Proper service mesh established
- ✅ **Persistent Storage** - Redis and PostgreSQL with stable volumes

---


### 🛠️ Tools Used
- **Kubernetes (Kind)** – local cluster for portfolio demos.
- **Docker / Docker Desktop** – container runtime and MinIO host.
- **Kustomize** – cluster deployment automation.
- **Jenkins** – CI/CD pipelines.
- **Postgres** – database.
- **MinIO** – S3-compatible backup storage.
- **Prometheus / Grafana / Loki / Fluentd** – observability stack.

---

## 🎯 Current Status

**✅ DEPLOYMENT SUCCESSFUL** - All core services healthy and operational:

| Service | Status | Details |
|---------|--------|---------|
| **Frontend** | ✅ Healthy | Ready for external access |
| **Backend** | ✅ Healthy | Optimized resource limits |
| **Redis** | ✅ Healthy | Persistent storage operational |
| **PostgreSQL** | ✅ Healthy | Persistent storage operational |
| **DNS** | ✅ Fully functional | Service discovery working |
| **Networking** | ✅ Stable | Internal communication established |

**📍 Next Focus:** External access configuration, CI/CD pipeline integration, and production-grade observability
