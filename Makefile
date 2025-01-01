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
	@pnpm install

certs:
	@openssl req -x509 -extensions v3_req -config data/mcouniverse.cnf -newkey rsa:1024 -nodes -keyout ./data/private_key.pem -out ./data/mcouniverse.pem -days 365
	@openssl rsa -in ./data/private_key.pem -outform DER -pubout | xxd -ps -c 300 | tr -d '\n' > ./data/pub.key
	@cp ./data/mcouniverse.pem  ./data/private_key.pem ./services/sslProxy/
	@echo "certs regenerated. remember to update pub.key for all clients"

test:
	@pnpx vitest

build:
	@pnpm run build


start:
	@pnpx tsx --import ./instrument.mjs --openssl-legacy-provider --env-file=.env src/server.ts

prod_node:
	docker-compose --file docker-compose.yml up -d --build

up:
	docker compose up -d --build

down:
	docker-compose down

enable-node:
	@sudo setcap cap_net_bind_service=+ep $(which node)

docker-init:
	mkdir -p log/mcos
	@npm run start:docker -s


clean:
	@rm -rf */**/node_modules -v
	@rm -rf dist -v

migration-up:
	vendor/goose --dir ./migrations up

install:
	@pnpm install
	npx dotenvx run -- make migration-up

.PHONY: all certs test build start prod_node up down enable-node docker-init clean install