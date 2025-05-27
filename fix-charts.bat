@echo off
echo Fixing decimal place formatting in Carbon Footprint Calculator...

echo.
echo Step 1: Stopping running instances...
taskkill /F /IM java.exe 2>nul

echo.
echo Step 2: Updating Java model class to format decimal places...
echo Creating backup of original file...
copy /Y "src\main\java\com\example\carbon\model\CarbonFootprint.java" "src\main\java\com\example\carbon\model\CarbonFootprint.java.bak"

echo Modifying CarbonFootprint.java to round decimal places...
powershell -Command "(Get-Content 'src\main\java\com\example\carbon\model\CarbonFootprint.java') -replace 'return electricityEmissions \+ travelEmissions \+ foodEmissions \+ wasteEmissions;', 'return Math.round((electricityEmissions + travelEmissions + foodEmissions + wasteEmissions) * 10) / 10.0;' | Set-Content 'src\main\java\com\example\carbon\model\CarbonFootprint.java'"

echo.
echo Step 3: Building the application...
call mvnw.cmd clean package -DskipTests

echo.
echo Step 4: Starting application...
echo The application will be available at http://localhost:8080
echo Press Ctrl+C to stop the application

title EcoCalc Carbon Footprint Calculator
java -jar target\carbon-0.0.1-SNAPSHOT.jar

pause
