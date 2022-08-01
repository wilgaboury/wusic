package main

import (
	"context"
	"io/ioutil"
	"net/http"
	"runtime"

	"github.com/wilgaboury/wusic/protos"
	"google.golang.org/protobuf/proto"
)

const MessageBodyKey string = "proto"

func ProtoMiddleware[M proto.Message](next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		b, err := ioutil.ReadAll(r.Body)
		if err != nil {
			WriteErr(w, "IO error reading body of request")
			return
		}

		var m M
		err = proto.Unmarshal(b, m)
		if err != nil {
			WriteErr(w, "Request body is not properly formatted")
			return
		}

		ctx := context.WithValue(r.Context(), MessageBodyKey, &m)
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

func GetSongsHandler(w http.ResponseWriter, r *http.Request) {
	OkHandler(w, r)
}

func GetSongHandler(w http.ResponseWriter, r *http.Request) {
	// m := r.Context().Value(MessageBodyKey).(*protos.ApiGet)

	// ss, err := DbGetSongs(r.Context(), m.Ids)
	// if err != nil {
	// 	WriteErr(w, err.Error())
	// 	return
	// }

	// b, err := proto.Marshal(ss)
	// if err != nil {
	// 	WriteErr(w, err.Error())
	// 	return
	// }

	// w.WriteHeader(http.StatusOK)
	// w.Write(b)

	OkHandler(w, r)
}
