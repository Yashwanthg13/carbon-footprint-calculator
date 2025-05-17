@echo off
echo Carbon Footprint Calculator - Local Deployment
echo =========================================
echo.

REM Set up Java environment
echo Setting up Java environment...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

REM Kill any running instances
echo Stopping any running instances...
taskkill /F /IM java.exe >nul 2>&1
timeout /t 2 /nobreak >nul

REM Clean previous build
echo.
echo Cleaning previous build...
if exist target (
    rd /s /q target
)
mkdir target

REM Build application
echo.
echo Building application...
call mvnw.cmd clean package -DskipTests
if errorlevel 1 (
    echo [ERROR] Build failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo Build successful!
echo.
echo Starting application in development mode...
echo.
echo Application will be available at:
echo http://localhost:8080
echo.
echo Press Ctrl+C to stop the application
echo.

REM Run the application with development profile
java -jar target\carbon-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev

echo.
echo Application stopped.
pause
