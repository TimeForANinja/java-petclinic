FROM eclipse-temurin:17-jdk-jammy
EXPOSE 9966
WORKDIR /app 
COPY .mvn/ .mvn 
COPY mvnw pom.xml ./ 
RUN apt-get update && apt-get install dos2unix
RUN dos2unix mvnw
RUN ./mvnw dependency:resolve
COPY src ./src 
CMD ["./mvnw", "spring-boot:run"]