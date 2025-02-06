init:
	aws configure && sst init

dev:
	npx sst dev

lint:
	npx pnpm run lint