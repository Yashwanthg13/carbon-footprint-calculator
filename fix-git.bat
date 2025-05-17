@echo off
echo Fixing Git repository setup...

echo Removing existing remote...
git remote remove origin

echo Setting up new remote...
git remote add origin https://github.com/yashwanthg13/carbon-footprint-calculator.git

echo Verifying remote...
git remote -v

echo Git repository fixed!
echo.
echo Now you can push your code by running:
echo git push -u origin main
echo.
pause
