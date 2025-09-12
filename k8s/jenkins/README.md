#Required Plugins:

Docker Pipeline → to build and push Docker images.

Kubernetes CLI → to run kubectl commands from Jenkins.

Kubernetes

GitHub Integration → for automatic triggers from your repository.

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

GitHub Integration → for automatic triggers from your repository.

---
🔐 Using DockerHub Secret with Jenkins + Kaniko on Kubernetes
1️⃣ Create the Secret in Kubernetes

Run the following command (replace with your real DockerHub credentials):

kubectl create secret docker-registry dockerhub-credentials \
  --docker-username=diegorlopez \
  --docker-password='YOUR_PASSWORD' \
  --docker-email='YOUR_EMAIL' \
  --namespace=jenkins


✅ This creates a kubernetes.io/dockerconfigjson Secret inside the cluster in the jenkins namespace.
The secret is stored in etcd (Kubernetes internal database), not in your code.

2️⃣ Verify the Secret

List secrets in the namespace:

kubectl get secrets -n jenkins


Example output:

NAME                   TYPE                                  DATA   AGE
dockerhub-credentials  kubernetes.io/dockerconfigjson        1      2m

3️⃣ Inspect the Secret (Optional)

To check details (without exposing the password in clear text):

kubectl describe secret dockerhub-credentials -n jenkins

4️⃣ Mount the Secret in Jenkins Pod Template

Update your Jenkins podTemplate to mount the Secret for Kaniko:

volumes:
  - name: docker-config
    projected:
      sources:
        - secret:
            name: dockerhub-credentials
            items:
              - key: .dockerconfigjson
                path: config.json


And in the kaniko container definition:

volumeMounts:
  - name: docker-config
    mountPath: /kaniko/.docker

5️⃣ Kaniko Push to DockerHub

With the secret mounted, Kaniko automatically picks up the credentials from
/kaniko/.docker/config.json and can push images to DockerHub.

Example Jenkins pipeline step:

stage('Build & Push Backend') {
    steps {
        container('kaniko') {
            dir('backend') {
                sh """
                    /kaniko/executor \
                      --dockerfile=Dockerfile \
                      --context=. \
                      --destination=diegorlopez/pokedex-backend:latest \
                      --skip-tls-verify
                """
            }
        }
    }
}

✅ Summary

kubectl create secret creates the secret directly in Kubernetes (no YAML file required).

Jenkins mounts the secret into the Kaniko container.

Kaniko authenticates to DockerHub automatically and pushes the images.