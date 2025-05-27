@echo off
echo Starting Carbon Footprint Calculator...
echo Please make sure Java 17 or later is installed.

java -version 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Java is not installed or not in PATH
    echo Please install Java from https://adoptium.net
    pause
    exit /b 1
)

echo.
echo Starting application...
echo The application will be available at http://localhost:9090
echo Press Ctrl+C to stop the application

java -Dserver.port=9090 -jar target\carbon-0.0.1-SNAPSHOT.jar
pause
