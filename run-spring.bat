@echo off
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.6.7-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"
echo Starting Spring Boot application...
java -jar target\carbon-0.0.1-SNAPSHOT.jar
