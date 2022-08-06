package main

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/golang/protobuf/proto"
	_ "github.com/mattn/go-sqlite3"
	"github.com/wilgaboury/wusic/protos"
)

type IderMessage interface {
	proto.Message
	GetId() string
}

func MergeIders[T IderMessage](arr []T) []T {
	m := make(map[string]T)

	for _, v := range arr {
		if _, ok := m[v.GetId()]; ok {
			m[v.GetId()] = v
		} else {
			proto.Merge(m[v.GetId()], v)
		}
	}

	ret := make([]T, 0, len(m))
	for _, v := range arr {
		if _, ok := m[v.GetId()]; ok {
			ret = append(ret, m[v.GetId()])
		}
		delete(m, v.GetId())
	}

	return ret
}

var Db *sql.DB

func InitDb() {
	err := os.MkdirAll(filepath.Join(Params.DbDir, "songs"), os.ModePerm)
	CheckErrPanic(err)

	f, err := os.OpenFile(filepath.Join(Params.DbDir, "db.sqlite"), os.O_RDONLY|os.O_CREATE, 0666)
	f.Close()
	CheckErrPanic(err)

	Db, err = sql.Open("sqlite3", filepath.Join(Params.DbDir, "db.sqlite"))
	CheckErrPanic(err)

	exeLoc, err := os.Executable()
	CheckErrPanic(err)

	sql, err := os.ReadFile(filepath.Join(exeLoc, "..", "static", "schema.sql"))
	CheckErrPanic(err)

	_, err = Db.Exec(string(sql))
	CheckErrPanic(err)
}

const GetSongSql = `
	SELECT songs.id, songs.name, songs.track, albums.id, albums.name, artists.id, artists.name
	FROM songs
	LEFT JOIN albums ON songs.album = albums.id
	LEFT JOIN songs_artists ON songs.id = songs_artists.song_id
	LEFT JOIN artists ON songs_artists.song_id = artists.id
`

const GetSongOrderSql = "ORDER BY songs.id, artists.id"

func StrArrToAnyArr(strs []string) []any {
	ret := make([]any, len(strs))
	for i := range strs {
		ret[i] = strs[i]
	}
	return ret
}

func RowToSong(rs *sql.Rows) (*protos.Song, error) {
	s := &protos.Song{}
	alb := &protos.AlbumInfo{}
	art := &protos.ArtistInfo{}

	err := rs.Scan(&s.Id, &s.Name, &s.Track, &alb.Id, &alb.Name, &art.Id, &art.Name)
	if err != nil {
		return nil, err
	}

	if alb.Id != "" {
		s.Album = alb
	}

	if art.Id != "" {
		s.Artists = []*protos.ArtistInfo{art}
	}

	return s, nil
}

func DbGetAllSongs(ctx context.Context) ([]*protos.Song, error) {
	sql := fmt.Sprintf(`%s %s`, GetSongSql, GetSongOrderSql)

	rs, err := Db.QueryContext(ctx, sql)
	if err != nil {
		return nil, err
	}
	defer rs.Close()

	ss := make(map[string]*protos.Song)

	for rs.Next() {
		s, err := RowToSong(rs)
		if err != nil {
			return nil, err
		}

		if _, ok := ss[s.Id]; ok {
			ss[s.Id] = s
		} else {
			proto.Merge(ss[s.Id], s)
		}
	}

	ret := make([]*protos.Song, 0, len(ss))
	for _, v := range ss {
		ret = append(ret, v)
	}

	return ret, nil
}

func DbGetSongs(ctx context.Context, ids []string) ([]*protos.Song, error) {
	qs := make([]string, len(ids))
	for i := range ids {
		qs[i] = "?"
	}

	sql := fmt.Sprintf("%s WHERE songs.id IN (%s) %s", GetSongSql, strings.Join(qs, ","), GetSongOrderSql)

	rs, err := Db.QueryContext(ctx, sql, StrArrToAnyArr(ids)...)
	if err != nil {
		return nil, err
	}
	defer rs.Close()

	idToIdx := make(map[string]int)
	for i, id := range ids {
		idToIdx[id] = i
	}

	ss := make([]*protos.Song, len(ids))

	for rs.Next() {
		s, err := RowToSong(rs)
		if err != nil {
			return nil, err
		}

		i := idToIdx[s.Id]

		if ss[i] == nil {
			ss[i] = s
		} else {
			proto.Merge(ss[i], s)
		}
	}

	for _, s := range ss {
		s.Artists = MergeIders(s.Artists)
	}

	return ss, nil
}

func DbGetArtists(ctx context.Context, ids []string) ([]*protos.Artist, error) {
	return nil, nil
}

func DbGetAlbums(ctx context.Context, ids []string) ([]*protos.Album, error) {
	return nil, nil
}
