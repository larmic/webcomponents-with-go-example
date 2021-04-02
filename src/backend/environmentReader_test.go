package backend

import (
	"os"
	"testing"
)

func TestStageIsSet(t *testing.T) {
	_ = os.Setenv("STAGE", "prd")

	environment := ReadEnvironment()

	if environment.Stage != "prd" {
		t.Errorf("ReadEnvironment() = %v, want prd", environment.Stage)
	}
}

func TestStageIsNotSet(t *testing.T) {
	_ = os.Unsetenv("STAGE")

	environment := ReadEnvironment()

	if environment.Stage != "unknown" {
		t.Errorf("ReadEnvironment() = %v, want unknown", environment.Stage)
	}
}