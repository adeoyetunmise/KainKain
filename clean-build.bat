@echo off
REM filepath: c:\Users\Adeoy\Desktop\KainKain\clean-build.bat
echo ===== Next.js Build Helper =====
echo.

REM Check if running as administrator
NET SESSION >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: This script is not running as administrator.
    echo Permission errors may occur. Consider running as administrator.
    echo.
    timeout /t 3 >nul
)

echo Step 1: Cleaning previous build artifacts...
REM Stop any running Node processes that might lock files
taskkill /f /im node.exe >nul 2>&1

REM Remove .next directory with forced removal
if exist .next (
    echo Removing .next directory...
    rmdir /s /q .next
    if exist .next (
        echo ERROR: Could not remove .next directory. It may be locked by another process.
        echo Please close any running Node.js processes and try again.
        exit /b 1
    ) else (
        echo .next directory successfully removed.
    )
)

echo.
echo Step 2: Clearing NPM cache...
call npm cache clean --force
echo.

echo Step 3: Rebuilding node_modules (this may take a while)...
call npm ci
if %errorlevel% neq 0 (
    echo WARNING: npm ci failed, falling back to npm install
    call npm install
)
echo.

echo Step 4: Building the project...
echo (This will take some time, please be patient)
call npm run build

if %errorlevel% neq 0 (
    echo.
    echo ===== BUILD FAILED =====
    echo Try running this script as administrator:
    echo Right-click on clean-build.bat and select "Run as administrator"
    exit /b 1
) else (
    echo.
    echo ===== BUILD SUCCESSFUL =====
    echo Your Next.js application has been built successfully!
)