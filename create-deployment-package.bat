@echo off
echo Creating Deployment Package
echo ========================
echo.

REM Create deployment directory
echo Creating deployment directory...
if exist deploy rd /s /q deploy
mkdir deploy

REM Copy main application files
echo.
echo Copying application files...
xcopy /s /e src deploy\src\
copy pom.xml deploy\
copy mvnw.* deploy\
copy .mvn\* deploy\.mvn\

REM Copy deployment configuration
echo.
echo Copying deployment configurations...
copy Dockerfile deploy\
copy render.yaml deploy\
copy system.properties deploy\
copy application*.properties deploy\
copy *.md deploy\

REM Copy deployment scripts
echo.
echo Copying deployment scripts...
copy quick-deploy.bat deploy\
copy set-java.bat deploy\

REM Create resources directory if it doesn't exist
if not exist deploy\src\main\resources mkdir deploy\src\main\resources

REM Create deployment README
echo.
echo Creating deployment instructions...
(
echo # Carbon Footprint Calculator - Deployment Package
echo.
echo ## Quick Start
echo.
echo 1. Choose your deployment method:
echo    - Run 'quick-deploy.bat' for guided deployment
echo    - Follow HOSTING_GUIDE.md for manual deployment
echo.
echo 2. Deployment Options:
echo    - Docker: Use Dockerfile
echo    - Render: Use render.yaml
echo    - Manual: Use JAR file
echo.
echo 3. Configuration:
echo    - Check application-prod.properties for production settings
echo    - Set environment variables as needed
echo.
echo ## Files Included
echo - Source code [src/]
echo - Configuration files [*.properties]
echo - Deployment scripts [*.bat]
echo - Docker configuration [Dockerfile]
echo - Documentation [*.md]
echo.
echo ## Support
echo For deployment issues, refer to HOSTING_GUIDE.md or create an issue on GitHub.
) > deploy\DEPLOY_README.md

REM Create deployment package
echo.
echo Creating ZIP archive...
powershell Compress-Archive -Path deploy\* -DestinationPath carbon-footprint-deployment.zip -Force

REM Cleanup
echo.
echo Cleaning up...
rd /s /q deploy

echo.
echo Deployment package created: carbon-footprint-deployment.zip
echo This package contains everything needed to deploy the application.
echo.
echo Next steps:
echo 1. Extract carbon-footprint-deployment.zip
echo 2. Run quick-deploy.bat
echo 3. Follow the prompts for your chosen deployment platform
echo.
pause
