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

.DEFAULT_GOAL := help

.PHONY: help
certs: ## Generate new certs
	@openssl req -x509 -extensions v3_req -config data/mcouniverse.cnf -newkey rsa:1024 -nodes -keyout ./data/private_key.pem -out ./data/mcouniverse.pem -days 365
	@openssl rsa -in ./data/private_key.pem -outform DER -pubout | xxd -ps -c 300 | tr -d '\n' > ./data/pub.key
	@cp ./data/mcouniverse.pem  ./data/private_key.pem ./services/sslProxy/
	@echo "certs regenerated. remember to update pub.key for all clients"

.PHONY: test
test: ## Run tests
	@pnpx vitest --run

.PHONY: build
build: ## Build the project
	@pnpm run build

.PHONY: start
start: ## Start the project
	@pnpx tsx --import ./instrument.mjs --openssl-legacy-provider --env-file=.env src/server.ts

.PHONY: prod_node
prod_node: ## Start the project in production mode
	docker-compose --file docker-compose.yml up -d --build

.PHONY: up
up: ## Start the project in development mode
	docker compose up -d --build

.PHONY: down
down: ## Stop the project
	docker-compose down

.PHONY: enable-node
enable-node: ## Enable node to bind to port 80
	@sudo setcap cap_net_bind_service=+ep $(which node)

.PHONY: docker-init
docker-init: ## Start the project in docker
	mkdir -p log/mcos
	@npm run start:docker -s

.PHONY: clean
clean: ## Clean the project
	@rm -rf */**/node_modules -v
	@rm -rf dist -v

.PHONY: migration-up
migration-up: ## Run migrations
	vendor/goose --dir ./migrations up

.PHONY: install
install: ## Install dependencies and run migrations
	@pnpm install
	npx dotenvx run -- make migration-up

help: ## Display this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)