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

        stage('Install & Build Project') {
            agent {
                docker {
                    image 'node:20'
                    args '-u root:root'
                }
            }
            steps {
                sh '''
                    set -e
                    corepack enable

                    # Detect and install dependencies
                    if [ -f yarn.lock ]; then
                        echo "Using Yarn"
                        yarn install --frozen-lockfile
                        BUILD_CMD="yarn build"
                    elif [ -f pnpm-lock.yaml ]; then
                        echo "Using PNPM"
                        pnpm install --frozen-lockfile
                        BUILD_CMD="pnpm run build"
                    else
                        echo "Using NPM"
                        npm install
                        BUILD_CMD="npm run build"
                    fi

                    # Detect framework
                    if grep -q '"next"' package.json; then
                        echo "Detected Next.js"
                        eval "$BUILD_CMD"
                    elif grep -q '"vite"' package.json; then
                        echo "Detected Vite"
                        eval "$BUILD_CMD"
                    else
                        echo "Detected React (CRA)"
                        eval "$BUILD_CMD"
                    fi
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE:${BUILD_NUMBER} .'
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo "Logging in to Docker Hub..."
                    if (sh(script: 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin', returnStatus: true) == 0) {
                        sh 'docker push $IMAGE:${BUILD_NUMBER}'
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
            echo "Pipeline completed for project: ${env.JOB_NAME}"
        }
    }
}
