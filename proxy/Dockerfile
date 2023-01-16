FROM traefik
WORKDIR /app

# copy over files
COPY ./ ./

EXPOSE 80
CMD ["traefik", "--configFile", "./static_config.yml"]
