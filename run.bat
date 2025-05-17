@echo off
setlocal

echo Checking Java installation...
where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Java is not installed or not in PATH
    exit /b 1
)

echo Setting up environment...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo.
echo Java version:
java -version

echo.
echo Maven version:
call .\mvnw.cmd --version

echo.
echo Building and running application...
call .\mvnw.cmd clean install spring-boot:run

if %ERRORLEVEL% NEQ 0 (
    echo Build or run failed
    pause
    exit /b 1
)

endlocal
