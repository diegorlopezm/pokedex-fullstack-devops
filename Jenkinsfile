pipeline {
    agent any

    stages {
        stage('Workspace Info') {
            steps {
                script {
                    sh 'echo "Workspace actual: $PWD"'
                    sh 'ls -la'
                }
            }
        }

        stage('Git Test') {
            steps {
                script {
                    sh 'git --version'
                    sh 'git clone https://github.com/diegorlopezm/pokedex-fullstack-devops.git prueba-git || true'
                    sh 'ls -la prueba-git'
                }
            }
        }
    }
}
