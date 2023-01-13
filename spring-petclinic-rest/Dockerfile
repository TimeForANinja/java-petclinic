# first maven + jdk container to build frontend
FROM maven:3-eclipse-temurin-17 as build
WORKDIR /app

# copy over maven config files
COPY pom.xml ./
# run maven dependency installation
RUN mvn dependency:resolve
# copy source code
COPY src ./src 
# build jar
RUN mvn clean package

# second jre container to serve finished backend
FROM eclipse-temurin:17-jre-jammy AS runtime

COPY --from=build /app/target/spring-petclinic-rest-2.6.2.jar /petclinic-rest.jar

EXPOSE 9966
CMD ["java", "-jar", "/petclinic-rest.jar"]
