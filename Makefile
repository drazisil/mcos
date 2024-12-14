# Variables
SHELL := /bin/bash
.DEFAULT_GOAL := help

# Colors for pretty output
CYAN = \033[0;36m
NC = \033[0m  # No Color

# Docker related variables
DOCKER_COMPOSE = docker compose
DOCKER_SERVICES = nginx db pgadmin server

.PHONY: build
build: ## Build the project
	@echo "Building project..."
	pnpm build

# Development targets
.PHONY: up
up: ## Start all services
	$(DOCKER_COMPOSE) up -d $(DOCKER_SERVICES)
	make migration-up

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

.PHONY: service-install
service-install: ## Install system service
	@echo "Installing system service..."
	sudo cp rustymotors.service /etc/systemd/system/
	sudo chmod 644 /etc/systemd/system/rustymotors.service
	sudo systemctl daemon-reload
	sudo systemctl enable rustymotors
	@echo "Service installed successfully"

.PHONY: service-start
service-start: ## Start system service
	sudo systemctl start rustymotors

.PHONY: service-stop
service-stop: ## Stop system service
	sudo systemctl stop rustymotors

.PHONY: service-restart
service-restart: ## Restart system service
	sudo systemctl restart rustymotors

.PHONY: service-status
service-status: ## Check service status
	sudo systemctl status rustymotors

.PHONY: service-logs
service-logs: ## View service logs
	sudo journalctl -u rustymotors -f

.PHONY: stop
stop: ## Stop the development environment
	@killall node || true

.PHONY: setcap
setcap: ## Set capabilities for node to bind to port 80
	@sudo setcap cap_net_bind_service=+ep $(which node)

.PHONY: migration-up
migration-up: ## Run migrations
	npx dotenvx run -- vendor/goose --dir ./migrations up

# Help target
.PHONY: help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-15s$(NC) %s\n", $$1, $$2}'
