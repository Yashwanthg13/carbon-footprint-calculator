@echo off
echo Verifying deployment requirements...
echo ================================

echo Checking Java installation...
java -version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Java is not installed or not in PATH
    exit /b 1
)

echo Checking Docker installation...
docker --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Docker is not installed or not running
    exit /b 1
)

echo Checking Git installation...
git --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed or not in PATH
    exit /b 1
)

echo Checking required files...
echo ----------------------

echo Checking Dockerfile...
if not exist Dockerfile (
    echo ERROR: Dockerfile not found
    exit /b 1
)

echo Checking render.yaml...
if not exist render.yaml (
    echo ERROR: render.yaml not found
    exit /b 1
)

echo Checking application properties...
if not exist src\main\resources\application-prod.properties (
    echo ERROR: application-prod.properties not found
    exit /b 1
)

echo Testing application build...
call mvnw clean package -DskipTests
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Application build failed
    exit /b 1
)

echo Testing Docker build...
docker build -t carbon-footprint-calculator-test .
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Docker build failed
    exit /b 1
)

echo.
echo ================================
echo All verification checks passed!
echo.
echo You can now run deploy.bat to deploy your application
echo.
pause
