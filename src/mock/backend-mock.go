// simple mock server started when using `make frontend-run`.

package main

import (
	"encoding/json"
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
	info := backend.Info{
		Version: "development",
		Name:    "webcomponents-with-go mock server",
		Author:  "Lars Michaelis",
		Stage:   "Local development",
		Repository: backend.Repository{
			Url: "https://github.com/larmic/webcomponents-with-go-example",
		},
		Technologies: backend.Technologies{
			GoVersion:         runtime.Version(),
			ParcelVersion:     "2.0.0-beta.3.1",
			LitElementVersion: "2.5.1",
		},
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	infoStr, _ := json.Marshal(info)
	_, _ = w.Write(infoStr)
}
