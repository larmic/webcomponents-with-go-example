CONTAINER_NAME=tp-link-hs110-api
IMAGE_NAME=larmic/tp-link-hs110-api
IMAGE_TAG=latest

frontend-run:
	npm run dev

frontend-build:
	rm -rf dist
	npm run build

backend-run:
	go run main.go

backend-build:
	rm -rf bin
	go build -a -o bin/server .