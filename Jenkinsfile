pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
        BACKEND_IMAGE = "diegorlopez/pokedex-backend"
        FRONTEND_IMAGE = "diegorlopez/pokedex-frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                script {
                    // Clonamos el repo en un subdirectorio "repo"
                    sh 'git clone -b main https://github.com/diegorlopezm/pokedex-fullstack-devops.git repo || true'
                }
            }
        }

        stage('Build & Push Backend Docker') {
            steps {
                dir('repo/backend') {
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
                dir('repo/frontend') {
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
                dir('repo') {
                    script {
                        // Usamos el secret como archivo
                        withCredentials([file(credentialsId: 'kubeconfig-credentials-id', variable: 'KUBE_CONFIG_FILE')]) {
                            // Mostramos contenido del kubeconfig (para debugging)
                            sh 'echo "==== kubeconfig content ===="'
                            sh 'cat $KUBE_CONFIG_FILE'
                            sh 'echo "==========================="'

                            // Exportamos KUBECONFIG y hacemos el deploy
                            sh """
                                export KUBECONFIG=$KUBE_CONFIG_FILE
                                kubectl set image deployment/backend backend=${BACKEND_IMAGE}:latest -n pokedex
                                kubectl set image deployment/frontend frontend=${FRONTEND_IMAGE}:latest -n pokedex
                            """
                        }
                    }
                }
            }
        }

    }
}
