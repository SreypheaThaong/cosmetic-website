pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('Docker-token')
        IMAGE = "phea12/next-homework-image"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build Next.js') {
            agent {
                docker {
                    image 'node:18'
                    args '-u root:root'
                }
            }
            steps {
                sh '''
                    corepack enable

                    if [ -f yarn.lock ]; then
                        echo "Detected yarn.lock — using Yarn"
                        yarn install --frozen-lockfile
                        yarn build
                    elif [ -f pnpm-lock.yaml ]; then
                        echo "Detected pnpm-lock.yaml — using PNPM"
                        pnpm install --frozen-lockfile
                        pnpm run build
                    else
                        echo "Defaulting to npm"
                        npm install
                        npm run build
                    fi
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE:${BUILD_NUMBER} ."
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo "Logging in to Docker Hub..."
                    if (sh(script: 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin', returnStatus: true) == 0) {
                        sh "docker push $IMAGE:${BUILD_NUMBER}"
                        echo "✅ Image pushed successfully!"
                    } else {
                        error("❌ Docker login failed")
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}
