# Jenkins - Pokedex Project
Run Jenkins locally with Docker Compose.

## Quick Start
cd jenkins

docker-compose up -d

Open in browser: http://localhost:8080

Get initial admin password:
docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword

Install suggested plugins and create your admin user.

Data persists in the jenkins_home volume. Fresh clone = new Jenkins instance.

