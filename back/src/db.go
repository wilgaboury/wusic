package main

import (
	"database/sql"
	"io"
	"os"
	"path/filepath"

	_ "github.com/mattn/go-sqlite3"
)

var Db *sql.DB

func InitDb() {
	err := os.MkdirAll(filepath.Join(Params.DbDir, "songs"), os.ModePerm)
	CheckErrFatal(err)

	f, err := os.OpenFile(filepath.Join(Params.DbDir, "db.sqlite"), os.O_RDONLY|os.O_CREATE, 0666)
	CheckErrFatal(err)
	f.Close()

	Db, err := sql.Open("sqlite3", Params.DbDir)
	CheckErrFatal(err)

	rsql, err := os.Open("./static/schema.sql")
	CheckErrFatal(err)
	defer rsql.Close()

	sql, err := io.ReadAll(rsql)
	CheckErrFatal(err)

	_, err = Db.Exec(string(sql))
	CheckErrFatal(err)
}

func DbToSong(r sql.Row)
