@echo off
echo Running Carbon Footprint Calculator with settings from memory...

echo.
echo Step 1: Stopping any running instances...
taskkill /F /IM java.exe 2>nul

echo.
echo Step 2: Setting JAVA_HOME environment variable...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo.
echo Step 3: Starting application...
echo The application will be available at http://localhost:8080
echo Press Ctrl+C to stop the application

title EcoCalc Carbon Footprint Calculator
java -Dspring.profiles.active=prod -jar target\carbon-0.0.1-SNAPSHOT.jar

pause
