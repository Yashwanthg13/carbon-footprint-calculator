@echo off
echo Running Deployment Tests
echo =====================
echo.

REM Set up Java environment
echo Setting up Java environment...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

REM Stop any running Java processes
echo Stopping any running Java processes...
taskkill /F /IM java.exe >nul 2>&1

REM Wait a moment for processes to stop
timeout /t 2 /nobreak >nul

REM Run deployment tests
echo.
echo Starting deployment tests...
echo.

REM Test build
echo Building application...
cd apache-maven-3.9.5\bin
call mvn.cmd clean package -f "..\..\pom.xml" -DskipTests
cd ..\..\
if errorlevel 1 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

echo.
echo Build successful!
echo.

REM Test Docker if available
echo Checking Docker configuration...
docker -v >nul 2>&1
if errorlevel 1 (
    echo [SKIP] Docker not found - skipping container tests
) else (
    echo Testing Docker build...
    docker build -t carbon-test . >nul 2>&1
    if errorlevel 1 (
        echo [ERROR] Docker build failed!
    ) else (
        echo [OK] Docker build successful
        docker rmi carbon-test >nul 2>&1
    )
)

echo.
echo Starting application...
echo Press Ctrl+C to stop the application
echo.

REM Start the application
java -jar target/carbon-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev

pause
