# Use multi stage build to# minimize generated docker images size
# see: https://docs.docker.com/develop/develop-images/multistage-build/


# Step 1: create multi stage assets builder
# HINT: up to now parcel does not support arm -> https://github.com/parcel-bundler/parcel/issues/5812
# .github actions configuration is using multi arch target plattform
# assets builder is only used to create assets, so no special arm support is needed -> using amd64 (supported by parcel)
FROM amd64/node:alpine AS assets

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json /app/
COPY src/frontend /app/src/frontend

# Make a clean npm install and only install modules needed for production
RUN npm ci

# Build assets
RUN npm run build


# Step 2: create multi stage backend builder
FROM golang:1.17 AS app
LABEL stage=intermediate
RUN go version

WORKDIR /app

COPY package.json /app/
COPY main.go /app/
COPY go.* /app/
COPY src/backend /app/src/backend
COPY --from=assets /app/dist /app/dist

RUN go mod download
RUN go test -v ./...

# CGO_ENABLED=0   -> Disable interoperate with C libraries -> speed up build time! Enable it, if dependencies use C libraries!
# GOOS=linux      -> compile to linux because scratch docker file is linux
# GOARCH=amd64    -> because, hmm, everthing works fine with 64 bit :)
# -a              -> force rebuilding of packages that are already up-to-date.
# -o main         -> force to build an executable app file (instead of default https://golang.org/cmd/go/#hdr-Compile_packages_and_dependencies)

ARG BUILDPLATFORM
ARG TARGETPLATFORM
ARG VERSION

RUN echo "I am running on $BUILDPLATFORM, building $VERSION for $TARGETPLATFORM"

RUN if [ "$TARGETPLATFORM" = "linux/arm/v7" ] ; then \
        echo "I am building linux/arm/v7 with CGO_ENABLED=0 GOARCH=arm GOARM=7" ; \
        env CGO_ENABLED=0 GOARCH=arm GOARM=7 go build -a -o main . ; \
        echo "Build done" ; \
    fi

RUN if [ "$TARGETPLATFORM" = "linux/arm64" ] ; then \
        echo "I am building linux/arm64 with CGO_ENABLED=0 GOARCH=arm64 GOARM=7" ; \
        env CGO_ENABLED=0 GOARCH=arm64 GOARM=7 go build -a -o main . ; \
        echo "Build done" ; \
    fi

RUN if [ "$TARGETPLATFORM" = "linux/amd64" ] ; then \
        echo "I am building linux/amd64 with CGO_ENABLED=0 GOARCH=amd64" ; \
        env CGO_ENABLED=0 GOARCH=amd64 go build -a -o main . ; \
        echo "Build done" ; \
    fi


# Step 3: create minimal executable image
FROM scratch
WORKDIR /root/
COPY --from=app /app/main .

EXPOSE 8080
ENTRYPOINT ["./main"]