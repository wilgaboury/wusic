package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/wilgaboury/wusic/protos"
)

func NewRouter() http.Handler {
	r := chi.NewRouter()

	r.With(ProtoMiddleware[*protos.ApiGetAll]).Get("/songs", OkHandler)
	r.With(ProtoMiddleware[*protos.ApiGet]).Get("/song", GetSongHandler)
	r.With(ProtoMiddleware[*protos.Songs]).Post("/song", OkHandler)

	r.With(ProtoMiddleware[*protos.ApiGetAll]).Get("/artists", OkHandler)
	r.With(ProtoMiddleware[*protos.ApiGet]).Get("/artist", OkHandler)
	r.With(ProtoMiddleware[*protos.Artists]).Post("/artist", OkHandler)

	r.With(ProtoMiddleware[*protos.ApiGetAll]).Get("/albums", OkHandler)
	r.With(ProtoMiddleware[*protos.ApiGet]).Get("/album", OkHandler)
	r.With(ProtoMiddleware[*protos.Albums]).Post("/album", OkHandler)

	r.With(ProtoMiddleware[*protos.ApiGetAll]).Get("/playlists", OkHandler)
	r.With(ProtoMiddleware[*protos.ApiGet]).Get("/playlist", OkHandler)
	r.With(ProtoMiddleware[*protos.Playlists]).Post("/playlist", OkHandler)

	return r
}
