package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/wilgaboury/wusic/protos"
)

func NewRouter() http.Handler {
	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Get("/", OkHandler)

	r.Post("/songs", GetAllSongsHandler)
	r.With(ProtoMiddleware[*protos.ApiGet]).Post("/song", GetSongHandler)
	r.With(ProtoMiddleware[*protos.Songs]).Post("/song", OkHandler)

	r.Get("/artists", OkHandler)
	r.With(ProtoMiddleware[*protos.ApiGet]).Get("/artist", OkHandler)
	r.With(ProtoMiddleware[*protos.Artists]).Post("/artist", OkHandler)

	r.Get("/albums", OkHandler)
	r.With(ProtoMiddleware[*protos.ApiGet]).Get("/album", OkHandler)
	r.With(ProtoMiddleware[*protos.Albums]).Post("/album", OkHandler)

	r.Get("/playlists", OkHandler)
	r.With(ProtoMiddleware[*protos.ApiGet]).Get("/playlist", OkHandler)
	r.With(ProtoMiddleware[*protos.Playlists]).Post("/playlist", OkHandler)

	return r
}
