pipeline {
    agent {
        kubernetes {
            label 'jenkins-agent'
            yaml '''
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: jenkins  # ✅ Usa el ServiceAccount que creaste
  containers:
  - name: docker
    image: docker:24.0
    command: ["cat"]
    tty: true
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: docker-sock
  - name: kubectl
    image: bitnami/kubectl:1.28
    command: ["cat"] 
    tty: true
  volumes:
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock
'''
        }
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
        BACKEND_IMAGE = "diegorlopez/pokedex-backend"
        FRONTEND_IMAGE = "diegorlopez/pokedex-frontend"
        KUBECONFIG = '/var/run/secrets/kubernetes.io/serviceaccount/token'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm  
            }
        }

        stage('Build & Push Backend') {
            steps {
                container('docker') {  
                    dir('backend') {
                        sh """
                            docker build -t ${BACKEND_IMAGE}:latest .
                            docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}
                            docker push ${BACKEND_IMAGE}:latest
                        """
                    }
                }
            }
        }

        stage('Build & Push Frontend') {
            steps {
                container('docker') {
                    dir('frontend') {
                        sh """
                            docker build -t ${FRONTEND_IMAGE}:latest .
                            docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}
                            docker push ${FRONTEND_IMAGE}:latest
                        """
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                container('kubectl') {  
                    script {
                        //  Aplicar TODOS los recursos con Kustomize
                        sh """
                            # Aplicar backend con la nueva imagen
                            cd k8s/backend
                            kubectl apply -k . --namespace=pokedex
                            
                            # Aplicar frontend con la nueva imagen  
                            cd ../frontend
                            kubectl apply -k . --namespace=pokedex
                            
                            # Aplicar base de datos y cache (si es necesario)
                            cd ../database
                            kubectl apply -k . --namespace=pokedex
                            
                            cd ../cache  
                            kubectl apply -k . --namespace=pokedex
                        """
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                container('kubectl') {
                    script {
                        // ✅ Verificar que todo está funcionando
                        sh """
                            kubectl rollout status deployment/backend -n pokedex --timeout=120s
                            kubectl rollout status deployment/frontend -n pokedex --timeout=120s
                            kubectl get all -n pokedex
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            // ✅ Limpieza de credenciales de Docker
            container('docker') {
                sh 'docker logout'
            }
        }
        success {
            echo '✅ Deployment completed successfully!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}