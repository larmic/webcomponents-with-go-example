package backend

import (
	"encoding/json"
	"net/http"
	"runtime"
	"strings"
)

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

type InfoHandler struct {
	info Info
}

func NewInfoHandler(packageJson PackageJson) *InfoHandler {
	return &InfoHandler{
		info: Info{
			Version: packageJson.Version,
			Name:    packageJson.Name,
			Author:  packageJson.Author,
			Technologies: Technologies{
				GoVersion:         runtime.Version(),
				ParcelVersion:     strings.TrimPrefix(packageJson.DevDependencies.ParcelVersion, "^"),
				LitElementVersion: strings.TrimPrefix(packageJson.Dependencies.LitElementVersion, "^"),
			},
		},
	}
}

func (ih *InfoHandler) Handler(w http.ResponseWriter, _ *http.Request) {
	infoStr, _ := json.Marshal(ih.info)

	w.Header().Set("Content-Type", "application/json")
	_, _ = w.Write(infoStr)
}
