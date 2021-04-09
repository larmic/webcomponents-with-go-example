# webcomponents-with-go-example

A web application example showing the use of [WebComponents](https://developer.mozilla.org/de/docs/Web/Web_Components) 
with [Go](https://golang.org/) as small executable server.

## Goals

* an artifact as small as possible that provides a UI (less than 10 MB)
* use as few UI frameworks as possible
* as few configuration files as possible
* fast build times
* multi-platform support (arm and amd64)

## Used technologies

### Server

[Go](https://golang.org/) 1.16 supports embedding files to executable. So it is possible to create very small 
executables that contain all needed assets.

### Frontend

[npm](https://www.npmjs.com/) as dependency management tool.

Build tool [ParcelJS](https://v2.parceljs.org/) places great emphasis on convention over configuration. Here, the goal 
of having to configure as little as possible is supported.

[lit-html](https://lit-html.polymer-project.org/) is a small Javascript library, which allows to create components in 
a simple way (based on [WebComponents](https://developer.mozilla.org/de/docs/Web/Web_Components)). This gives you a 
[React](https://reactjs.org/) feeling.

### Build tools

[Makefile](https://www.gnu.org/software/make/manual/make.html#Makefiles) to build and run application and docker images
on your local machine.

[Dockerfile](https://docs.docker.com/engine/reference/builder/) to build docker image.

[Github Actions](https://github.com/features/actions) to build (and push) docker image on each commit.

## Build and run it on your local machine

### run frontend in development mode (for debugging etc...)

This command starts a backend mock server (see `mock.go`) and allows using the full parcel development support.

```sh 
$ make frontend-run
```

### build application without docker

This command builds an executable for your platform.

```sh 
$ make frontend-build
$ make backend-build
$ ./bin/server
```

Open `localhost:8080` in your browser.

### build application with docker

This command build a docker image for your platform.

```sh 
$ make docker-build
$ make docker-run
```

Open `localhost:8080` in your browser.

### Multi-platform support

For multi-platform support see [github actions](.github/workflows/docker-build-and-push.yml).

## Demos

See [docker-compose demo](example/docker/readme.md) and
[kubernetes demo](example/kubernetes/readme.md).