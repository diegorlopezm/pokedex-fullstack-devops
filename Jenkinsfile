pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id') // credenciales Docker Hub
        KUBE_CONFIG = credentials('kubeconfig-credentials-id')           // credenciales kubeconfig
        BACKEND_IMAGE = "diegorlopez/pokedex-frontend"
        FRONTEND_IMAGE = "diegorlopez/pokedex-frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/diegorlopezm/pokedex-fullstack-devops.git'
            }
        }

        stage('Build & Push Backend Docker') {
            steps {
                dir('backend') {
                    script {
                        sh "docker build -t ${BACKEND_IMAGE}:latest ."
                        sh "docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}"
                        sh "docker push ${BACKEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Build & Push Frontend Docker') {
            steps {
                dir('frontend') {
                    script {
                        sh "docker build -t ${FRONTEND_IMAGE}:latest ."
                        sh "docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}"
                        sh "docker push ${FRONTEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Guardamos kubeconfig temporalmente
                    writeFile file: 'kubeconfig', text: "${KUBE_CONFIG}"
                    sh "export KUBECONFIG=kubeconfig && kubectl set image deployment/backend backend=${BACKEND_IMAGE}:latest -n pokedex"
                    sh "export KUBECONFIG=kubeconfig && kubectl set image deployment/frontend frontend=${FRONTEND_IMAGE}:latest -n pokedex"
                }
            }
        }
    }
}
