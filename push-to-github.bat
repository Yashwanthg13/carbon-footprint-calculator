@echo off
echo Pushing code to GitHub...

echo Adding all changes...
git add .

echo Creating commit...
set /p COMMIT_MSG="Enter commit message (default: Update deployment files): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Update deployment files

git commit -m "%COMMIT_MSG%"

echo Pushing to main branch...
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Failed to push to GitHub!
    echo Please check your GitHub credentials and try again
    echo.
    echo You may need to:
    echo 1. Configure Git credentials:
    echo    git config --global user.name "Your Name"
    echo    git config --global user.email "your.email@example.com"
    echo.
    echo 2. Use GitHub token or SSH key for authentication
    pause
    exit /b 1
)

echo.
echo Code successfully pushed to GitHub!
echo.
echo Next steps:
echo 1. Go to https://render.com
echo 2. Click "New +" and select "Web Service"
echo 3. Connect your GitHub repository
echo 4. Use settings from render.yaml
echo.
pause
