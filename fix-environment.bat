@echo off
echo Carbon Footprint Calculator - Environment Fix
echo =======================================
echo.

set "FIXED=0"
set "ATTEMPTED=0"

REM Fix Maven wrapper issues
echo Checking Maven wrapper...
if not exist ".mvn\wrapper\maven-wrapper.jar" (
    echo [FIX] Reinstalling Maven wrapper...
    set "M2_HOME=%CD%\apache-maven-3.9.5"
    set "PATH=%M2_HOME%\bin;%PATH%"
    call apache-maven-3.9.5\bin\mvn.cmd -N wrapper:wrapper
    set /a ATTEMPTED+=1
    
    REM Verify fix
    if exist ".mvn\wrapper\maven-wrapper.jar" (
        echo [OK] Maven wrapper installed successfully
        set /a FIXED+=1
    ) else (
        echo [WARNING] Maven wrapper installation failed
    )
) else (
    echo [OK] Maven wrapper exists
)
echo.

REM Fix Docker daemon
echo Checking Docker...
docker ps >nul 2>&1
if errorlevel 1 (
    echo [FIX] Attempting to start Docker...
    set /a ATTEMPTED+=1
    
    REM Try to start Docker Desktop
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    
    echo Waiting for Docker to start...
    timeout /t 20 /nobreak >nul
    
    REM Verify if Docker started
    docker ps >nul 2>&1
    if not errorlevel 1 (
        echo [OK] Docker started successfully
        set /a FIXED+=1
    ) else (
        echo [WARNING] Could not start Docker
        echo Please start Docker Desktop manually
    )
) else (
    echo [OK] Docker is running
)
echo.

REM Free up memory
echo Checking memory...
echo [INFO] Attempting to free up memory...
set /a ATTEMPTED+=1

REM Close unnecessary applications
echo Closing non-essential applications...
taskkill /F /IM "chrome.exe" /FI "STATUS eq RUNNING" >nul 2>&1
taskkill /F /IM "msedge.exe" /FI "STATUS eq RUNNING" >nul 2>&1
taskkill /F /IM "firefox.exe" /FI "STATUS eq RUNNING" >nul 2>&1

REM Clear temp files
echo Cleaning temporary files...
del /F /S /Q %temp%\* >nul 2>&1
rd /S /Q %temp% >nul 2>&1
md %temp% >nul 2>&1

REM Run garbage collection
echo Running garbage collection...
powershell -command "[System.GC]::Collect()"

REM Check memory again
for /f "tokens=*" %%a in ('powershell -command "(Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory"') do set FREE_MEM=%%a
if %FREE_MEM% GEQ 2097152 (
    echo [OK] Memory freed successfully
    set /a FIXED+=1
) else (
    echo [WARNING] System is still low on memory
    echo Consider closing more applications or adding more RAM
)
echo.

REM Summary
echo Fix Summary:
echo ===========
echo Attempted fixes: %ATTEMPTED%
echo Successful fixes: %FIXED%
echo.

if %FIXED% EQU %ATTEMPTED% (
    echo All issues have been resolved!
) else (
    echo Some issues require manual intervention:
)

if %FIXED% LSS %ATTEMPTED% (
    if exist "C:\Program Files\Docker\Docker\Docker Desktop.exe" (
        if not exist "%temp%\docker_started" (
            echo 1. Start Docker Desktop manually
            echo    Path: "C:\Program Files\Docker\Docker\Docker Desktop.exe"
        )
    )
    
    echo 2. If memory is still low:
    echo    - Close unnecessary applications
    echo    - Restart your computer
    echo    - Consider adding more RAM if issues persist
)

echo.
echo Run check-environment.bat again to verify fixes.
echo.
pause
