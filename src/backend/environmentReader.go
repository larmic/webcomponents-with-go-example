package backend

import (
	"os"
)

type Environment struct {
	Stage string
}

func ReadEnvironment() Environment {
	var stage = os.Getenv("STAGE")

	if stage == "" {
		return Environment{Stage: "unknown"}
	}

	return Environment{Stage: stage}
}
