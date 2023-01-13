# first nodejs container to build frontend
FROM node:16.3 as build
WORKDIR /workspace/

# copy source code
COPY . .
# install dependencies & build
RUN npm install
RUN npm run-script build:prod

# second nginx container to serve finished frontend
FROM nginx:1.17.6 AS runtime

COPY --from=build /workspace/dist/ /usr/share/nginx/html/

# adjust nginx config
RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx
RUN sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

EXPOSE 8080
USER nginx
HEALTHCHECK CMD ["service", "nginx", "status"]
