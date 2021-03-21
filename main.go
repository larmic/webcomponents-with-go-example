package main

import (
	"embed"
	"log"
	"net/http"
	"webcomponents-with-go-example/src/backend"
)

const frontendFolder = "dist"

//go:embed dist
var frontendFS embed.FS

//go:embed package.json
var packageJsonFS []byte

func main() {
	log.Println("Hello webcomponents-with-go-example!")
	packageJson := backend.UnmarshalPackageJson(packageJsonFS)
	infoHandler := backend.NewInfoHandler(packageJson)

	// support http://localhost:8080 instead of http://localhost:8080/dist as app root
	stripContextPathFS := backend.StripEmbedContextPathFS{
		Content:     frontendFS,
		ContextPath: frontendFolder,
	}

	http.Handle("/", http.FileServer(http.FS(stripContextPathFS)))
	http.HandleFunc("/info", infoHandler.Handler)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
