package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/wilgaboury/wusic/protos"
)

func NewRouter() http.Handler {
	r := chi.NewRouter()

	r.Get("/songs", EmptyHandler)
	r.With(SongContext).Get("/song/{id}", GetSongsHandler)
	r.With(ProtoMiddleware[*protos.Song]).Post("/song", EmptyHandler)

	r.Get("/artists", EmptyHandler)
	r.Get("/artist/{id}", EmptyHandler)
	r.With(ProtoMiddleware[*protos.Artist]).Post("/artist", EmptyHandler)

	r.Get("/album", EmptyHandler)
	r.Get("/album/{id}", EmptyHandler)
	r.With(ProtoMiddleware[*protos.Album]).Post("/album", EmptyHandler)

	return r
}
