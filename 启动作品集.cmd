@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
title Portfolio - Local Preview

set "PORTFOLIO_NODE="
for /f "delims=" %%N in ('where node.exe 2^>nul') do if not defined PORTFOLIO_NODE set "PORTFOLIO_NODE=%%N"
if not defined PORTFOLIO_NODE if exist "%ProgramFiles%\nodejs\node.exe" set "PORTFOLIO_NODE=%ProgramFiles%\nodejs\node.exe"
if not defined PORTFOLIO_NODE if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "PORTFOLIO_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not defined PORTFOLIO_NODE (
  echo Node.js was not found. Please install Node.js 22.13 or newer, then try again.
  pause
  exit /b 1
)

"%PORTFOLIO_NODE%" "%~dp0scripts\start-portfolio.mjs" %*
if errorlevel 1 (
  echo.
  echo Startup failed. Please keep the error message above for troubleshooting.
  pause
  exit /b 1
)
endlocal
