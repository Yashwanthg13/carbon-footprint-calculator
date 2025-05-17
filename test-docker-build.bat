@echo off
echo Carbon Footprint Calculator - Docker Build Test
echo =========================================
echo.

REM Check if Docker is installed and running
echo Checking Docker installation...
docker -v > nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not installed or not in PATH
    echo Please install Docker Desktop and try again
    pause
    exit /b 1
)

REM Check if Docker daemon is running
echo Checking Docker daemon...
docker ps > nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker daemon is not running
    echo Please start Docker Desktop and try again
    pause
    exit /b 1
)

echo Docker is ready!
echo.

REM Show Docker build command that will be executed
echo Building with command:
echo docker build -t carbon-footprint-calculator .
echo.

REM Enable verbose output for debugging
echo Building Docker image with verbose output...
docker build --no-cache -t carbon-footprint-calculator . --progress=plain

if errorlevel 1 (
    echo.
    echo [ERROR] Docker build failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo Build successful! Testing container...

REM Try to run the container
echo Starting container...
docker run -d -p 8080:8080 --name carbon-test carbon-footprint-calculator

if errorlevel 1 (
    echo [ERROR] Failed to start container
    pause
    exit /b 1
)

echo.
echo Container is running! 
echo.
echo You can:
echo 1. View logs:        docker logs carbon-test
echo 2. Stop container:   docker stop carbon-test
echo 3. Remove container: docker rm carbon-test
echo 4. Access app:       http://localhost:8080
echo.

REM Open the application in browser
start http://localhost:8080

echo Press any key to clean up containers...
pause > nul

REM Clean up
echo.
echo Cleaning up...
docker stop carbon-test > nul 2>&1
docker rm carbon-test > nul 2>&1

echo.
echo Test complete! Docker build and run was successful.
pause
