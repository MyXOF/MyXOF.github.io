pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out branch ' + env.BRANCH_NAME
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Dependencies'
                sh 'bundle install --without test'
            }
        }

        stage('Build') {
            steps {
                echo 'Building..'
                rm -rf _site/
                sh 'jekyll build --config _config.yml'
            }
        }
        stage('Deploy') {
            when {
                expression {
                    currentBuild.result == 'SUCCESS' && env.BRANCH_NAME == 'gh-pages'
                }
            }
            steps {
                echo 'Deploying....'
                sh 'npm install'
                sh 'npm run deploy'
            }
        }
    }
}
