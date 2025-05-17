@echo off
echo Fixing GitHub Authentication...

echo First, let's remove the existing remote...
git remote remove origin

echo Please follow these steps to create a Personal Access Token:
echo 1. Go to https://github.com/settings/tokens
echo 2. Click "Generate new token (classic)"
echo 3. Name: carbon-footprint-calculator
echo 4. Select scopes: 
echo    - [x] repo (all)
echo    - [x] workflow
echo 5. Click "Generate token"
echo 6. Copy the generated token
echo.
echo IMPORTANT: Make sure to save the token somewhere safe!
echo.
set /p TOKEN="Enter your GitHub Personal Access Token: "

echo.
echo Setting up repository with token authentication...
git remote add origin https://%TOKEN%@github.com/yashwanthg13/carbon-footprint-calculator.git

echo Testing connection...
git remote -v

echo.
echo Attempting to push code...
git add .
git commit -m "Initial commit with deployment configuration"
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Failed to push! Please check:
    echo 1. Token has correct permissions
    echo 2. Repository exists at github.com/yashwanthg13/carbon-footprint-calculator
    echo 3. You're using the correct GitHub username
    echo.
) else (
    echo.
    echo Successfully pushed to GitHub!
    echo.
)

pause
