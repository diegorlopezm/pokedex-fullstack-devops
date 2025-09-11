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
      image: gcr.io/kaniko-project/executor:debug
      command:
        - cat
      tty: true
      volumeMounts:
        - name: docker-config
          mountPath: /kaniko/.docker
    - name: kubectl
      image: bitnami/kubectl:1.28
      command:
        - cat
      tty: true
  volumes:
    - name: docker-config
      projected:
        sources:
          - secret:
              name: dockerhub-credentials
              items:
                - key: .dockerconfigjson
                  path: config.json
"""
        }
    }

    environment {
        BACKEND_IMAGE = "diegorlopez/pokedex-backend"
        FRONTEND_IMAGE = "diegorlopez/pokedex-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Backend') {
            steps {
                container('kaniko') {
                    dir('backend') {
                        sh """
                            /kaniko/executor \
                              --dockerfile=Dockerfile \
                              --context=. \
                              --destination=${BACKEND_IMAGE}:latest \
                              --cache=true \
                              --cache-repo=diegorlopez/pokedex-cache \
                              --skip-tls-verify
                        """
                    }
                }
            }
        }

        stage('Build & Push Frontend') {
            steps {
                container('kaniko') {
                    dir('frontend') {
                        sh """
                            /kaniko/executor \
                              --dockerfile=Dockerfile \
                              --context=. \
                              --destination=${FRONTEND_IMAGE}:latest \
                              --cache=true \
                              --cache-repo=diegorlopez/pokedex-cache \
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
                        cd ../database
                        kubectl apply -k . --namespace=pokedex
                        cd ../cache
                        kubectl apply -k . --namespace=pokedex
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                container('kubectl') {
                    sh """
                        kubectl rollout status deployment/backend -n pokedex --timeout=120s
                        kubectl rollout status deployment/frontend -n pokedex --timeout=120s
                        kubectl get all -n pokedex
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
