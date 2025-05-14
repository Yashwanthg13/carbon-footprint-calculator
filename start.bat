@echo off
echo Setting up environment...

REM Set Java Home
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
echo Using Java: %JAVA_HOME%

REM Set Maven Home
set "M2_HOME=%CD%\apache-maven-3.9.5"
set "PATH=%M2_HOME%\bin;%JAVA_HOME%\bin;%PATH%"

REM Verify installations
echo.
echo Java version:
java -version

echo.
echo Maven version:
call "%M2_HOME%\bin\mvn.cmd" --version

REM Download dependencies first
echo.
echo Downloading dependencies...
call "%M2_HOME%\bin\mvn.cmd" dependency:resolve

REM Run Spring Boot
echo.
echo Starting Spring Boot application...
call "%M2_HOME%\bin\mvn.cmd" ^
    org.springframework.boot:spring-boot-maven-plugin:3.1.0:run ^
    -Dspring-boot.run.jvmArguments="-Dserver.port=8080"

if errorlevel 1 (
    echo.
    echo Failed to start the application.
    echo Please check the error messages above.
    pause
    exit /b 1
)

pause
