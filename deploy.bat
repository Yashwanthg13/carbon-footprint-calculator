@echo off
echo Starting deployment process...

echo Initializing Git repository...
git init

echo Adding files to Git...
git add .

echo Creating initial commit...
git commit -m "Initial deployment commit"

echo Setting up main branch...
git branch -M main

echo Setting up GitHub repository...
git remote add origin https://github.com/yashwanthg13/carbon-footprint-calculator.git

echo Pushing to GitHub...
git push -u origin main

echo Building Docker image...
docker build -t carbon-footprint-calculator .

echo Deployment preparation complete!
echo.
echo Next steps:
echo 1. Go to https://render.com
echo 2. Sign up or log in
echo 3. Click "New +" and select "Web Service"
echo 4. Choose GitHub repository: yashwanthg13/carbon-footprint-calculator
echo 5. Use these settings:
echo    - Name: carbon-footprint-calculator
echo    - Environment: Docker
echo    - Branch: main
echo    - Plan: Free
echo.
echo Your application will be available at:
echo https://carbon-footprint-calculator.onrender.com
echo.
echo Press any key to close...
pause > nul
