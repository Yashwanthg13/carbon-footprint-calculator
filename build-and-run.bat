@echo off
echo Building and running Carbon Footprint Calculator...

echo.
echo 1. Killing any running Java processes...
taskkill /F /IM java.exe 2>nul

echo.
echo 2. Running with Apache Maven...
cd apache-maven-3.9.5\bin

echo.
echo 3. Cleaning and building project...
call mvn clean package -f "..\..\pom.xml" -DskipTests

echo.
echo 4. Starting application...
cd ..\..\
java -jar target\carbon-0.0.1-SNAPSHOT.jar

pause
