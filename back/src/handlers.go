package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"net/http"
	"runtime"
	"strings"

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

func StrArrToAnyArr(a []string) []any {
	ret := make([]any, len(a))
	for i, v := range a {
		ret[i] = v
	}
	return ret
}

func QuestionMarkStr(I int) string {
	qs := make([]string, I)
	for i := 0; i < I; i++ {
		qs[i] = "?"
	}
	return strings.Join(qs, ",")
}

func GetSongHandler(w http.ResponseWriter, r *http.Request) {
	m := r.Context().Value(MessageBodyKey).(*protos.ApiGet)

	sql := fmt.Sprintf(`
		SELECT (s.id, s.name, s.album, a.name, s.track)
		FROM songs AS s
		LEFT JOIN albums AS a ON s.album = a.id
		WHERE id IN (%s)
	`, QuestionMarkStr(len(m.Ids)))

	rs, err := Db.QueryContext(r.Context(), sql, StrArrToAnyArr(m.Ids)...)
	if err != nil {
		WriteErr(w, "sql error")
		return
	}
	defer rs.Close()

	ret := &protos.Songs{}
	for rs.Next() {
		i := &protos.Song{}
		rs.Scan(i.Id, i.Name, i.Album.Id, i.Album.Name, i.Track)
		ret.Songs = append(ret.Songs, i)
	}

	var b []byte
	proto.Unmarshal(b, ret)
	w.WriteHeader(http.StatusOK)
	w.Write(b)
}
