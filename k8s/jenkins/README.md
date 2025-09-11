1️⃣ En Jenkins, ve a Manage Jenkins → Configure Clouds → Add a new cloud → Kubernetes y agrega tu cluster con la URL interna del service y credenciales.  
2️⃣ Define pod templates con la imagen del agente (ej. jenkins/inbound-agent) y contenedores necesarios para tus pipelines; guarda y listo.

Pasos rápidos:

Ve a Manage Jenkins → Configure System → Jenkins Location → Jenkins URL

Pega la URL:

http://jenkins.jenkins.svc.cluster.local:8080/

La url de kubernetes se puede dejar vacia ya que jenkins se ejecuta en el propio cluster de kind


Get initial admin password:
docker exec -it jenkins_server cat /var/jenkins_home/secrets/initialAdminPassword

#Required Plugins:

Docker Pipeline → to build and push Docker images.

Kubernetes CLI → to run kubectl commands from Jenkins.

GitHub Integration / Git Plugin → for automatic triggers from your repository.