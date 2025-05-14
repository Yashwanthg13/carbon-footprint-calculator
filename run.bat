@echo off
echo Setting up environment...

set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
echo Using JAVA_HOME: %JAVA_HOME%

REM Change to the project directory
cd /d "%~dp0"

echo.
echo Building the application...
call mvnw.cmd -B clean install -DskipTests

if errorlevel 1 (
    echo.
    echo Error occurred during build.
    echo Please check the build errors above.
    pause
    exit /b 1
)

echo.
echo Starting the application...
call mvnw.cmd -B spring-boot:run

if errorlevel 1 (
    echo.
    echo Error occurred while running the application.
    echo Please check the error messages above.
    pause
    exit /b 1
)

pause
