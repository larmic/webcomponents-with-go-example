// simple mock backend server started when using `make frontend-run`.

package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"runtime"
	"webcomponents-with-go-example/src/backend"
)

func main() {
	log.Println("Hello webcomponents-with-go-example mock!")

	http.HandleFunc("/info", infoHandler)

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func infoHandler(w http.ResponseWriter, r *http.Request) {
	packageJson := getPackageJson()
	info := backend.Info{
		Version: "local development",
		Name:    packageJson.Name,
		Author:  packageJson.Author,
		Stage:   "local development (mock backend)",
		Repository: backend.Repository{
			Url: packageJson.Repository.Url,
		},
		Technologies: backend.Technologies{
			GoVersion:         runtime.Version(),
			ParcelVersion:     packageJson.DevDependencies.ParcelVersion,
			LitElementVersion: packageJson.Dependencies.LitElementVersion,
		},
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	infoStr, _ := json.Marshal(info)
	_, _ = w.Write(infoStr)
}

func getPackageJson() backend.PackageJson {
	dat, _ := ioutil.ReadFile("package.json")
	return backend.UnmarshalPackageJson(dat)
}
