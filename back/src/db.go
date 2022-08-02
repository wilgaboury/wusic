package main

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	_ "github.com/mattn/go-sqlite3"
	"github.com/wilgaboury/wusic/protos"
)

var Db *sql.DB

func InitDb() {
	err := os.MkdirAll(filepath.Join(Params.DbDir, "songs"), os.ModePerm)
	CheckErrPanic(err)

	f, err := os.OpenFile(filepath.Join(Params.DbDir, "db.sqlite"), os.O_RDONLY|os.O_CREATE, 0666)
	f.Close()
	CheckErrPanic(err)

	Db, err := sql.Open("sqlite3", filepath.Join(Params.DbDir, "db.sqlite"))
	CheckErrPanic(err)

	exeLoc, err := os.Executable()
	CheckErrPanic(err)

	sql, err := os.ReadFile(filepath.Join(exeLoc, "..", "static", "schema.sql"))
	CheckErrPanic(err)

	_, err = Db.Exec(string(sql))
	CheckErrPanic(err)
}

const GetSongSql = `
	SELECT (songs.id, songs.name, songs.track, albums.id, albums.name, artists.id, artists.name)
	FROM songs
	LEFT JOIN albums ON songs.album = albums.id
	LEFT JOIN songs_artists ON songs.id = songs_artists.song_id
	LEFT JOIN artists ON songs_artists.song_id = artists.id
`

func StrArrToAnyArr(strs []string) []any {
	ret := make([]any, len(strs))
	for i := range strs {
		ret[i] = strs[i]
	}
	return ret
}

func DbGetSongs(ctx context.Context, ids []string) ([]*protos.Song, error) {
	qs := make([]string, len(ids))
	for i := range ids {
		qs[i] = "?"
	}

	sql := fmt.Sprintf(`
		%s
		WHERE songs.id IN (%s)
	`, GetSongSql, strings.Join(qs, ","))

	rs, err := Db.QueryContext(ctx, sql, StrArrToAnyArr(ids)...)
	if err != nil {
		return nil, err
	}

	idToIdx := make(map[string]int)
	for i, id := range ids {
		idToIdx[id] = i
	}

	ss := make([]*protos.Song, len(ids))

	for rs.Next() {
		s := &protos.Song{}
		alb := &protos.AlbumInfo{}
		art := &protos.ArtistInfo{}

		err := rs.Scan(&s.Id, &s.Name, &s.Track, &alb.Id, &alb.Name, &art.Id, &art.Name)
		if err != nil {
			return nil, err
		}

		i := idToIdx[s.Id]

		if ss[i] == nil {
			ss[i] = s
		} else {
			s = ss[i]
		}

		if s.Album == nil && alb.Id != "" {
			s.Album = alb
		}

		if s.Artists == nil && art.Id != "" {
			s.Artists = make([]*protos.ArtistInfo, 0)
		}

		if art.Id != "" {
			s.Artists = append(s.Artists, art)
		}
	}

	return ss, nil
}

func DbGetArtists(ctx context.Context, ids []string) ([]*protos.Artist, error) {
	return nil, nil
}

func DbGetAlbums(ctx context.Context, ids []string) ([]*protos.Album, error) {
	return nil, nil
}
