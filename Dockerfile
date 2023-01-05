# Author: Fabian Dirscherl
ARG DOCKER_HUB="docker.io"
ARG NGINX_VERSION="1.17.6"
ARG NODE_VERSION="16.3-alpine"

FROM $DOCKER_HUB/library/node:$NODE_VERSION as build

# Setting up frontend
COPY ./spring-petclinic-angular /workspace/

ARG NPM_REGISTRY=" https://registry.npmjs.org"

RUN echo "registry = \"$NPM_REGISTRY\"" > /workspace/.npmrc                              && \
    cd /workspace/                                                                       && \
    npm install                                                                          && \
    npm run build

FROM $DOCKER_HUB/library/nginx:$NGINX_VERSION AS runtime


COPY  --from=build /workspace/dist/ /usr/share/nginx/html/

RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx                        && \
    sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf && \
    sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf


EXPOSE 8080 9966

# Setting up backend
WORKDIR /app

COPY ./spring-petclinic-rest/.mvn/ .mvn
COPY ./spring-petclinic-rest/mvnw ./spring-petclinic-rest/pom.xml ./

RUN apt-get update && apt-get install dos2unix
RUN dos2unix mvnw
RUN echo $JAVA_HOME
#RUN ./mvnw dependency:resolve

COPY ./spring-petclinic-rest/src ./src

USER nginx

HEALTHCHECK     CMD     [ "service", "nginx", "status"]
#HEALTHCHECK     CMD     [ "service", "nginx", "status", "./mvnw", "spring-boot:run" ]