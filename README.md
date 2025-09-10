<img width="1918" height="989" alt="image" src="https://github.com/user-attachments/assets/9f546edf-ce82-48ae-8c4e-413af63bf033" />

# Pokedex FullStack DevOps Platform

A modern cloud-native Pokémon search application demonstrating **full DevOps practices**, from local development to a scalable Kubernetes deployment.  
This project showcases my skills in **containerization, orchestration, CI/CD, and infrastructure as code**.

---

## Problem with Minikube + Jenkins in Docker

When using **Minikube** together with **Jenkins running in Docker**, the last deployment step in Jenkins kept failing:

- **Authentication issues:** Jenkins couldn’t properly communicate with the Minikube cluster because the Dockerized Jenkins instance was isolated from Minikube’s Docker environment.
- CI/CD tools running outside the Kubernetes node environment cannot access the cluster API or Docker socket without extra configuration.

> As a result, deployments would fail at the final step.

---

## Migrating to Kind

I migrated to **Kind** for several reasons:

- Kind runs Kubernetes **inside Docker**, making it easier for Jenkins (also in Docker) to communicate with the cluster.
- It allows **multi-node clusters**, providing a more realistic testing environment.

---

## Storage Considerations

Choosing the right **persistent volume provisioner** is important depending on the environment:

### Local-path (default for Kind)
- Simple and ideal for development.
- Data is **node-local**, meaning it stays on the node and doesn’t move with pods.

### NFS
- Shared storage across nodes.
- Slightly slower, but useful if multiple nodes need access to the same data.

### Ceph / Rook
- Highly available, replicated storage.
- More complex to configure, suitable for **production-like setups**.

> For local development and testing, `local-path` is sufficient. For a production simulation, NFS or Ceph is recommended.

---

## Networking & Ingress

To access the Kind cluster from **Windows** (outside WSL Docker):

- [ ] Deploy an **Ingress Controller**, e.g., `Nginx Ingress`.
- [ ] Update the **Windows hosts file** to map ingress hostnames to the cluster IP.

> This allows accessing services in Kind as if it were a real production environment.

---

## Deployment Checklist

- [ ] Migrate from Minikube to Kind  
- [ ] Select persistent volume provisioner (`local-path` / NFS / Ceph)  
- [ ] Deploy Nginx Ingress Controller  
- [ ] Configure Windows hosts file for external access  
- [ ] Test full deployment from Jenkins container to Kind cluster  

---

## Post-deployment Tasks

- [ ] **Fix app-specific bugs:** The application works fine with `docker-compose`, but some issues appear in Kubernetes. These need to be resolved once the deployment cycle is functional.
- [ ] **Implement Observability:** Set up **Prometheus**, **Alertmanager**, and **Grafana** to monitor the cluster and application metrics.


