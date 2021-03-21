package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"path"
)

const frontendFolder = "dist"

//go:embed dist/*
var static embed.FS

// support http://localhost:8080 instead of http://localhost:8080/dist as app root
// see https://github.com/golang/go/issues/43431#issuecomment-752662261
type myFS struct {
	content embed.FS
}

// support http://localhost:8080 instead of http://localhost:8080/dist as app root
// see https://github.com/golang/go/issues/43431#issuecomment-752662261
func (c myFS) Open(name string) (fs.File, error) {
	return c.content.Open(path.Join(frontendFolder, name))
}

func main() {
	log.Println("Hello webcomponents-with-go-example!")
	http.Handle("/", http.FileServer(http.FS(myFS{static})))
	log.Fatal(http.ListenAndServe(":8080", nil))
}
