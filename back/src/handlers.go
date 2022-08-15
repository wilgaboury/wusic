package main

import (
	"context"
	"io"
	"net/http"
	"runtime"

	"github.com/wilgaboury/wusic/protos"
	"google.golang.org/protobuf/proto"
)

const MessageBodyKey string = "proto"

func ProtoMiddleware[M proto.Message](next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		b, err := io.ReadAll(r.Body)
		if err != nil {
			WriteErr(w, "IO error reading body of request")
			return
		}

		ctx := r.Context()

		if len(b) != 0 {
			var m M
			err = proto.Unmarshal(b, m)
			if err != nil {
				WriteErr(w, "Request body is not properly formatted")
				return
			}

			ctx = context.WithValue(ctx, MessageBodyKey, &m)
		}

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func WriteErr(w http.ResponseWriter, m string) {
	var err protos.Error

	if Params.SendStack {
		err = protos.Error{Title: m}
	} else {
		var stack []byte
		runtime.Stack(stack, false)
		err = protos.Error{Title: m, Details: string(stack)}
	}

	w.WriteHeader(http.StatusInternalServerError)
	b, _ := proto.Marshal(&err)
	w.Write(b)
}

func OkHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}

func NotImplementedHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Not Yet Implemented"))
}

func GetSongHandler(w http.ResponseWriter, r *http.Request) {
	var ids []string

	if m, ok := r.Context().Value(MessageBodyKey).(*protos.ApiGet); ok {
		ids = m.Ids
	} else {
		ids = make([]string, 0)
	}

	ss, err := DbGetSongs(r.Context(), ids)
	if err != nil {
		WriteErr(w, err.Error())
		return
	}

	b, err := proto.Marshal(&protos.Songs{Songs: ss})
	if err != nil {
		panic(err)
	}

	w.WriteHeader(http.StatusOK)
	w.Write(b)
}

func GetArtistHandler(w http.ResponseWriter, r *http.Request) {
	var ids []string

	if m, ok := r.Context().Value(MessageBodyKey).(*protos.ApiGet); ok {
		ids = m.Ids
	} else {
		ids = make([]string, 0)
	}

	as, err := DbGetArtists(r.Context(), ids)
	if err != nil {
		WriteErr(w, err.Error())
		return
	}

	b, err := proto.Marshal(&protos.Artists{Artists: as})
	if err != nil {
		panic(err)
	}

	w.WriteHeader(http.StatusOK)
	w.Write(b)
}

func GetAlbumHandler(w http.ResponseWriter, r *http.Request) {
	var ids []string

	if m, ok := r.Context().Value(MessageBodyKey).(*protos.ApiGet); ok {
		ids = m.Ids
	} else {
		ids = make([]string, 0)
	}

	as, err := DbGetAlbums(r.Context(), ids)
	if err != nil {
		WriteErr(w, err.Error())
		return
	}

	b, err := proto.Marshal(&protos.Albums{Albums: as})
	if err != nil {
		panic(err)
	}

	w.WriteHeader(http.StatusOK)
	w.Write(b)
}
