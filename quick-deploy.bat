@echo off
echo Carbon Footprint Calculator - Quick Deploy Script
echo =============================================
echo.

:menu
echo Select deployment platform:
echo 1. Local Docker
echo 2. Render (via GitHub)
echo 3. Heroku
echo 4. Package as JAR
echo 5. Exit
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto docker
if "%choice%"=="2" goto render
if "%choice%"=="3" goto heroku
if "%choice%"=="4" goto jar
if "%choice%"=="5" goto end

echo Invalid choice. Please try again.
goto menu

:docker
echo.
echo Building Docker image...
docker build -t carbon-footprint-calculator .
if errorlevel 1 goto error

echo.
echo Starting container...
docker run -d -p 8080:8080 --name carbon-app carbon-footprint-calculator
if errorlevel 1 goto error

echo.
echo Application is running at http://localhost:8080
start http://localhost:8080
goto end

:render
echo.
echo Preparing for Render deployment...
echo 1. Ensure your code is pushed to GitHub
echo 2. Visit: https://render.com/new
echo 3. Connect your GitHub repository
echo 4. Select "Web Service"
echo 5. Choose "Docker" environment
echo.
echo Would you like to open Render website now? (Y/N)
set /p openrender=""
if /i "%openrender%"=="Y" start https://render.com/new
goto end

:heroku
echo.
echo Deploying to Heroku...
heroku login
if errorlevel 1 goto error

echo Creating Heroku app...
heroku create carbon-footprint-app
if errorlevel 1 goto error

echo Setting up environment...
heroku config:set SPRING_PROFILES_ACTIVE=prod

echo Deploying application...
git push heroku main
if errorlevel 1 goto error

echo.
echo Application deployed! Opening in browser...
heroku open
goto end

:jar
echo.
echo Building JAR package...
call mvnw clean package -DskipTests
if errorlevel 1 goto error

echo.
echo JAR file created: target/carbon-0.0.1-SNAPSHOT.jar
echo.
echo To run the application:
echo java -jar target/carbon-0.0.1-SNAPSHOT.jar
goto end

:error
echo.
echo Error occurred during deployment!
echo Please check the error messages above.
pause
exit /b 1

:end
echo.
echo Deployment script completed.
pause
