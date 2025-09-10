# Jenkins - Pokedex Project
Run Jenkins locally with Docker Compose.

## Quick Start
cd jenkins

docker-compose up -d

Open in browser: http://localhost:8080

Get initial admin password:
docker exec -it jenkins_server cat /var/jenkins_home/secrets/initialAdminPassword

Install suggested plugins and create your admin user.

Data persists in the jenkins_home volume. Fresh clone = new Jenkins instance.

#Required Plugins:

Docker Pipeline → to build and push Docker images.

Kubernetes CLI → to run kubectl commands from Jenkins.

GitHub Integration / Git Plugin → for automatic triggers from your repository.