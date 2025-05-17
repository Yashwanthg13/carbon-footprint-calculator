@echo off
echo Killing any Java processes...
taskkill /F /IM java.exe /T 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Java processes terminated successfully.
) else (
    echo No Java processes found or could not terminate them.
)

echo.
echo Setting up environment...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo.
echo Java version:
java -version

echo.
echo Starting application...
cd /d "%~dp0"
call start.bat

echo.
echo Application started. Access it at http://localhost:8080
