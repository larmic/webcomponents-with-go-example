package backend

import (
	_ "embed"
	"encoding/json"
)

type DevDependencies struct {
	ParcelVersion string `json:"parcel"`
}

type Dependencies struct {
	LitElementVersion string `json:"lit-element"`
}

type PackageJson struct {
	Version         string          `json:"version"`
	Name            string          `json:"name"`
	Author          string          `json:"author"`
	DevDependencies DevDependencies `json:"devDependencies"`
	Dependencies    Dependencies    `json:"dependencies"`
}

func UnmarshalPackageJson(packageJsonFS []byte) PackageJson {
	var packageJson PackageJson
	_ = json.Unmarshal(packageJsonFS, &packageJson)
	return packageJson
}
