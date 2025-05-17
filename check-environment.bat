@echo off
echo Carbon Footprint Calculator - Environment Check
echo ==========================================
echo.

set "ERRORS=0"
set "WARNINGS=0"

REM Check Java installation
echo Checking Java installation...
java -version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Java is not installed or not in PATH
    echo Please install Java 21 from Eclipse Adoptium
    set /a ERRORS+=1
) else (
    java -version 2>&1 | findstr /i "version"
    echo [OK] Java is installed
)
echo.

REM Check Maven installation
echo Checking Maven...
call mvnw.cmd --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Maven wrapper may have issues
    set /a WARNINGS+=1
) else (
    echo [OK] Maven wrapper is working
)
echo.

REM Check required files
echo Checking required files...
set MISSING_FILES=0

REM Source files
if not exist "src\main\java\com\example\carbon\CarbonFootprintCalculatorApplication.java" (
    echo [ERROR] Missing main application file
    set /a ERRORS+=1
)

REM Configuration files
if not exist "pom.xml" (
    echo [ERROR] Missing pom.xml
    set /a ERRORS+=1
)

if not exist "application.properties" (
    if not exist "src\main\resources\application.properties" (
        echo [ERROR] Missing application.properties
        set /a ERRORS+=1
    )
)

REM Check Docker (optional)
echo.
echo Checking Docker installation...
docker -v >nul 2>&1
if errorlevel 1 (
    echo [INFO] Docker not found - containerized deployment won't be available
) else (
    echo [OK] Docker is installed
    
    REM Check Docker daemon
    docker ps >nul 2>&1
    if errorlevel 1 (
        echo [WARNING] Docker daemon is not running
        set /a WARNINGS+=1
    ) else (
        echo [OK] Docker daemon is running
    )
)
echo.

REM Check disk space
echo Checking disk space...
for /f "tokens=3" %%a in ('dir /-c 2^>nul ^| find "bytes free"') do set "FREE_SPACE=%%a"
if %FREE_SPACE% LSS 1000000000 (
    echo [WARNING] Low disk space: Less than 1GB free
    set /a WARNINGS+=1
) else (
    echo [OK] Sufficient disk space available
)
echo.

REM Memory check using PowerShell
echo Checking system memory...
for /f "tokens=*" %%a in ('powershell -command "(Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory"') do set FREE_MEM=%%a
if "%FREE_MEM%"=="" (
    echo [WARNING] Could not determine available memory
    set /a WARNINGS+=1
) else if %FREE_MEM% LSS 2097152 (
    echo [WARNING] Low memory: Less than 2GB available
    set /a WARNINGS+=1
) else (
    echo [OK] Sufficient memory available
)
echo.

REM Check network connectivity
echo Checking network connectivity...
ping 8.8.8.8 -n 1 >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Network connectivity issues detected
    set /a WARNINGS+=1
) else (
    echo [OK] Network is accessible
)
echo.

REM Summary
echo Environment Check Summary:
echo ========================
if %ERRORS% GTR 0 (
    echo [CRITICAL] Found %ERRORS% error^(s^) that must be fixed
)
if %WARNINGS% GTR 0 (
    echo [WARNING] Found %WARNINGS% warning^(s^) that should be reviewed
)
if %ERRORS% EQU 0 (
    if %WARNINGS% EQU 0 (
        echo [OK] All checks passed! Environment is ready for deployment
    )
)
echo.

REM Deployment recommendations
echo Deployment Recommendations:
echo -------------------------
if %ERRORS% GTR 0 (
    echo 1. Fix all critical errors before attempting deployment
)
if %WARNINGS% GTR 0 (
    echo 2. Review warnings and address them if possible
)
echo 3. Choose deployment method:
echo    - Local: run-local.bat
echo    - Docker: test-docker-build.bat
echo    - Cloud: deploy-anywhere.bat
echo.

pause
