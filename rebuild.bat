@echo off
echo Rebuilding Carbon Footprint Calculator...

echo.
echo Step 1: Setting JAVA_HOME environment variable...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo.
echo Step 2: Verifying Java installation...
java -version

echo.
echo Step 3: Building project with Maven...
call mvnw.cmd clean package -DskipTests

echo.
echo Step 4: Verifying build output...
dir target\*.jar

echo.
echo Build process completed.
pause
