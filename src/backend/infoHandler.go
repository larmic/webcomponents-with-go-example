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
	PackageJson PackageJson
}

func (ih *InfoHandler) Handler(w http.ResponseWriter, r *http.Request) {
	info := Info{
		Version: ih.PackageJson.Version,
		Name:    ih.PackageJson.Name,
		Author:  ih.PackageJson.Author,
		Technologies: Technologies{
			GoVersion:         runtime.Version(),
			ParcelVersion:     strings.TrimPrefix(ih.PackageJson.DevDependencies.ParcelVersion, "^"),
			LitElementVersion: strings.TrimPrefix(ih.PackageJson.Dependencies.LitElementVersion, "^"),
		},
	}

	infoStr, _ := json.Marshal(info)

	_, _ = w.Write(infoStr)
}
