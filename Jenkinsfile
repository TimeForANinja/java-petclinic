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
<<<<<<< Updated upstream
            // Navigate to frontend folder
            sh 'cd spring-petclinic-angular'
            sh 'npm ci'
            sh 'cd ..'
=======
            steps {
                // Navigate to frontend folder
                sh 'cd spring-petclinic-angular'
                sh 'npm install --legacy-peer-deps'
                sh 'cd ..'
            }
>>>>>>> Stashed changes
        }

        stage('Build backend') {
            echo '---------------------Building backend...'
            sh 'cd spring-petclinic-rest'
            sh 'mvn -B install --file pom.xml'
            sh 'cd ..'
            echo '---------------------Done building backend'
        }

        stage('Unit-Test backend') {
            echo '---------------------Unit-testing backend...'
            echo '---------------------finished unit-testing backend'
        }

        stage('Build frontend') {
            sh 'cd spring-petclinic-angular'
            sh 'npm run build --if-present -- --prod'
            sh 'cd ..'
        }

        stage('Lint frontend') {
            sh 'cd spring-petclinic-angular'
            sh 'npm run lint'
            sh 'cd ..'
        }

        stage('Unit-Test frontend') {
            sh 'cd spring-petclinic-angular'
            sh 'npm run test-headless'
            sh 'cd ..'
        }

        stage('UI-Tests') {
            echo '---------------------Starting UI-Testing with Cypress...'
            echo '---------------------finished UI-Tests with Cypress'
        }


    }
}