# This will read from .env file and export all the variables
# to the environment. This is useful for running the tests
# and other commands that require the environment variables
# to be set.
#
# Warning: This will cause the makefile to fail if the .env
# file is not present. This is the desired behavior as we
# want to make sure that the environment variables are set
# before running the tests.
# include .env // Disabled for now

all:
	@npm install

certs:
	@openssl req -x509 -extensions v3_req -config data/mcouniverse.cnf -newkey rsa:1024 -nodes -keyout ./data/private_key.pem -out ./data/mcouniverse.pem -days 365
	@openssl rsa -in ./data/private_key.pem -outform DER -pubout | xxd -ps -c 300 | tr -d '\n' > ./data/pub.key
	@cp ./data/mcouniverse.pem  ./data/private_key.pem ./services/sslProxy/
	@echo "certs regenerated. remember to update pub.key for all clients"

test:
# This will start a postgres server in the background and run the tests
# against it. The server will be stopped after the tests are done.
#
# Note the use of `$$` to escape the `$` character. This is required
# because the command is being run in a subshell. That the command
# is being run in a subshell is why we can't use `export` to set the
# DATABASE_URL environment variable.
	@DATABASE_URL=$$(npx pg-test start) && \
	echo "Testing with DATABASE_URL=$$DATABASE_URL" && \
	DATABASE_URL=$$DATABASE_URL && \
	GOOSE_DRIVER=postgres GOOSE_DBSTRING=$$DATABASE_URL vendor/goose -dir migrations up && \
	DATABASE_URL=$$DATABASE_URL pnpm test
	@npx pg-test stop



start:
	@pnpx tsx --import ./instrument.mjs --openssl-legacy-provider --env-file=.env src/server.ts

prod_node:
	docker-compose --file docker-compose.yml up -d --build

up:
	docker-compose up -d --build

down:
	docker-compose down

enable-node:
	@sudo setcap cap_net_bind_service=+ep $(which node)

docker-init:
	mkdir -p log/mcos
	@npm run start:docker -s


clean:
	@rm -rf node_modules
	@rm -rf dist

migration-up:
	vendor/goose --dir ./migrations up

install:
	@pnpm install
	npx dotenvx run -- make migration-up

.PHONY: all certs test build start prod_node up down enable-node docker-init clean install