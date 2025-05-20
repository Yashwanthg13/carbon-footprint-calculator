@echo off
echo Restarting Carbon Footprint Calculator...

echo.
echo Step 1: Stopping running instances...
taskkill /F /IM java.exe /FI "WINDOWTITLE eq Carbon Footprint Calculator" 2>nul

echo.
echo Step 2: Cleaning Maven project...
call mvnw.cmd clean

echo.
echo Step 3: Building project...
call mvnw.cmd package -DskipTests

echo.
echo Step 4: Starting application...
echo The application will be available at http://localhost:8082
echo Press Ctrl+C to stop the application

title Carbon Footprint Calculator
java -jar target\carbon-0.0.1-SNAPSHOT.jar

pause
