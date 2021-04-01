CONTAINER_NAME=webcomponents-with-go-example
IMAGE_NAME=larmic/webcomponents-with-go-example
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

docker-build:
	@echo "Remove docker image if already exists"
	docker rmi -f ${IMAGE_NAME}:${IMAGE_TAG}
	@echo "Build go docker image"
	DOCKER_BUILDKIT=1 docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
	@echo "Prune intermediate images"
	docker image prune --filter label=stage=intermediate -f

docker-run:
	docker run -d -p 8080:8080 --rm --name ${CONTAINER_NAME} ${IMAGE_NAME}

docker-stop:
	docker stop ${CONTAINER_NAME}