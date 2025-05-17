@echo off
echo Setting up Java environment...

set JAVA_HOME=%USERPROFILE%\.jdks\temurin-21

if not exist "%JAVA_HOME%" (
    echo Java installation not found at %JAVA_HOME%
    echo Please ensure you have Java 21 installed
    echo You can download it from: https://adoptium.net/
    pause
    exit /b 1
)

echo Setting PATH...
set PATH=%JAVA_HOME%\bin;%PATH%

echo Verifying Java installation...
java -version

echo.
echo Java environment setup complete!
echo JAVA_HOME = %JAVA_HOME%
echo.
echo Press any key to continue...
pause > nul
