package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"path"
	"webcomponents-with-go-example/src/backend"
)

const frontendFolder = "dist"

//go:embed dist
var frontendFS embed.FS

//go:embed package.json
var packageJsonFS []byte

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
	packageJson := backend.UnmarshalPackageJson(packageJsonFS)

	infoHandler := &backend.InfoHandler{PackageJson: packageJson}

	http.Handle("/", http.FileServer(http.FS(myFS{frontendFS})))
	http.HandleFunc("/info", infoHandler.Handler)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
