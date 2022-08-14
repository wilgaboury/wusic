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
	"google.golang.org/protobuf/proto"
)

type IderMessage interface {
	proto.Message
	GetId() string
}

func DbGet[M IderMessage](tableName, baseSql, orderSql string, scanFunc func(rs *sql.Rows) (M, error), ctx context.Context, ids []string) ([]M, error) {
	var sql string

	if len(ids) > 0 {
		sql = fmt.Sprintf("%s WHERE %s.id IN (%s) %s", baseSql, tableName, makeQmarkStr(len(ids)), orderSql)
	} else {
		sql = fmt.Sprintf("%s %s", baseSql, orderSql)
	}

	rs, err := Db.QueryContext(ctx, sql, StrArrToAnyArr(ids)...)
	if err != nil {
		return nil, err
	}
	defer rs.Close()

	idToIdx := make(map[string]int)
	for i, id := range ids {
		idToIdx[id] = i
	}

	ms := make([]M, len(ids))

	for rs.Next() {
		m, err := scanFunc(rs)
		if err != nil {
			return nil, err
		}

		var i int
		if _, ok := idToIdx[m.GetId()]; ok {
			i = idToIdx[m.GetId()]
			proto.Merge(ms[i], m)
		} else {
			i = len(ms)
			idToIdx[m.GetId()] = i
			ms = append(ms, m)
		}
	}

	return ms, nil
}

func MergeIders[T IderMessage](arr []T) []T {
	m := make(map[string]T)

	for _, v := range arr {
		if _, ok := m[v.GetId()]; !ok {
			m[v.GetId()] = v
		} else {
			proto.Merge(m[v.GetId()], v)
		}
	}

	ret := make([]T, 0, len(m))
	for _, v := range arr {
		if _, ok := m[v.GetId()]; !ok {
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

func makeQmarkStr(n int) string {
	qs := make([]string, n)
	for i := 0; i < n; i++ {
		qs[i] = "?"
	}
	return strings.Join(qs, ",")
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

func DbGetSongs(ctx context.Context, ids []string) ([]*protos.Song, error) {
	ss, err := DbGet("songs", GetSongSql, GetSongOrderSql, RowToSong, ctx, ids)
	if err != nil {
		return nil, err
	}

	for _, s := range ss {
		s.Artists = MergeIders(s.Artists)
	}

	return ss, nil
}

const GetArtistsSql = `
	SELECT artists.id, artists.name, songs.id, songs.name, albums.id, albums.name
	FROM artists
	LEFT JOIN songs_artists ON artists.id = songs_artists.artist_id
	LEFT JOIN songs ON songs_artists.song_id = songs.id
	LEFT JOIN artists_albums ON artists.id = artists_albums.artist_id
	LEFT JOIN albums ON artists_albums.album_id = albums.id
`

const GetArtistsOrderSql = "ORDER BY artists.id, songs.id, albums.id"

func RowToArtist(rs *sql.Rows) (*protos.Artist, error) {
	art := &protos.Artist{}
	s := &protos.SongInfo{}
	alb := &protos.AlbumInfo{}

	err := rs.Scan(&art.Id, &art.Name, &s.Id, &s.Name, &alb.Id, &alb.Name)
	if err != nil {
		return nil, err
	}

	if s.Id != "" {
		art.Songs = []*protos.SongInfo{s}
	}

	if alb.Id != "" {
		art.Albums = []*protos.AlbumInfo{alb}
	}

	return art, nil
}

func DbGetArtists(ctx context.Context, ids []string) ([]*protos.Artist, error) {
	as, err := DbGet("artists", GetArtistsSql, GetArtistsOrderSql, RowToArtist, ctx, ids)
	if err != nil {
		return nil, err
	}

	for _, a := range as {
		a.Songs = MergeIders(a.Songs)
		a.Albums = MergeIders(a.Albums)
	}

	return as, nil
}

const GetAlbumsSql = `
	SELECT albums.id, albums.name, songs.id, songs.name, songs.track, artists.id, artists.name
	FROM albums
	JOIN LEFT songs ON albums.id = songs.album
	JOIN LEFT artists_albums ON albums.id = artists_albums.album_id
	JOIN LEFT artists ON artists_albums.artist_id = artists.id
`

const GetAlbumsOrderSql = "ORDER BY albums.id, songs.track, artists.id"

func RowToAlbum(rs *sql.Rows) (*protos.Album, error) {
	alb := &protos.Album{}
	s := &protos.SongInfo{}
	art := &protos.ArtistInfo{}

	err := rs.Scan(&alb.Id, &alb.Name, &s.Id, &s.Name, &s.Track, &art.Id, &art.Name)
	if err != nil {
		return nil, err
	}

	if s.Id != "" {
		alb.Songs = []*protos.SongInfo{s}
	}

	if art.Id != "" {
		alb.Artists = []*protos.ArtistInfo{art}
	}

	return alb, nil
}

func DbGetAlbums(ctx context.Context, ids []string) ([]*protos.Album, error) {
	as, err := DbGet("albums", GetAlbumsSql, GetAlbumsOrderSql, RowToAlbum, ctx, ids)
	if err != nil {
		return nil, err
	}

	for _, a := range as {
		a.Songs = MergeIders(a.Songs)
		a.Artists = MergeIders(a.Artists)
	}

	return as, nil
}
