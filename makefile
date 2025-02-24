setup:
	yarn
	cp .env.example .env
	docker compose up -d

setup-and-run:
	make setup
	yarn start:dev

stop:
	docker compose down
