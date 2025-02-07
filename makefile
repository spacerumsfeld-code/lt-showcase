init:
	aws configure && sst init

dev:
	npx sst dev

lint:
	npx pnpm run lint

typecheck:
	npx pnpm run typecheck

test:
	npx pnpm run test-integration

deploy:
	npx sst deploy --stage production
