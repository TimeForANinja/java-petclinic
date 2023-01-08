pipeline {
    agent any
    triggers {
        githubPush()
    }

    tools {
        maven 'mvn_v3_8_6'
        nodejs 'NodeJS_v16.13.0'
        'org.jenkinsci.plugins.docker.commons.tools.DockerTool' 'docker'
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh '''
                    cd spring-petclinic-angular
                    npm install --legacy-peer-deps
                    cd ..
                    apt-get update
                    apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
                '''
            }
        }

        stage('Build backend') {
            steps {
            sh '''
                echo "---------------------Building backend..."
                cd spring-petclinic-rest
                mvn -B install --file pom.xml
                cd ..
                echo "---------------------Done building backend"
            '''
            }
            
        }

        stage('Unit-Test backend') {
            steps {
                sh '''
                    echo "---------------------Unit-testing backend..."
                    echo "---------------------finished unit-testing backend"
                '''
            }
        }

        stage('Build frontend') {
            steps {
                sh '''
                    cd spring-petclinic-angular
                    npm run build --if-present -- --prod
                    cd ..
                '''
            }
        }

        stage('Lint frontend') {
            steps {
                sh '''
                    cd spring-petclinic-angular
                    npm run lint
                    cd ..
                '''
            }
        }

        /*stage('Unit-Test frontend') {
            steps {
                sh '''
                    cd spring-petclinic-angular
                    npm run test-headless
                    cd ..
                '''
            }
        }*/

        stage('UI-Tests') {
            steps {
                sh '''
                    echo "---------------------Starting UI-Testing with Cypress..."
                    npx cypress run --record false
                    echo "---------------------finished UI-Tests with Cypress"
                '''
            }
        }


    }
}