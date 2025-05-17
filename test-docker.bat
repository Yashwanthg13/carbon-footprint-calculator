@echo off
echo Testing Docker setup...

echo Checking Docker version...
docker --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Docker is not installed or not in PATH
    pause
    exit /b 1
)

echo Testing Docker daemon...
docker info
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Docker daemon is not running
    echo Please start Docker Desktop
    pause
    exit /b 1
)

echo Building test image...
docker build -t carbon-footprint-calculator:test .
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Docker build failed
    pause
    exit /b 1
)

echo Running test container...
docker run -d --name carbon-test -p 8080:8080 carbon-footprint-calculator:test
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to start container
    pause
    exit /b 1
)

echo Waiting for container to start...
timeout /t 10 /nobreak

echo Testing application...
curl http://localhost:8080
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Could not connect to application
)

echo Cleaning up...
docker stop carbon-test
docker rm carbon-test

echo.
echo Docker test complete!
echo If all steps passed, you're ready to deploy
echo.
pause
