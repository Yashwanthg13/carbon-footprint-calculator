@echo off
echo Carbon Footprint Calculator - Universal Deployment Tool
echo ================================================
echo.

:menu
cls
echo Choose your deployment platform:
echo.
echo [1] Quick Deploy Options
echo [2] Manual Deploy Options
echo [3] Run Verification Tests
echo [4] Package Application
echo [5] View Documentation
echo [6] Exit
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto quick_deploy
if "%choice%"=="2" goto manual_deploy
if "%choice%"=="3" goto verify
if "%choice%"=="4" goto package
if "%choice%"=="5" goto docs
if "%choice%"=="6" goto end

echo Invalid choice. Please try again.
timeout /t 2 > nul
goto menu

:quick_deploy
cls
echo Quick Deploy Options:
echo [1] Deploy to Render
echo [2] Deploy to Railway
echo [3] Deploy to Heroku
echo [4] Back to main menu
echo.
set /p platform="Choose platform (1-4): "

if "%platform%"=="1" (
    echo Preparing Render deployment...
    start https://dashboard.render.com/new
    echo Please follow the instructions in PLATFORM_SETUP.md
)
if "%platform%"=="2" (
    echo Preparing Railway deployment...
    start https://railway.app/new
    echo Please follow the instructions in PLATFORM_SETUP.md
)
if "%platform%"=="3" (
    echo Deploying to Heroku...
    call heroku login
    call heroku create carbon-footprint-app
    call git push heroku main
)
if "%platform%"=="4" goto menu

pause
goto menu

:manual_deploy
cls
echo Manual Deploy Options:
echo [1] Deploy with Docker
echo [2] Deploy as JAR
echo [3] Back to main menu
echo.
set /p deploy_type="Choose deployment type (1-3): "

if "%deploy_type%"=="1" (
    echo Building Docker image...
    docker build -t carbon-footprint-calculator .
    if errorlevel 1 goto error
    echo Starting container...
    docker run -d -p 8080:8080 carbon-footprint-calculator
    if errorlevel 1 goto error
    start http://localhost:8080
)
if "%deploy_type%"=="2" (
    echo Building JAR...
    call mvnw clean package -DskipTests
    if errorlevel 1 goto error
    echo Starting application...
    start java -jar target\carbon-0.0.1-SNAPSHOT.jar
)
if "%deploy_type%"=="3" goto menu

pause
goto menu

:verify
cls
echo Running verification tests...
call verify-and-package.bat
pause
goto menu

:package
cls
echo Creating deployment package...
call create-deployment-package.bat
pause
goto menu

:docs
cls
echo Opening documentation...
echo [1] Platform Setup Guide
echo [2] Hosting Guide
echo [3] Back to main menu
echo.
set /p doc="Choose documentation (1-3): "

if "%doc%"=="1" (
    start notepad PLATFORM_SETUP.md
)
if "%doc%"=="2" (
    start notepad HOSTING_GUIDE.md
)
if "%doc%"=="3" goto menu

pause
goto menu

:error
echo.
echo Error occurred! Check the error messages above.
echo Error occurred! Check the error messages above.
pause
goto menu

:end
echo.
echo Thank you for using Carbon Footprint Calculator Deployment Tool!
echo For support, please refer to the documentation or create an issue on GitHub.
pause
exit /b 0
