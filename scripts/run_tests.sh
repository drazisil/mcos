!#/usr/bin/env bash
# This will start a postgres server in the background and run the tests
# against it. The server will be stopped after the tests are done.
#
# Note the use of `$$` to escape the `$` character. This is required
# because the command is being run in a subshell. That the command
# is being run in a subshell is why we can't use `export` to set the
# DATABASE_URL environment variable.
	DATABASE_URL=$(npx pg-test start) && \
	echo "Testing with DATABASE_URL=$DATABASE_URL" && \
	DATABASE_URL=$DATABASE_URL && \
	GOOSE_DRIVER=postgres GOOSE_DBSTRING=$DATABASE_URL vendor/goose -dir migrations up && \
	DATABASE_URL=$DATABASE_URL pnpm run test:root && \
	DATABASE_URL=$DATABASE_URL pnpm run test:packages
	npx pg-test stop