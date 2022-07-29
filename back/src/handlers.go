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

func ProtoHandler[M proto.Message](handler func(w http.ResponseWriter, m M)) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			WriteErr(w, "IO error reading body of request")
			return
		}

		var m M
		err = proto.Unmarshal(body, m)
		if err != nil {
			WriteErr(w, "Request body is not properly formatted")
			return
		}

		handler(w, m)
	}
}

func EmptyHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}

func HandleSong(w http.ResponseWriter, r *http.Request) {
	ProtoHandler(HandleSongInner)
}

func HandleSongInner(w http.ResponseWriter, s *protos.Song) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(s.Name))
}
