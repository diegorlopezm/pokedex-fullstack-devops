pipeline {
    agent {
        kubernetes {
            label 'jenkins-agent'
            yaml """
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: jenkins
  containers:
    - name: kaniko
      image: kind-registry:5000/kaniko-executor:debug
      command:
        - cat
      tty: true
    - name: kubectl
      image: kind-registry:5000/k8s-kubectl:latest
      command:
        - cat
      tty: true
"""
        }
    }

    environment {
        //Generate a short git commit hash for tagging images
        GIT_COMMIT_HASH = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
        BACKEND_IMAGE = "kind-registry:5000/pokedex-backend"
        FRONTEND_IMAGE = "kind-registry:5000/pokedex-frontend"
        REGISTRY = "kind-registry:5000"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
/*
        stage('Build & Push Backend') {
            steps {
                container('kaniko') {
                    dir('backend') {
                        sh """
                            /kaniko/executor \
                              --dockerfile=Dockerfile \
                              --context=. \
                              --destination=${BACKEND_IMAGE}:${GIT_COMMIT_HASH} \
                              --cache=true \
                              --cache-repo=${REGISTRY}/pokedex-cache \
                              --insecure \
                              --skip-tls-verify
                        """
                    }
                }
            }
        }
*/
        stage('Build & Push Frontend') {
            steps {
                container('kaniko') {
                    dir('frontend') {
                        sh """
                            /kaniko/executor \
                              --dockerfile=Dockerfile \
                              --context=. \
                              --destination=${FRONTEND_IMAGE}:${GIT_COMMIT_HASH} \
                              --destination=${FRONTEND_IMAGE}:latest \
                              --cache=true \
                              --cache-repo=${REGISTRY}/pokedex-cache \
                              --insecure \
                              --skip-tls-verify
                        """
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                container('kubectl') {
                    sh """
                        cd k8s/backend
                        kubectl apply -k . --namespace=pokedex
                        cd ../frontend
                        kubectl apply -k . --namespace=pokedex
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                container('kubectl') {
                    sh """
                        cd k8s/frontend
                        kustomize edit set image kind-registry:5000/pokedex-frontend=${FRONTEND_IMAGE}:${GIT_COMMIT_HASH}
                        kubectl apply -k . --namespace=pokedex
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
        }
        success {
            echo '✅ Deployment completed successfully!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
