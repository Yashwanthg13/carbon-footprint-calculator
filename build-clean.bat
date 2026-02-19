@echo off
echo Carbon Footprint Calculator - Clean Build
echo =====================================

REM Set up Java environment
echo Setting up Java environment...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"
set "PATH=%JAVA_HOME%\bin;%PATH%"

REM Clear target directory if it exists
if exist target (
    echo Cleaning target directory...
    rd /s /q target
)

REM Create fresh target directory
mkdir target

REM Download dependencies and build
echo Building project...
call .\mvnw.cmd dependency:resolve
if errorlevel 1 goto error

echo.
echo Packaging application...
call .\mvnw.cmd clean package -DskipTests
if errorlevel 1 goto error

echo.
echo Build successful! JAR file created at:
echo target\carbon-0.0.1-SNAPSHOT.jar
echo.
echo To run the application:
echo java -jar target\carbon-0.0.1-SNAPSHOT.jar
goto end

:error
echo.
echo Build failed! Please check the error messages above.
exit /b 1

:end
echo.
echo Would you like to run the application now? (Y/N)
set /p choice=
if /i "%choice%"=="Y" (
    echo.
    echo Starting application...
    java -jar target\carbon-0.0.1-SNAPSHOT.jar
)
