package main

import (
	"context"
	"io/ioutil"
	"net/http"
	"runtime"

	"github.com/go-chi/chi/v5"
	"github.com/wilgaboury/wusic/protos"
	"google.golang.org/protobuf/proto"
)

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

func ProtoMiddleware[M proto.Message](next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		b, err := ioutil.ReadAll(r.Body)
		if err != nil {
			WriteErr(w, "IO error reading body of request")
			return
		}

		err = proto.Unmarshal(b, m)
		if err != nil {
			WriteErr(w, "Request body is not properly formatted")
			return
		}

		context.WithValue(r.Context(), "proto", m)
		next.ServeHTTP(w, r)
	})
}

// func HandleProto[M proto.Message](w http.ResponseWriter, r *http.Request) (m M, err error) {
// 	body, err := ioutil.ReadAll(r.Body)
// 	if err != nil {
// 		WriteErr(w, "IO error reading body of request")
// 		return
// 	}

// 	err = proto.Unmarshal(body, m)
// 	if err != nil {
// 		WriteErr(w, "Request body is not properly formatted")
// 		return
// 	}

// 	return
// }

func EmptyHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}

func GetSongsHandler(w http.ResponseWriter, r *http.Request) {

}

func SongContext(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")
		if id == "" {
			WriteErr(w, "could not find id in url")
			return
		}

		sql := `
			SELECT *
			FROM songs
			WHERE id = ?
		`

		row := Db.QueryRowContext(r.Context(), sql, id)
		if err != nil {
			WriteErr(w, "sql error")
			return
		}
		

		row.
	}
}
