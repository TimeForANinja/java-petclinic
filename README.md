# Java Petclinic
## Description
Spring petclinic project for university module "Testen und DevOps in der agilen Softwareentwicklung" in 2022/2023

## How to run
0. If you haven't already; Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
1. Clone this repository with `gh repo clone Fabian-Anna/java-petclinic`
2. Start your CLI in the cloned folder of the repository
    - To be specific: where the `docker-compose.yaml` is
3. Type `docker compose up` into your CLI
    - This may take a while...
    - The application is running, when both containers in docker desktop are running
4. You can now access the petclinic via [localhost:8080](http://localhost:8080/)

## How to run UI-Tests locally
### Preparations
Since Cypress uses the URLs `frontend:8080` and `backend:9966` in the GitHub-Actions, these need to be edited in order to run cypress local.
In order to do these, change the following in the project:
1. In `/spring-petclinic-angular/src/environments/environment.prod.ts` change `REST_API_URL` to the following:  
    ```
    REST_API_URL: 'http://localhost:9966/petclinic/api/'
    ```
2. In `/testing/cypress/cypress.config.js` change the `frontendUrl` and `backendUrl`:
    ```
    frontendUrl: 'http://localhost:8080',
    backendUrl: 'http://localhost:9966',
    ```
### Open Cypress locally
1. Navigate to `/testing`
2. Start the `startCypressLocally.cmd`
    - Alternatively: start your CLI here and type `npx cypress open`

## Credits
Frontend: [spring-petclinc-angular project](https://github.com/spring-petclinic/spring-petclinic-angular)

Backend: [spring-petclinic-rest project](https://github.com/spring-petclinic/spring-petclinic-rest)