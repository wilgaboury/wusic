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

	r.With(ProtoMiddleware[*protos.ApiGet]).Post("/songs", GetSongHandler)
	r.With(ProtoMiddleware[*protos.SongFile]).Post("/songFile", NotImplementedHandler)
	r.With(ProtoMiddleware[*protos.Songs]).Post("/song", NotImplementedHandler)

	r.With(ProtoMiddleware[*protos.ApiGet]).Post("/artists", GetArtistHandler)
	r.With(ProtoMiddleware[*protos.Artists]).Post("/artist", NotImplementedHandler)

	r.With(ProtoMiddleware[*protos.ApiGet]).Post("/albums", GetAlbumHandler)
	r.With(ProtoMiddleware[*protos.Albums]).Post("/album", NotImplementedHandler)

	r.With(ProtoMiddleware[*protos.ApiGet]).Get("/playlist", NotImplementedHandler)
	r.With(ProtoMiddleware[*protos.Playlists]).Post("/playlist", NotImplementedHandler)

	r.Get("/search", NotImplementedHandler)
	r.Get("/search/song", NotImplementedHandler)
	r.Get("/search/artist", NotImplementedHandler)
	r.Get("/search/album", NotImplementedHandler)
	r.Get("/search/playlist", NotImplementedHandler)

	return r
}
