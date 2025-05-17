@echo off
echo Setting up deployment environment...

echo Step 1: Setting up Java environment
call set-java.bat

echo Step 2: Verifying deployment requirements
call verify-deployment.bat

echo Setup complete!
echo.
echo If all checks passed, you can now run deploy.bat to deploy your application
echo.
pause
