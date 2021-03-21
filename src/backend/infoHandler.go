package backend

import (
	"encoding/json"
	"net/http"
	"runtime"
	"strings"
)

type Technologies struct {
	GoVersion         string `json:"go_version"`
	ParcelVersion     string `json:"parcel_version"`
	LitElementVersion string `json:"lit_element_version"`
}

type Repository struct {
	Url string `json:"url"`
}

type Info struct {
	Version      string       `json:"version"`
	Name         string       `json:"name"`
	Author       string       `json:"author"`
	Repository   Repository   `json:"repository"`
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
			Repository: Repository{
				Url: packageJson.Repository.Url,
			},
			Technologies: Technologies{
				GoVersion:         runtime.Version(),
				ParcelVersion:     trimPrefix(packageJson.DevDependencies.ParcelVersion),
				LitElementVersion: trimPrefix(packageJson.Dependencies.LitElementVersion),
			},
		},
	}
}

func (ih *InfoHandler) Handler(w http.ResponseWriter, _ *http.Request) {
	infoStr, _ := json.Marshal(ih.info)

	w.Header().Set("Content-Type", "application/json")
	_, _ = w.Write(infoStr)
}

func trimPrefix(value string) string {
	return strings.TrimPrefix(value, "^")
}
