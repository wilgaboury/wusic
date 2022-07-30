package main

import (
	"io/ioutil"
	"net/http"
	"runtime"

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
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			WriteErr(w, "IO error reading body of request")
			return
		}

		err = proto.Unmarshal(body, m)
		if err != nil {
			WriteErr(w, "Request body is not properly formatted")
			return
		}

		
		next.ServeHTTP(w, r)
	})
}

func HandleProto[M proto.Message](w http.ResponseWriter, r *http.Request) (m M, err error) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		WriteErr(w, "IO error reading body of request")
		return
	}

	err = proto.Unmarshal(body, m)
	if err != nil {
		WriteErr(w, "Request body is not properly formatted")
		return
	}

	return
}

func EmptyHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}

func HandleSong(w http.ResponseWriter, r *http.Request) {
	m, err := HandleProto[*protos.Song](w, r)
	if err != nil {
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(m.Name))
}

func GetSongsHandler(w http.ResponseWriter, r *http.Request) {
	Db.
}
