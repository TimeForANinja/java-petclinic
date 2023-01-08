pipeline {
    agent any
    triggers {
        githubPush()
    }

    tools {
        maven 'mvn_v3_8_6'
        nodejs 'NodeJS_v19.4.0'
    }

    stages {
        stage('Install dependencies') {
            steps {
                // Navigate to frontend folder
                bat '''
                    ls
                    cd spring-petclinic-angular
                    pwd
                    ls
                    npm install --legacy-peer-deps
                    cd ..
                '''
            }
        }

        stage('Build backend') {
            steps {
                echo '---------------------Building backend...'
                sh 'cd spring-petclinic-rest'
                sh 'mvn -B install --file pom.xml'
                sh 'cd ..'
                echo '---------------------Done building backend'
            }
            
        }

        stage('Unit-Test backend') {
            steps {
                echo '---------------------Unit-testing backend...'
                echo '---------------------finished unit-testing backend'
            }
        }

        stage('Build frontend') {
            steps {
                sh 'cd spring-petclinic-angular'
                sh 'npm run build --if-present -- --prod'
                sh 'cd ..'
            }
        }

        stage('Lint frontend') {
            steps {
                sh 'cd spring-petclinic-angular'
                sh 'npm run lint'
                sh 'cd ..'
            }
        }

        stage('Unit-Test frontend') {
            steps {
                sh 'cd spring-petclinic-angular'
                sh 'npm run test-headless'
                sh 'cd ..'
            }
        }

        stage('UI-Tests') {
            steps {
                echo '---------------------Starting UI-Testing with Cypress...'
                echo '---------------------finished UI-Tests with Cypress'
            }
        }


    }
}