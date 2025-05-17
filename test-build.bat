@echo off
echo Testing build and configuration...
echo ===============================

REM Kill any running Java processes
echo Stopping any running Java processes...
taskkill /F /IM java.exe 2>nul

REM Set Java environment
echo.
echo Setting up Java environment...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

REM Clean and build
echo.
echo Building project...
call mvnw.cmd clean package -DskipTests

REM Check if build was successful
if errorlevel 1 (
    echo.
    echo Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo Build successful!

REM Test run
echo.
echo Starting application for testing...
echo Press Ctrl+C to stop the test
echo.
java -jar target\carbon-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev

pause
