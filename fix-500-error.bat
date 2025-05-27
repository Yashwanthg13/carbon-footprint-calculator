@echo off
echo Fixing 500 Internal Server Error in Carbon Footprint Calculator...

echo.
echo Step 1: Setting JAVA_HOME environment variable...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo.
echo Step 2: Verifying Java installation...
java -version

echo.
echo Step 3: Cleaning and rebuilding project...
call mvnw.cmd clean package -DskipTests

echo.
echo Step 4: Starting application with debug logging...
echo The application will be available at http://localhost:8080
echo Press Ctrl+C to stop the application

java -Dspring.profiles.active=prod -Dlogging.level.org.springframework=DEBUG -Dlogging.level.com.example=DEBUG -jar target\carbon-0.0.1-SNAPSHOT.jar

pause
