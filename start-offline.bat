@echo off
rem Starts TOPIK Study on this computer. No internet is needed.
rem Double-click this file. Keep the black window open while you study;
rem close it when you are done.
cd /d "%~dp0"
title TOPIK Study

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or not on the PATH. Install it from nodejs.org first.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing the app for the first time. This step needs internet...
  call npm install
  if errorlevel 1 (
    echo Install failed. Connect to the internet and try again.
    pause
    exit /b 1
  )
)

echo Preparing the latest version of the app...
call npm run build
if errorlevel 1 (
  echo The build failed. See the messages above.
  pause
  exit /b 1
)

echo.
echo TOPIK Study is starting. Your browser will open by itself.
echo Keep this window open. Press Ctrl+C or close it to stop.
call npm run preview -- --open
pause
