package main

import (
	"io/ioutil"
	"net/http"

	"github.com/wilgaboury/wusic/protos"
	"google.golang.org/protobuf/proto"
)

func WriteErr(w http.ResponseWriter, m string) {
	w.WriteHeader(http.StatusInternalServerError)
	b, _ := proto.Marshal(&protos.Error{Message: m})
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

func HandleSong(w http.ResponseWriter, s *protos.Song) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(s.Name))
}
