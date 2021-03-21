package main

import (
	"embed"
	"encoding/json"
	"io/fs"
	"log"
	"net/http"
	"path"
	"runtime"
	"strings"
	"webcomponents-with-go-example/src/backend"
)

const frontendFolder = "dist"

type Technologies struct {
	GoVersion         string `json:"go-version"`
	ParcelVersion     string `json:"parcel-version"`
	LitElementVersion string `json:"lit-element-version"`
}

type Info struct {
	Version      string       `json:"version"`
	Name         string       `json:"name"`
	Author       string       `json:"author"`
	Technologies Technologies `json:"technologies"`
}

var packageJson backend.PackageJson

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

func info(w http.ResponseWriter, r *http.Request) {
	info := Info{
		Version: packageJson.Version,
		Name:    packageJson.Name,
		Author:  packageJson.Author,
		Technologies: Technologies{
			GoVersion:         runtime.Version(),
			ParcelVersion:     strings.TrimPrefix(packageJson.DevDependencies.ParcelVersion, "^"),
			LitElementVersion: strings.TrimPrefix(packageJson.Dependencies.LitElementVersion, "^"),
		},
	}

	infoStr, _ := json.Marshal(info)

	_, _ = w.Write(infoStr)
}

func main() {
	log.Println("Hello webcomponents-with-go-example!")
	packageJson = backend.UnmarshalPackageJson(packageJsonFS)

	http.Handle("/", http.FileServer(http.FS(myFS{frontendFS})))
	http.HandleFunc("/info", info)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
