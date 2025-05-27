@echo off
echo Running Carbon Footprint Calculator...

echo.
echo Step 1: Setting JAVA_HOME environment variable...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo.
echo Step 2: Starting application...
echo The application will be available at http://localhost:8080
echo Press Ctrl+C to stop the application

java -Dspring.profiles.active=prod -jar target\carbon-0.0.1-SNAPSHOT.jar

pause
