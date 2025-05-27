@echo off
echo Running Carbon Footprint Calculator in debug mode...

echo.
echo Step 1: Stopping any running instances...
taskkill /F /IM java.exe 2>nul

echo.
echo Step 2: Setting JAVA_HOME environment variable...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo.
echo Step 3: Starting application with debug logging...
echo The application will be available at http://localhost:8080
echo Press Ctrl+C to stop the application

title EcoCalc Carbon Footprint Calculator - Debug Mode
java -Dspring.profiles.active=prod -Dlogging.level.org.springframework=DEBUG -Dlogging.level.com.example=DEBUG -jar target\carbon-0.0.1-SNAPSHOT.jar > app-debug.log 2>&1

echo.
echo Application logs are being saved to app-debug.log
echo Press any key to stop the application and view the logs...
pause

type app-debug.log | more
