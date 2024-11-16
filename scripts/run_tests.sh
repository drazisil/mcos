#!/usr/bin/env sh

# This will start a postgres server in the background and run the tests
# against it. The server will be stopped after the tests are done.
#
# Note the use of `$$` to escape the `$` character. This is required
# because the command is being run in a subshell. That the command
# is being run in a subshell is why we can't use `export` to set the
# DATABASE_URL environment variable.
# Set up error handling
set -e
trap 'npx pg-test stop' EXIT

# Start PostgreSQL with timeout
echo "Starting PostgreSQL..."
DATABASE_URL=$(timeout 30s npx pg-test start)
if [ $? -ne 0 ]; then
    echo "Failed to start PostgreSQL within 30 seconds"
    exit 1
fi

echo "Testing with DATABASE_URL=$DATABASE_URL"

# Run migrations with timeout
echo "Running migrations..."
timeout 30s env GOOSE_DRIVER=postgres GOOSE_DBSTRING="$DATABASE_URL" \
    vendor/goose -dir migrations up

# Run tests
echo "Running tests..."
env DATABASE_URL="$DATABASE_URL" pnpm run test:root
env DATABASE_URL="$DATABASE_URL" pnpm run test:packages
