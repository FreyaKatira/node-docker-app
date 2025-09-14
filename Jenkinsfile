pipeline {
    agent any

    environment {
        registry = "freyakatira/node-docker-app"
        registryCredential = 'dockerhub'
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Build Image') {
            steps {
                script {
                    dockerImage = docker.build("${registry}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Scan Image') {
            steps {
                sh "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image ${registry}:${env.BUILD_NUMBER}"
            }
        }

        stage('Push') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push("${env.BUILD_NUMBER}")
                        dockerImage.push("latest")
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh "docker rmi ${registry}:${env.BUILD_NUMBER} || true"
            }
        }
    }

    post {
        always { cleanWs() }
    }
}
