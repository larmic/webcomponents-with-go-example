package backend

import (
	"embed"
	"io/fs"
	"path"
)

// support http://localhost:8080 instead of http://localhost:8080/dist as app root
// see https://github.com/golang/go/issues/43431#issuecomment-752662261
type StripEmbedContextPathFS struct {
	Content     embed.FS
	ContextPath string
}

// support http://localhost:8080 instead of http://localhost:8080/dist as app root
// see https://github.com/golang/go/issues/43431#issuecomment-752662261
func (c StripEmbedContextPathFS) Open(name string) (fs.File, error) {
	return c.Content.Open(path.Join(c.ContextPath, name))
}
