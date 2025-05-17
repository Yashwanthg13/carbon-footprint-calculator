@echo off
echo Carbon Footprint Calculator - Deployment Verification
echo ================================================
echo.

REM Check Java installation
echo Checking Java...
java -version > nul 2>&1
if errorlevel 1 (
    echo [ERROR] Java not found! Please install Java 21.
    goto error
) else (
    echo [OK] Java found
)

REM Check Maven
echo.
echo Checking Maven...
mvn -v > nul 2>&1
if errorlevel 1 (
    echo [INFO] Using included Maven wrapper
) else (
    echo [OK] Maven found
)

REM Verify required files
echo.
echo Checking required files...
set missing_files=0

REM Check source files
if not exist "src\main\java\com\example\carbon\CarbonFootprintCalculatorApplication.java" (
    echo [ERROR] Missing main application file
    set /a missing_files+=1
)

REM Check configuration files
if not exist "pom.xml" (
    echo [ERROR] Missing pom.xml
    set /a missing_files+=1
)
if not exist "application.properties" (
    echo [ERROR] Missing application.properties
    set /a missing_files+=1
)
if not exist "Dockerfile" (
    echo [ERROR] Missing Dockerfile
    set /a missing_files+=1
)

REM Check deployment files
if not exist "quick-deploy.bat" (
    echo [ERROR] Missing quick-deploy.bat
    set /a missing_files+=1
)
if not exist "HOSTING_GUIDE.md" (
    echo [ERROR] Missing HOSTING_GUIDE.md
    set /a missing_files+=1
)

if %missing_files% gtr 0 (
    echo.
    echo [ERROR] Missing required files! Please check above errors.
    goto error
) else (
    echo [OK] All required files present
)

REM Test build
echo.
echo Testing build...
call mvnw.cmd clean package -DskipTests
if errorlevel 1 (
    echo [ERROR] Build failed! Please fix build errors.
    goto error
) else (
    echo [OK] Build successful
)

REM Test Docker if available
echo.
echo Checking Docker...
docker -v > nul 2>&1
if errorlevel 1 (
    echo [INFO] Docker not found - skipping Docker tests
) else (
    echo [OK] Docker found - testing build
    docker build -t carbon-test . > nul 2>&1
    if errorlevel 1 (
        echo [WARNING] Docker build failed - may need attention
    ) else (
        echo [OK] Docker build successful
        docker rmi carbon-test > nul 2>&1
    )
)

echo.
echo All verifications complete! Creating deployment package...
echo.

REM Create deployment package
call create-deployment-package.bat

echo.
echo Verification and packaging complete!
echo Your application is ready for deployment.
echo Please follow the instructions in HOSTING_GUIDE.md
goto end

:error
echo.
echo Verification failed! Please fix the errors above before deploying.
exit /b 1

:end
pause
