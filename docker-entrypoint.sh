#!/bin/bash
set -e  # Exit on error

# Script name: docker-entrypoint.sh

# Check for required files
if [ ! -f ".env" ]; then
    echo "Warning: .env file not found"
    # Don't exit as env vars might be provided through Docker
fi

if [ ! -f "src/server.ts" ]; then
    echo "Error: src/server.ts not found"
    exit 1
fi

if [ ! -f "instrument.mjs" ]; then
    echo "Error: instrument.mjs not found"
    exit 1
fi

# Check if pnpm/pnpx is installed
if ! command -v pnpx &> /dev/null; then
    echo "Error: pnpx not found. Installing pnpm..."
    corepack enable pnpm
fi 

# Install dependencies
echo "Installing dependencies..."
if ! command -v pnpx &> /dev/null; then
    echo "Error: pnpx not found, even after installing pnpm"
    exit 1
fi
pnpm install

# Print startup message
echo "Starting server with tsx..."

# Execute the command
pnpx tsx \
    --import ./instrument.mjs \
    --openssl-legacy-provider \
    --env-file=.env \
    src/server.ts

# Note: Using exec ensures the script properly handles signals
# and the Node.js process runs as PID 1
