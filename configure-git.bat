@echo off
echo Configuring Git credentials...

echo Setting up Git user details...
set /p GIT_NAME="Enter your name: "
set /p GIT_EMAIL="Enter your GitHub email: "

git config --global user.name "%GIT_NAME%"
git config --global user.email "%GIT_EMAIL%"

echo.
echo Git credentials configured:
echo Name: %GIT_NAME%
echo Email: %GIT_EMAIL%
echo.

echo Creating Personal Access Token...
echo Please follow these steps:
echo 1. Go to https://github.com/settings/tokens
echo 2. Click "Generate new token (classic)"
echo 3. Give it a name like "carbon-footprint-calculator"
echo 4. Select scopes: repo, workflow
echo 5. Copy the generated token
echo.
set /p GIT_TOKEN="Enter your GitHub Personal Access Token: "

echo Testing GitHub connection...
git remote set-url origin https://%GIT_TOKEN%@github.com/yashwanthg13/carbon-footprint-calculator.git

echo.
echo Configuration complete! Now running push-to-github.bat...
call push-to-github.bat

pause
