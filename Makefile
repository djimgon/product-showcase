init: docker-down-clear \
	docker-pull docker-build docker-up \
	frontend-init

up: docker-up

down: docker-down

restart: down up

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down --remove-orphans

docker-down-clear:
	docker-compose down -v --remove-orphans

docker-pull:
	docker-compose pull

docker-build:
	docker-compose build

frontend-init: frontend-yarn-install

frontend-yarn-install:
	docker-compose run --rm frontend-node-cli yarn install

frontend-yarn-add:
	docker-compose run --rm frontend-node-cli yarn add