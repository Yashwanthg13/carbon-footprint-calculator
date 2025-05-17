@echo off
echo Carbon Footprint Calculator - Development Environment Setup
echo ===================================================
echo.

REM Set up Java environment
echo Setting up Java environment...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
if not exist "%JAVA_HOME%" (
    echo [ERROR] Java installation not found at %JAVA_HOME%
    echo Please install Eclipse Adoptium Java 21 from:
    echo https://adoptium.net/temurin/releases/?version=21
    pause
    exit /b 1
)
set "PATH=%JAVA_HOME%\bin;%PATH%"

REM Verify Java
echo Verifying Java installation...
java -version
if errorlevel 1 (
    echo [ERROR] Java verification failed
    pause
    exit /b 1
)
echo [OK] Java setup complete
echo.

REM Set up Maven
echo Setting up Maven...
set "M2_HOME=%CD%\apache-maven-3.9.5"
set "PATH=%M2_HOME%\bin;%PATH%"

REM Verify Maven
echo Verifying Maven installation...
call %M2_HOME%\bin\mvn.cmd -version
if errorlevel 1 (
    echo [ERROR] Maven verification failed
    pause
    exit /b 1
)
echo [OK] Maven setup complete
echo.

REM Create Maven wrapper
echo Setting up Maven wrapper...
call %M2_HOME%\bin\mvn.cmd -N wrapper:wrapper
if errorlevel 1 (
    echo [ERROR] Maven wrapper creation failed
    pause
    exit /b 1
)
echo [OK] Maven wrapper created
echo.

REM Check Docker installation
echo Checking Docker installation...
where docker >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Docker not found
    echo To install Docker Desktop, visit:
    echo https://www.docker.com/products/docker-desktop
    echo.
    echo You can still run the application without Docker
    echo using local deployment options
) else (
    echo Docker is installed. Starting Docker Desktop...
    echo This may take a few minutes
    echo.
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    
    echo Waiting for Docker to start...
    :dockerwait
    timeout /t 2 /nobreak >nul
    docker ps >nul 2>&1
    if errorlevel 1 (
        echo Still waiting for Docker...
        goto dockerwait
    )
    echo [OK] Docker is running
)
echo.

REM Create development workspace
echo Setting up development workspace...
if not exist "target" mkdir target
if not exist ".mvn" mkdir .mvn
if not exist "logs" mkdir logs

REM Save environment variables
echo Saving environment configuration...
(
echo JAVA_HOME=%JAVA_HOME%
echo M2_HOME=%M2_HOME%
echo PATH=%PATH%
) > dev-env.properties

echo.
echo Development environment setup complete!
echo.
echo You can now:
echo 1. Run 'mvnw.cmd clean package' to build the project
echo 2. Run 'run-local.bat' to start the application locally
echo 3. Run 'test-docker-build.bat' to build and run with Docker
echo.
echo Environment variables have been saved to dev-env.properties
echo.
pause
