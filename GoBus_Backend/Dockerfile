FROM openjdk:17  # ✅ Use lowercase `openjdk`
WORKDIR /app

# Copy the built JAR from target directory
COPY target/go_bus_Security-0.0.1-SNAPSHOT.jar /app/app.jar  # ✅ Use "app.jar" for consistency

# Expose the port your Spring Boot application runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]  # ✅ Use ENTRYPOINT instead of CMD
