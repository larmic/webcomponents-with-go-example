package backend

import (
	"os"
	"runtime"
)

type Environment struct {
	Stage string
	Go    string
}

func ReadEnvironment() Environment {
	var stage = os.Getenv("STAGE")

	if stage == "" {
		return Environment{Stage: "unknown"}
	}

	return Environment{Stage: stage, Go: runtime.Version()}
}
