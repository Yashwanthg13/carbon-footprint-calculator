@echo off
setlocal
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo Java version:
java -version

echo.
echo Running Spring Boot application...
call .\mvnw.cmd spring-boot:run

if %ERRORLEVEL% NEQ 0 (
    echo Application failed to start
    pause
    exit /b 1
)

endlocal
