# Java Petclinic
## Description
Spring petclinic project for university module "Testen und DevOps in der agilen Softwareentwicklung" in 2022/2023

## How to build
0. If you haven't already; Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
1. Clone this repository with `gh repo clone Fabian-Anna/java-petclinic`
2. Start your CLI in the cloned folder of the repository
    - To be specific: where the `docker-compose.yaml` is
3. Type `docker compose up` into your CLI
    - This may take a while...
    - The application is running, when both containers (java-petclinic-backend, java-petclinic-frontend) in docker desktop are running
4. You can now access the petclinic via [localhost:8080](http://localhost:8080/)

## How to run
1. Start Docker Desktop
2. Start one instance of java-petclinic-backend and java-petclinic-frontend
3. Access the petclinic via [localhost:8080](http://localhost:8080/)

## Credits
Frontend: [spring-petclinc-angular project](https://github.com/spring-petclinic/spring-petclinic-angular)

Backend: [spring-petclinic-rest project](https://github.com/spring-petclinic/spring-petclinic-rest)
