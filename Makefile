# This will read from .env file and export all the variables
# to the environment. This is useful for running the tests
# and other commands that require the environment variables
# to be set.
#
# Warning: This will cause the makefile to fail if the .env
# file is not present. This is the desired behavior as we
# want to make sure that the environment variables are set
# before running the tests.
include .env # Disabled for now

# Variables
SHELL := /bin/bash
.DEFAULT_GOAL := help

# Colors for pretty output
CYAN = \033[0;36m
NC = \033[0m  # No Color

# Docker related variables
DOCKER_COMPOSE = docker compose
DOCKER_SERVICES = nginx db pgadmin

# Development targets
.PHONY: up
up: ## Start all services
	$(DOCKER_COMPOSE) up -d $(DOCKER_SERVICES)
	npx dotenvx run -- make migration-up

.PHONY: down
down: ## Stop all services
	$(DOCKER_COMPOSE) down
	@echo "All services stopped"

.PHONY: clean
clean: stop ## Clean up generated files and stopped containers
	$(DOCKER_COMPOSE) rm -f
	rm -rf coverage/
	rm -rf dist/
	rm -rf node_modules/

# Install targets
.PHONY: install
install: ## Install all dependencies
	pnpm install

.PHONY: certs
certs: ## Generate new certs
	@openssl req -x509 -extensions v3_req -config data/mcouniverse.cnf -newkey rsa:1024 -nodes -keyout ./data/private_key.pem -out ./data/mcouniverse.pem -days 365
	@openssl rsa -in ./data/private_key.pem -outform DER -pubout | xxd -ps -c 300 | tr -d '\n' > ./data/pub.key
	@cp ./data/mcouniverse.pem  ./data/private_key.pem ./services/sslProxy/
	@echo "certs regenerated. remember to update pub.key for all clients"

.PHONY: test
test: ## Run tests
	@./scripts/run_tests.sh

.PHONY: start
start: up ## Start the development environment
	@pnpx tsx --import ./instrument.mjs --openssl-legacy-provider --env-file=.env src/server.ts

.PHONY: stop
stop: ## Stop the development environment
	@killall ts-node || true

.PHONY: setcap
setcap: ## Set capabilities for node to bind to port 80
	@sudo setcap cap_net_bind_service=+ep $(which node)

.PHONY: migration-up
migration-up: ## Run migrations
	vendor/goose --dir ./migrations up

# Help target
.PHONY: help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-15s$(NC) %s\n", $$1, $$2}'
