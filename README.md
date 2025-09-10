<img width="1918" height="989" alt="image" src="https://github.com/user-attachments/assets/9f546edf-ce82-48ae-8c4e-413af63bf033" />

# Pokedex FullStack DevOps Platform

A modern cloud-native Pokémon search application demonstrating **full DevOps practices**, from local development to a scalable Kubernetes deployment.  
This project showcases my skills in **containerization, orchestration, CI/CD, and infrastructure as code**.

---

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

## 🚀 Next Phase: Production Readiness

### 🔗 External Access & Ingress
- [ ] Deploy Nginx Ingress Controller
- [ ] Configure LoadBalancer support via MetalLB  
- [ ] Set up SSL/TLS certificates with Cert-Manager
- [ ] Configure Windows hosts file for external DNS

### 🔄 CI/CD Pipeline
- [ ] Test Jenkins pipeline deployment to Kind
- [ ] Implement automated deployment workflows
- [ ] Configure blue-green deployment strategy
- [ ] Set up automated rollback procedures

### 📊 Observability & Monitoring
- [ ] Implement Prometheus for metrics collection
- [ ] Configure Alertmanager for notifications
- [ ] Deploy Grafana for dashboards and visualization
- [ ] Set up comprehensive logging stack (Loki/Fluentd)

### 🛡️ Security Hardening
- [ ] Implement network policies for pod communication
- [ ] Configure RBAC with least privilege principles
- [ ] Set up secret management with external vault
- [ ] Enable pod security standards

### 💾 Storage Optimization
- [ ] Evaluate and test NFS provisioner for shared storage
- [ ] Implement backup strategies for persistent data
- [ ] Configure storage class policies for different workloads

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
