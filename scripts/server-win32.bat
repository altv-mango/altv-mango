@echo off
robocopy ..\tests\config\server ..\server /E
robocopy ..\tests\config\resource ..\server\resources\test /E
cd ..\server
npx altv-pkg dev