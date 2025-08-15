# ---------- Build stage ----------
  FROM maven:3.9.6-eclipse-temurin-21 AS builder
  WORKDIR /app
  
  # Copy pom & resolve deps first (leverages Docker cache)
  COPY pom.xml .
  RUN mvn -B -q dependency:go-offline
  
  # Copy sources & build
  COPY src ./src
  RUN mvn -B -q -DskipTests package
  
  # ---------- Runtime stage ----------
  FROM eclipse-temurin:21-jdk
  
  WORKDIR /app
  
  # Copy the built jar
  COPY --from=builder /app/target/*.jar /app/app.jar
  
  # Expose Spring Boot port
  EXPOSE 8080
  
  # Env vars (override in docker-compose.yml)
  ENV SERVER_PORT=8080
  ENV SERVER_ADDR=0.0.0.0
  
  # Healthcheck (optional)
  HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD curl -fsS http://localhost:${SERVER_PORT}/actuator/health || exit 1
  
  ENTRYPOINT ["java","-jar","/app/app.jar"]
  